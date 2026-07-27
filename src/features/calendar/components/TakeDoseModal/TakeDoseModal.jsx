import { useState, useMemo } from "react";
import { format, parseISO, isToday, isFuture, differenceInMinutes } from "date-fns";
import Modal from "../../../../shared/components/organisms/Modal/Modal";
import Input from "../../../../shared/components/atoms/Input/Input";
import Button from "../../../../shared/components/atoms/Button/Button";
import styles from "./TakeDoseModal.module.scss";

function TakeDoseModal({ dose, date, onClose, onConfirm }) {
  const doseDate = date || format(new Date(), "yyyy-MM-dd");
  const scheduledDateTime = useMemo(
    () => parseISO(`${doseDate}T${dose.scheduledTime}`),
    [doseDate, dose.scheduledTime]
  );

  const defaultTime = dose.scheduledTime?.slice(0, 5) || "00:00";
  const [selectedTime, setSelectedTime] = useState(defaultTime);

  const now = useMemo(() => new Date(), []);

  const isFutureDay = isFuture(scheduledDateTime) && !isToday(scheduledDateTime);

  const minutesLeft = useMemo(() => {
    const [hours, minutes] = selectedTime.split(":").map(Number);
    const selected = new Date(scheduledDateTime);
    selected.setHours(hours, minutes, 0, 0);
    return differenceInMinutes(selected, now);
  }, [selectedTime, scheduledDateTime, now]);

  const isFutureToday = isToday(scheduledDateTime) && minutesLeft > 0;

  const handleConfirm = () => {
    const [hours, minutes] = selectedTime.split(":").map(Number);
    const takenAt = new Date(scheduledDateTime);
    takenAt.setHours(hours, minutes, 0, 0);
    onConfirm(takenAt.toISOString());
  };

  const formatTimeLeft = (mins) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h > 0) return `${h} hora${h !== 1 ? "s" : ""} y ${m} minuto${m !== 1 ? "s" : ""}`;
    return `${m} minuto${m !== 1 ? "s" : ""}`;
  };

  return (
    <Modal onClose={onClose}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <i className="bi bi-capsule"></i>
        </div>
        <h2 className={styles.title}>Tomar medicamento</h2>
        <p className={styles.subtitle}>
          {dose.medicationName}
          {dose.doseAmount != null && ` — ${dose.doseAmount} ${dose.doseUnit}`}
        </p>

        <div className={styles.timeField}>
          <label className={styles.timeLabel}>¿A qué hora te lo tomaste?</label>
          <Input
            type="time"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          />
        </div>

        {isFutureDay && (
          <p className={styles.warning}>
            <i className="bi bi-exclamation-circle"></i>
            Este medicamento es para otro día. No puedes marcarlo como tomado aún.
          </p>
        )}

        {isFutureToday && !isFutureDay && (
          <p className={styles.warning}>
            <i className="bi bi-exclamation-circle"></i>
            Todavía faltan {formatTimeLeft(minutesLeft)} para la hora programada.
            ¿Confirmas que ya te lo tomaste?
          </p>
        )}

        <div className={styles.actions}>
          <Button
            variant="primary"
            fullWidth
            onClick={handleConfirm}
            disabled={isFutureDay}
          >
            {isFutureToday && !isFutureDay ? "Sí, confirmar" : "Sí, me lo tomé"}
          </Button>
          <Button variant="secondary" fullWidth onClick={onClose}>
            Cancelar
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default TakeDoseModal;