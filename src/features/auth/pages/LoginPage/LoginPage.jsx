import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../../../shared/components/organisms/Header/Header';
import Toast from '../../../../shared/components/organisms/Toast/Toast';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.scss';

function LoginPage() {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);

  const handleLoginSuccess = useCallback(() => {
    setShowToast(true);
  }, []);

  const handleToastClose = useCallback(() => {
    setShowToast(false);
    navigate('/calendar');
  }, [navigate]);

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.content}>
        <h1 className={styles.title}>¡Bienvenid@ de nuevo!</h1>
        <p className={styles.subtitle}>
          Inicia sesión y consulta tus registros de medicamentos y la información personalizada.
        </p>

        <LoginForm onSuccess={handleLoginSuccess} />

        <p className={styles.link}>
          ¿No tienes cuenta?{' '}
          <Link to="/register" className='register_link'>Regístrate aquí</Link>
        </p>
      </div>

      {showToast && (
        <Toast
          message="Sesión iniciada correctamente"
          type="success"
          onClose={handleToastClose}
          duration={3000}
        />
      )}
    </div>
  );
}

export default LoginPage;