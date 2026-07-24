export const MEDICATION_ENDPOINTS = {
  LIST: "/api/medications",
  CREATE: "/api/medications",
  TODAY: "/api/medications/today",
  REGISTER_DOSE: (id) => `/api/medications/${id}/doses`,
};