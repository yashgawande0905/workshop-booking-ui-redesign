import { useEffect, useRef, useState } from "react";
import {
  getStoredWorkshops,
  getStoredWorkshopStatusOverrides,
  getStoredWorkshopTypes,
} from "../utils/portalStorage";

const buildStats = (workshops, workshopTypes) => {
  const now = new Date();

  return {
    upcoming_workshops: workshops.filter((item) => new Date(item.date) >= now).length,
    accepted_workshops: workshops.filter((item) => item.status === "Accepted").length,
    pending_workshops: workshops.filter((item) => item.status === "Pending").length,
    workshop_types: workshopTypes.length,
  };
};

const mergePortalData = (data) => {
  const storedWorkshops = getStoredWorkshops();
  const storedWorkshopTypes = getStoredWorkshopTypes();
  const statusOverrides = getStoredWorkshopStatusOverrides();
  const workshops = [...storedWorkshops, ...(data.workshops ?? [])].map((item) => ({
    ...item,
    status: statusOverrides[item.id] ?? item.status,
  }));
  const workshopTypes = [...storedWorkshopTypes, ...(data.workshop_types ?? [])];

  return {
    stats: buildStats(workshops, workshopTypes),
    workshops,
    workshop_types: workshopTypes,
  };
};

const usePortalData = () => {
  const [portalData, setPortalData] = useState({
    stats: {},
    workshops: [],
    workshop_types: [],
  });
  const baseDataRef = useRef({
    stats: {},
    workshops: [],
    workshop_types: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadPortalData = async () => {
      try {
        setLoading(true);
        const response = await fetch("/workshop/api/dashboard/");
        if (!response.ok) {
          throw new Error("Failed to load portal data");
        }

        const data = await response.json();
        if (isMounted) {
          baseDataRef.current = data;
          setPortalData(mergePortalData(data));
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          const fallbackData = {
            stats: {},
            workshops: [],
            workshop_types: [],
          };
          baseDataRef.current = fallbackData;
          setPortalData(mergePortalData(fallbackData));
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPortalData();

    const handleStorageUpdate = () => {
      if (isMounted) {
        setPortalData(mergePortalData(baseDataRef.current));
      }
    };

    window.addEventListener("portal-storage-updated", handleStorageUpdate);
    return () => {
      isMounted = false;
      window.removeEventListener("portal-storage-updated", handleStorageUpdate);
    };
  }, []);

  return { portalData, loading, error };
};

export default usePortalData;
