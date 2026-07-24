import httpClient from "../../../services/httpClient";
import { MEDICATION_ENDPOINTS } from "../medication.types";

export const medicationApi = {
  getAll: () =>
    httpClient.get(MEDICATION_ENDPOINTS.LIST),

  getToday: () =>
    httpClient.get(MEDICATION_ENDPOINTS.TODAY),

  create: (data) =>
    httpClient.post(MEDICATION_ENDPOINTS.CREATE, data),

  registerDose: (medicationId, data) =>
    httpClient.post(MEDICATION_ENDPOINTS.REGISTER_DOSE(medicationId), data),
};