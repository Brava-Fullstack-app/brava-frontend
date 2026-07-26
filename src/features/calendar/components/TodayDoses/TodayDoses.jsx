import { format } from "date-fns";
import { es } from "date-fns/locale";
import styles from "./TodayDoses.module.scss";

function TodayDoses({ doses = [], onDoseClick }) {
  const today = format(new Date(), "'Hoy,' d 'de' MMMM", { locale: es });

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{today}</h2>
      <div className={styles.container}>
        {doses.length === 0 ? (
          <p className={styles.empty}>No hay medicamentos para hoy</p>
        ) : (
          <ul className={styles.list}>
            {doses.map((dose) => (
              <li
                key={dose.medicationId}
                className={`${styles.item} ${dose.status === "COMPLETED" ? styles.completed : ""}`}
                onClick={() => dose.status === "PENDING" && onDoseClick?.(dose)}
              >
                <div className={styles.info}>
                  <span className={styles.name}>{dose.medicationName}</span>
                  <span className={styles.time}>{dose.time}</span>
                </div>
                <span className={styles.doseInfo}>
                  {dose.doseAmount} {dose.doseUnit}
                </span>
                <span
                  className={`${styles.status} ${dose.status === "COMPLETED" ? styles.statusCompleted : styles.statusPending}`}
                >
                  {dose.status === "COMPLETED" ? "Tomado" : "Pendiente"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TodayDoses;