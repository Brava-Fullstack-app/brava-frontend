import styles from "./NextDoseCard.module.scss";

function NextDoseCard({ dose, onClick }) {
  if (!dose) return null;

  const scheduledDate = new Date(dose.scheduledAt);
  const now = new Date();
  const diffMs = scheduledDate - now;

  if (diffMs <= 0) {
    const hours = scheduledDate.getHours().toString().padStart(2, "0");
    const minutes = scheduledDate.getMinutes().toString().padStart(2, "0");

    return (
      <div className={styles.card}>
        <div className={styles.icon}>
          <i className="bi bi-capsule-pill"></i>
        </div>
        <div className={styles.info}>
          <span className={styles.name}>{dose.medicationName}</span>
          <span className={styles.timeLeft}>
            • {hours}:{minutes}
          </span>
        </div>
      </div>
    );
  }

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const hours = scheduledDate.getHours().toString().padStart(2, "0");
  const minutes = scheduledDate.getMinutes().toString().padStart(2, "0");

  const timeLeft =
    diffHours > 0
      ? `en ${diffHours} hora${diffHours !== 1 ? "s" : ""} • ${hours}:${minutes}`
      : `en ${diffMinutes} min • ${hours}:${minutes}`;

  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        <i className="bi bi-capsule-pill"></i>
      </div>
      <div className={styles.info}>
        <span className={styles.name}>{dose.medicationName}</span>
        <span className={styles.timeLeft}>{timeLeft}</span>
      </div>
      <button
        className={styles.arrowButton}
        aria-label="Ver detalle"
        onClick={onClick}
      >
        <i className="bi bi-arrow-right-circle"></i>
      </button>
    </div>
  );
}

export default NextDoseCard;
