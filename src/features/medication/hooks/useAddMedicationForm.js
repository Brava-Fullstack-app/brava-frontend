import { useState } from "react";
import { medicationApi } from "../services/medicationApi";

const INITIAL_STATE = {
  treatmentCategory: "",
  medicationName: "",
  quantity: 1,
  doseAmount: "",
  doseUnit: "",
  time: "",
  frequencyInterval: "",
  frequencyUnit: "DAYS",
  startDate: new Date().toISOString().split("T")[0],
  endDate: "",
  reminderEnabled: true,
};

export function useAddMedicationForm() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  async function submit() {
    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        medicationName: formData.medicationName,
        quantity: formData.quantity,
        doseAmount: formData.doseAmount ? Number(formData.doseAmount) : null,
        doseUnit: formData.doseUnit || null,
        time: formData.time ? `${formData.time}:00` : "00:00:00",
        frequencyInterval: Number(formData.frequencyInterval) || 1,
        frequencyUnit: formData.frequencyUnit,
        startDate: formData.startDate,
        endDate: formData.endDate || null,
        reminderEnabled: formData.reminderEnabled,
      };

      await medicationApi.create(payload);
      return true;
    } catch (err) {
      setError(
        err.response?.data?.message ?? "No se pudo guardar el medicamento",
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  return { formData, updateField, submit, isLoading, error };
}
