import { useState } from "react";
import { format} from "date-fns";
import Modal from "../../../../shared/components/organisms/Modal/Modal";
import Input from "../../../../shared/components/atoms/Input/Input";
import Button from "../../../../shared/components/atoms/Button/Button";
import styles from "./TakeDoseModal.module.scss";

function TakeDoseModal({ dose, date, onClose, onConfirm }) {
  const doseDate = dose.scheduledAt
    ? dose.scheduledAt.slice(0, 10)
    : date || format(new Date(), "yyyy-MM-dd");

  const isAnotherDay = doseDate !== format(new Date(), "yyyy-MM-dd");

  const schedHour = dose.scheduledAt
    ? parseInt(dose.scheduledAt.slice(11, 13), 10)
    : parseInt((dose.scheduledTime || "00:00").slice(0, 2), 10);
  const schedMin = dose.scheduledAt
    ? parseInt(dose.scheduledAt.slice(14, 16), 10)
    : parseInt((dose.scheduledTime || "00:00").slice(3, 5), 10);

  const doseDt = new Date(`${doseDate}T${String(schedHour).padStart(2, "0")}:${String(schedMin).padStart(2, "0")}:00`);
  const isDoseInFuture = doseDt > new Date();

  const defaultTime = `${String(schedHour).padStart(2, "0")}:${String(schedMin).padStart(2, "0")}`;
  const [selectedTime, setSelectedTime] = useState(defaultTime);

  const handleConfirm = () => {
  const [hours, minutes] = selectedTime.split(":").map(Number);
  const now = new Date();
  const localStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
  onConfirm(localStr);
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

        {isAnotherDay && (
          <p className={styles.warning}>
            <i className="bi bi-exclamation-circle"></i>
            Este medicamento es para {doseDate}. No puedes marcarlo como tomado aún.
          </p>
        )}

        {!isAnotherDay && isDoseInFuture && (
          <p className={styles.warning}>
            <i className="bi bi-exclamation-circle"></i>
            Todavía faltan para la hora programada. ¿Confirmas que ya te lo tomaste?
          </p>
        )}

        <div className={styles.actions}>
          <Button
            variant="primary"
            fullWidth
            onClick={handleConfirm}
            disabled={isAnotherDay || isDoseInFuture}
          >
            {isDoseInFuture && !isAnotherDay ? "Sí, confirmar" : "Sí, me lo tomé"}
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