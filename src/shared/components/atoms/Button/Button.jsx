import styles from './Button.module.scss';

function Button({
  children,
  variant = 'primary',
  icon: Icon,
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
      {Icon && <Icon size={18} className={styles.icon} />}
      {children}
    </button>
  );
}

export default Button;