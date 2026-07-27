import styles from './Select.module.scss';

function Select({ id, label, required, placeholder, options, error, helperText, ...rest }) {
  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div className={`${styles.wrapper} ${error ? styles.wrapperError : ''}`}>
        <select id={id} className={styles.select} defaultValue="" {...rest}>
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <i className={`bi bi-chevron-down ${styles.chevron}`}></i>
      </div>

      {error ? (
        <p className={styles.errorText}>{error}</p>
      ) : helperText ? (
        <p className={styles.helperText}>{helperText}</p>
      ) : null}
    </div>
  );
}

export default Select;