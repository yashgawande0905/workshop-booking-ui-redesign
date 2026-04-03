const WORKSHOP_STORAGE_KEY = "custom_workshops";
const WORKSHOP_TYPE_STORAGE_KEY = "custom_workshop_types";
const WORKSHOP_STATUS_STORAGE_KEY = "workshop_status_overrides";

const readStorage = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("portal-storage-updated"));
  }
};

export const getStoredWorkshops = () => readStorage(WORKSHOP_STORAGE_KEY);

export const getStoredWorkshopTypes = () => readStorage(WORKSHOP_TYPE_STORAGE_KEY);
export const getStoredWorkshopStatusOverrides = () => readStorage(WORKSHOP_STATUS_STORAGE_KEY);

export const saveWorkshop = (workshop) => {
  const current = getStoredWorkshops();
  const next = [
    {
      id: `custom-workshop-${Date.now()}`,
      ...workshop,
    },
    ...current,
  ];

  writeStorage(WORKSHOP_STORAGE_KEY, next);
  return next;
};

export const updateWorkshop = (workshopId, updates) => {
  const next = getStoredWorkshops().map((item) =>
    item.id === workshopId ? { ...item, ...updates } : item
  );
  writeStorage(WORKSHOP_STORAGE_KEY, next);
  return next;
};

export const deleteWorkshop = (workshopId) => {
  const next = getStoredWorkshops().filter((item) => item.id !== workshopId);
  writeStorage(WORKSHOP_STORAGE_KEY, next);
  return next;
};

export const setWorkshopStatusOverride = (workshopId, status) => {
  const current = getStoredWorkshopStatusOverrides();
  const next = {
    ...current,
    [workshopId]: status,
  };
  writeStorage(WORKSHOP_STATUS_STORAGE_KEY, next);
  return next;
};

export const saveWorkshopType = (workshopType) => {
  const current = getStoredWorkshopTypes();
  const next = [
    {
      id: `custom-type-${Date.now()}`,
      ...workshopType,
    },
    ...current,
  ];

  writeStorage(WORKSHOP_TYPE_STORAGE_KEY, next);
  return next;
};

export const updateWorkshopType = (workshopTypeId, updates) => {
  const next = getStoredWorkshopTypes().map((item) =>
    item.id === workshopTypeId ? { ...item, ...updates } : item
  );
  writeStorage(WORKSHOP_TYPE_STORAGE_KEY, next);
  return next;
};

export const deleteWorkshopType = (workshopTypeId) => {
  const next = getStoredWorkshopTypes().filter((item) => item.id !== workshopTypeId);
  writeStorage(WORKSHOP_TYPE_STORAGE_KEY, next);
  return next;
};
