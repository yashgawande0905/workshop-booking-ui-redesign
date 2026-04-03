import { useEffect, useState } from "react";

const usePortalData = () => {
  const [portalData, setPortalData] = useState({
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
          setPortalData(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadPortalData();
    return () => {
      isMounted = false;
    };
  }, []);

  return { portalData, loading, error };
};

export default usePortalData;
