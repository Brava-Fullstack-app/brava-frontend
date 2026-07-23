import { useState } from 'react';
import { ExclamationCircleFill, EyeFill, EyeSlashFill } from 'react-bootstrap-icons';
import styles from './Input.module.scss';

function Input({
  id,
  label,
  required = false,
  type = 'text',
  icon: LeadingIcon,
  helperText,
  error,
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
        {LeadingIcon && (
          <span className={styles.leadingIcon}>
            <LeadingIcon size={18} />
          </span>
        )}

        <input id={id} type={resolvedType} className={styles.input} {...rest} />

        {isPasswordField && (
          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeSlashFill size={18} /> : <EyeFill size={18} />}
          </button>
        )}

        {error && (
          <span className={styles.errorIcon}>
            <ExclamationCircleFill size={18} />
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