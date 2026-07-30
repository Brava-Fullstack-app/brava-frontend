import httpClient from "../../../services/httpClient";
import { MEDICATION_ENDPOINTS, MEDICATION_CATALOG_ENDPOINT } from "../medication.types";

export const medicationApi = {
  getAll: () =>
    httpClient.get(MEDICATION_ENDPOINTS.LIST),

  getToday: () =>
    httpClient.get(MEDICATION_ENDPOINTS.TODAY),

  getNextDose: () =>
    httpClient.get(MEDICATION_ENDPOINTS.NEXT_DOSE),

  create: (data) =>
    httpClient.post(MEDICATION_ENDPOINTS.CREATE, data),

  update: (medicationId, data) =>
    httpClient.put(MEDICATION_ENDPOINTS.UPDATE(medicationId), data),

  remove: (medicationId) =>
    httpClient.delete(MEDICATION_ENDPOINTS.DELETE(medicationId)),

  registerDose: (medicationId, data) =>
    httpClient.post(MEDICATION_ENDPOINTS.REGISTER_DOSE(medicationId), data),

  getCatalog: (category) =>
    httpClient.get(MEDICATION_CATALOG_ENDPOINT, {
      params: category ? { category } : {},
    }),

    getByDate: (date) =>
  httpClient.get(MEDICATION_ENDPOINTS.BY_DATE, {
    params: { date },
  })
};