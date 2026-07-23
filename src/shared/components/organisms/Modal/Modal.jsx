import styles from './Modal.module.scss';

function Modal({ title, imageSrc, imageAlt = '', subtitle, children }) {
  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <div className={styles.card}>
        {title && <h2 className={styles.title}>{title}</h2>}

        {imageSrc && <img src={imageSrc} alt={imageAlt} className={styles.image} />}

        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        {children}
      </div>
    </div>
  );
}

export default Modal;