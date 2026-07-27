import styles from './FormCard.module.scss';

function FormCard({ title, children }) {
  return (
    <section className={styles.card}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.content}>{children}</div>
    </section>
  );
}

export default FormCard;