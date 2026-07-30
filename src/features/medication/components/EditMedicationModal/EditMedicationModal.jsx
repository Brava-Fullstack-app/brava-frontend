import { useState, useEffect } from "react";
import Modal from "../../../../shared/components/organisms/Modal/Modal";
import Input from "../../../../shared/components/atoms/Input/Input";
import Select from "../../../../shared/components/atoms/Select/Select";
import Stepper from "../../../../shared/components/atoms/Stepper/Stepper";
import Toggle from "../../../../shared/components/atoms/Toggle/Toggle";
import Button from "../../../../shared/components/atoms/Button/Button";
import { DOSE_UNITS, FREQUENCY_UNITS } from "../../../medication/medication.types";
import { medicationApi } from "../../../medication/services/medicationApi";
import styles from "./EditMedicationModal.module.scss";

function EditMedicationModal({ dose, onClose, onConfirm }) {
  const [form, setForm] = useState({
    doseAmount: "",
    doseUnit: "",
    time: "",
    quantity: 1,
    frequencyInterval: "",
    frequencyUnit: "",
    reminderEnabled: false,
    startDate: "",
    endDate: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMedication() {
      try {
        const { data } = await medicationApi.getAll();
        const med = data.find((m) => m.id === dose.medicationId);
        if (med) {
          setForm({
            doseAmount: med.doseAmount ?? "",
            doseUnit: med.doseUnit ?? "",
            time: med.time?.slice(0, 5) ?? "",
            quantity: med.quantity ?? 1,
            frequencyInterval: med.frequencyInterval ?? "",
            frequencyUnit: med.frequencyUnit ?? "",
            reminderEnabled: med.reminderEnabled ?? false,
            startDate: med.startDate ?? "",
            endDate: med.endDate ?? "",
          });
        }
      } catch (err) {
        console.error("Error fetching medication:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMedication();
  }, [dose.medicationId]);

  const updateField = (field, value) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "doseAmount" && value === "") {
        next.doseUnit = "";
      }
      return next;
    });
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const errs = {};
    if (!form.time) errs.time = "Requerido";
    if (!form.frequencyInterval) errs.frequencyInterval = "Requerido";
    if (!form.frequencyUnit) errs.frequencyUnit = "Requerido";
    if (!form.startDate) errs.startDate = "Requerido";
    if (form.doseAmount && !form.doseUnit) errs.doseUnit = "Selecciona una unidad";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const payload = {
      ...form,
      doseAmount: form.doseAmount !== "" ? Number(form.doseAmount) : null,
      doseUnit: form.doseUnit || null,
      time: form.time,
      quantity: Number(form.quantity),
      frequencyInterval: Number(form.frequencyInterval),
      frequencyUnit: form.frequencyUnit,
      reminderEnabled: form.reminderEnabled,
    };
    onConfirm(payload);
  };

  if (loading) return null;

  return (
    <Modal onClose={onClose}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Editar medicamento</h2>
        <p className={styles.subtitle}>{dose.medicationName}</p>

        <Stepper
          label="Cantidad"
          value={form.quantity}
          onChange={(value) => updateField("quantity", value)}
        />

        <div className={styles.row}>
          <div className={styles.field}>
            <Input
              label="Dosis (opcional)"
              type="number"
              min="0"
              placeholder="Ej. 20"
              value={form.doseAmount}
              error={errors.doseAmount}
              onChange={(e) => updateField("doseAmount", e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <Select
              label="Unidad (opcional)"
              placeholder="mg"
              value={form.doseUnit}
              options={DOSE_UNITS}
              error={errors.doseUnit}
              onChange={(e) => updateField("doseUnit", e.target.value)}
            />
          </div>
        </div>

        <div className={styles.field}>
          <Input
            label="Hora"
            type="time"
            value={form.time}
            error={errors.time}
            onChange={(e) => updateField("time", e.target.value)}
            required
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <Input
              label="¿Cada cuánto?"
              type="number"
              placeholder="24"
              value={form.frequencyInterval}
              error={errors.frequencyInterval}
              onChange={(e) => updateField("frequencyInterval", e.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <Select
              label="Frecuencia"
              placeholder="Días"
              value={form.frequencyUnit}
              options={FREQUENCY_UNITS}
              error={errors.frequencyUnit}
              onChange={(e) => updateField("frequencyUnit", e.target.value)}
            />
          </div>
        </div>

        <div className={styles.field}>
          <Input
            label="Fecha de inicio"
            type="date"
            value={form.startDate}
            onChange={(e) => updateField("startDate", e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <Input
            label="Fecha de fin (opcional)"
            type="date"
            value={form.endDate}
            onChange={(e) => updateField("endDate", e.target.value)}
          />
        </div>

        <Toggle
          label="Recordatorio"
          checked={form.reminderEnabled}
          onChange={(checked) => updateField("reminderEnabled", checked)}
        />

        <div className={styles.actions}>
          <Button variant="primary" fullWidth onClick={handleSubmit}>
            Guardar cambios
          </Button>
          <Button variant="secondary" fullWidth onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default EditMedicationModal;