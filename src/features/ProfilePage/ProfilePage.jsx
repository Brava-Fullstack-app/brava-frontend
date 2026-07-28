import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";
import Button from "../../shared/components/atoms/Button/Button";
import styles from "./ProfilePage.module.scss";

function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Mi perfil</h1>

      <div className={styles.card}>
        <div className={styles.avatar}>
          <i className="bi bi-person-fill"></i>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Nombre</span>
          <span className={styles.value}>{user?.name}</span>
        </div>
        <div className={styles.field}>
          <span className={styles.label}>Correo</span>
          <span className={styles.value}>{user?.email}</span>
        </div>
      </div>

      <div className={styles.card}>
        <Button variant="danger" fullWidth onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i> Cerrar sesión
        </Button>
      </div>
    </div>
  );
}

export default ProfilePage;