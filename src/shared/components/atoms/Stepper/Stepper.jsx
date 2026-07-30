import styles from './Stepper.module.scss';

function Stepper({ id, label, value, onChange, min = 1, max = 99 }) {
  function decrease() {
    if (value > min) onChange(value - 1);
  }

  function increase() {
    if (value < max) onChange(value + 1);
  }

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.stepper}>
        <button
          type="button"
          className={styles.button}
          onClick={decrease}
          disabled={value <= min}
          aria-label="Decrease quantity"
        >
          <i className="bi bi-dash"></i>
        </button>

        <span id={id} className={styles.value} aria-live="polite">
          {value}
        </span>

        <button
          type="button"
          className={styles.button}
          onClick={increase}
          disabled={value >= max}
          aria-label="Increase quantity"
        >
          <i className="bi bi-plus"></i>
        </button>
      </div>
    </div>
  );
}

export default Stepper;