import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CATEGORY_COLORS } from "../../../medication/medication.types";
import styles from "./TodayDoses.module.scss";

function TodayDoses({ doses = [], onDoseClick, onEdit, onDelete, showActions = false, title }) {
  const today = format(new Date(), "'Hoy,' d 'de' MMMM", { locale: es });
  const displayTitle = title || today;

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>{displayTitle}</h2>
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
                <span
                  className={styles.bar}
                  style={{
                    background:
                      CATEGORY_COLORS[dose.treatmentCategory] ||
                      CATEGORY_COLORS.OTHER,
                  }}
                />
                <div className={styles.cardWrapper}>
                  <div className={styles.info}>
                    <span className={styles.name}>{dose.medicationName}</span>
                    <div className={styles.details}>
                      <span className={styles.time}>
                        {dose.scheduledTime?.slice(0, 5)}
                      </span>
                      {dose.doseAmount != null && (
                        <>
                          <span>•</span>
                          <span className={styles.doseInfo}>
                            {dose.doseAmount} {dose.doseUnit}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className={styles.right}>
                    <span
                      className={`${styles.status} ${dose.status === "COMPLETED" ? styles.statusCompleted : styles.statusPending}`}
                    >
                      {dose.status === "COMPLETED" ? "Tomado" : "Pendiente"}
                    </span>
                    {showActions && (
                      <div className={styles.actions}>
                        <button
                          className={styles.actionBtn}
                          onClick={(e) => { e.stopPropagation(); onEdit?.(dose); }}
                          aria-label="Editar"
                        >
                          <i className="bi bi-pen"></i>
                          <i className="bi bi-pen-fill"></i>
                        </button>
                        <button
                          className={styles.actionBtn}
                          onClick={(e) => { e.stopPropagation(); onDelete?.(dose); }}
                          aria-label="Borrar"
                        >
                          <i className="bi bi-trash"></i>
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default TodayDoses;