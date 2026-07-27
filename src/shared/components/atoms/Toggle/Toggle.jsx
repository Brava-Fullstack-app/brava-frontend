import styles from './Toggle.module.scss';

function Toggle({ id, label, description, checked, onChange }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        {label && <p className={styles.label}>{label}</p>}
        {description && <p className={styles.description}>{description}</p>}
      </div>

      <button
        type="button"
        id={id}
        role="switch"
        aria-checked={checked}
        className={`${styles.track} ${checked ? styles.trackOn : ''}`}
        onClick={() => onChange(!checked)}
      >
        <span className={styles.thumb} />
      </button>
    </div>
  );
}

export default Toggle;