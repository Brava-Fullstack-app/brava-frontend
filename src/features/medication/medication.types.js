export const MEDICATION_ENDPOINTS = {
  LIST: "/api/medications",
  CREATE: "/api/medications",
  UPDATE: (id) => `/api/medications/${id}`,
  DELETE: (id) => `/api/medications/${id}`,
  NEXT_DOSE: "/api/medications/next-dose",
  TODAY: "/api/medications/today",
  BY_DATE: "/api/medications/date",
  REGISTER_DOSE: (id) => `/api/medications/${id}/doses`,
};

export const MEDICATION_CATALOG_ENDPOINT = "/api/medication-catalog";

export const TREATMENT_CATEGORIES = [
  { value: "CHEMOTHERAPY", label: "Quimioterapia" },
  { value: "TARGETED_THERAPY", label: "Terapia dirigida" },
  { value: "HORMONE_THERAPY", label: "Hormonoterapia" },
  { value: "IMMUNOTHERAPY", label: "Inmunoterapia" },
  { value: "OTHER", label: "Otro" },
];

export const DOSE_UNITS = [
  { value: "MG", label: "mg" },
  { value: "ML", label: "ml" },
  { value: "G", label: "g" },
  { value: "UI", label: "UI" },
];

export const FREQUENCY_UNITS = [
  { value: "HOURS", label: "Horas" },
  { value: "DAYS", label: "Días" },
  { value: "MONTHS", label: "Meses" },
];

export const CATEGORY_COLORS = {
  CHEMOTHERAPY: "#D71672",
  TARGETED_THERAPY: "#7B61FF",
  HORMONE_THERAPY: "#F27DA0",
  IMMUNOTHERAPY: "#00C48C",
  OTHER: "#E8457E",
};

export {};