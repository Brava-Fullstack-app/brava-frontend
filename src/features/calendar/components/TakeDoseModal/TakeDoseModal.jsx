import Modal from "../../../../shared/components/organisms/Modal/Modal";
import Button from "../../../../shared/components/atoms/Button/Button";
import styles from "./TakeDoseModal.module.scss";

function TakeDoseModal({ dose, onClose, onConfirm }) {
  return (
    <Modal onClose={onClose}>
      <div className={styles.header}>
        <i className="bi bi-capsule"></i>
      </div>
      <h2 className={styles.title}>Tomar medicamento</h2>
      <p className={styles.subtitle}>
        {dose.medicationName} — {dose.doseAmount} {dose.doseUnit}
      </p>
      <p className={styles.time}>{dose.time}</p>
      <div className={styles.actions}>
        <Button variant="primary" fullWidth onClick={onConfirm}>
          Sí, me lo tomé
        </Button>
        <Button variant="secondary" fullWidth onClick={onClose}>
          Cancelar
        </Button>
      </div>
    </Modal>
  );
}

export default TakeDoseModal;