import { useEffect } from 'react';
import styles from './Toast.module.scss';

function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`${styles.toast} ${styles[type]}`} role="status">
      {message}
    </div>
  );
}

export default Toast;