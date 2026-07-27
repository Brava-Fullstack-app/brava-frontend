import { useState, useEffect } from "react";
import Modal from "../../../../shared/components/organisms/Modal/Modal";
import Input from "../../../../shared/components/atoms/Input/Input";
import Select from "../../../../shared/components/atoms/Select/Select";
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
  });
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
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
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

        <div className={styles.field}>
          <Input
            label="Dosis"
            type="number"
            value={form.doseAmount}
            onChange={(e) => updateField("doseAmount", e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <Select
            label="Unidad"
            value={form.doseUnit}
            options={DOSE_UNITS}
            onChange={(e) => updateField("doseUnit", e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <Input
            label="Hora"
            type="time"
            value={form.time}
            onChange={(e) => updateField("time", e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <Input
              label="Frecuencia"
              type="number"
              value={form.frequencyInterval}
              onChange={(e) => updateField("frequencyInterval", e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <Select
              label="Unidad frecuencia"
              value={form.frequencyUnit}
              options={FREQUENCY_UNITS}
              onChange={(e) => updateField("frequencyUnit", e.target.value)}
            />
          </div>
        </div>

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