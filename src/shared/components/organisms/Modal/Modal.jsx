import { useEffect } from 'react';
import styles from './Modal.module.scss';

function Modal({ title, imageSrc, imageAlt = '', subtitle, duration = 60000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <div className={styles.card}>
        {title && <h2 className={styles.title}>{title}</h2>}

        {imageSrc && <img src={imageSrc} alt={imageAlt} className={styles.image} />}

        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </div>
  );
}

export default Modal;