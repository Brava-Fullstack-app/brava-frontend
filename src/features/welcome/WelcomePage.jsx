import { useNavigate } from "react-router-dom";
import Button from "../../shared/components/atoms/Button/Button";
import styles from "./WelcomePage.module.scss";

function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <img src="src\assets\images\Logo Brava.svg" alt="Brava logo" className={styles.logo} />

      <img
        src="src\assets\images\Onb. final (20260106024041).png"
        alt="Ilustración mujer con pañuelo estilo lineal, blanco y negro con patrones"
        className={styles.illustration}
      />

      <p className={styles.description}>
        Brava es un espacio adaptado a tus necesidades con herramientas y
        recursos que te ayudarán en tu proceso oncológico.
      </p>

      <Button onClick={() => navigate("/register")}>Crea una cuenta</Button>

      <p className={styles.loginLink}>
        Si ya tienes una cuenta,{" "}
        <a onClick={() => navigate("/login")} role="link" tabIndex={0}>
          inicia sesión
        </a>
      </p>
    </div>
  );
}

export default WelcomePage;
