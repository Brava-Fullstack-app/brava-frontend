import httpClient from "../../../services/httpClient";
import { CALENDAR_ENDPOINTS } from "../calendar.types";

export const calendarApi = {
  getMonthOverview: (year, month) =>
    httpClient.get(CALENDAR_ENDPOINTS.MONTH_OVERVIEW, {
      params: { year, month },
    }),

  getNextDose: () =>
    httpClient.get(CALENDAR_ENDPOINTS.NEXT_DOSE),
};