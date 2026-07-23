import { useState } from 'react';
import styles from './Input.module.scss';

function Input({
  id,
  label,
  required = false,
  type = 'text',
  icon,
  helperText,
  error,
  clearable = false,
  onClear,
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';
  const resolvedType = isPasswordField && showPassword ? 'text' : type;

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label} {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div className={`${styles.wrapper} ${error ? styles.wrapperError : ''}`}>
        {icon && (
          <span className={styles.leadingIcon}>
            <i className={`bi ${icon}`}></i>
          </span>
        )}

        <input id={id} type={resolvedType} className={styles.input} {...rest} />

        {clearable && rest.value && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={onClear}
            aria-label="Clear"
          >
            <i className="bi bi-x-lg"></i>
          </button>
        )}

        {isPasswordField && (
          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <i className="bi bi-eye"></i> : <i className="bi bi-eye-fill"></i>}
          </button>
        )}

        {error && (
          <span className={styles.errorIcon}>
            <i className="bi bi-exclamation-circle-fill"></i>
          </span>
        )}
      </div>

      {error ? (
        <p className={styles.errorText}>{error}</p>
      ) : helperText ? (
        <p className={styles.helperText}>{helperText}</p>
      ) : null}
    </div>
  );
}

export default Input;