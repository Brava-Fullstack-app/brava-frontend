import { useNavigate } from "react-router-dom";
import Button from "../../shared/components/atoms/Button/Button";
import styles from "./NotFoundPage.module.scss";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Página no encontrada</h1>
      <p className={styles.subtitle}>La página que buscas no existe o ha sido movida.</p>
      <img src="/NotFound.png" alt="Página no encontrada" className={styles.image} />
      <Button variant="primary" onClick={() => navigate("/calendar")}>
        Volver al inicio
      </Button>
    </div>
  );
}

export default NotFoundPage;