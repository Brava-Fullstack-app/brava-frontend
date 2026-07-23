import styles from './Button.module.scss';

function Button({
  children,
  variant = 'primary',
  icon,
  fullWidth = true,
  disabled = false,
  type = 'button',
  ...rest
}) {
  const classNames = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : '',
  ].join(' ');

  return (
    <button type={type} className={classNames} disabled={disabled} {...rest}>
      {icon && <i className={`bi ${icon} ${styles.icon}`}></i>}
      {children}
    </button>
  );
}

export default Button;