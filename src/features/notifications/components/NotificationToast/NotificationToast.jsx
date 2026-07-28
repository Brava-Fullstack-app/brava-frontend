import { useState } from "react";
import { useNotifications } from "../../context/useNotifications";
import { medicationApi } from "../../../medication/services/medicationApi";
import Button from "../../../../shared/components/atoms/Button/Button";
import Input from "../../../../shared/components/atoms/Input/Input";
import styles from "./NotificationToast.module.scss";

function NotificationToast({ notification, onDoseRegistered }) {
  const { removeNotification } = useNotifications();
  const [time, setTime] = useState(() => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
  });

  const handleConfirm = async () => {
    try {
      const [h, m] = time.split(":").map(Number);
      const takenAt = new Date();
      takenAt.setHours(h, m, 0, 0);
      await medicationApi.registerDose(notification.medicationId, {
        takenAt: takenAt.toISOString(),
      });
      removeNotification(notification.id);
      onDoseRegistered?.();
    } catch (err) {
      console.error("Error registering dose:", err);
    }
  };

  return (
    <div className={`${styles.toast} ${notification.type === "now" ? styles.toastNow : styles.toastReminder}`}>
      <div className={styles.header}>
        <i className="bi bi-bell-fill"></i>
        <span className={styles.typeLabel}>
          {notification.type === "now" ? "Es hora de tomar" : "En 5 minutos"}
        </span>
        <button className={styles.closeBtn} onClick={() => removeNotification(notification.id)}>
          <i className="bi bi-x-lg"></i>
        </button>
      </div>

      <div className={styles.body}>
        <span className={styles.medName}>{notification.medicationName}</span>
        {notification.doseAmount != null && (
          <span className={styles.doseInfo}>
            {notification.doseAmount} {notification.doseUnit}
          </span>
        )}
      </div>

      {notification.type === "now" && (
        <div className={styles.actions}>
          <Input
            label="Hora"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <Button variant="primary" fullWidth onClick={handleConfirm}>
            Marcar como tomado
          </Button>
        </div>
      )}
    </div>
  );
}

export default NotificationToast;