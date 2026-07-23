import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../../../shared/components/organisms/Header/Header';
import Toast from '../../../../shared/components/organisms/Toast/Toast';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.scss';

function LoginPage() {
  const navigate = useNavigate();
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [errorToast, setErrorToast] = useState({ message: '', type: 'error' });

  const handleLoginSuccess = useCallback(() => {
    setShowSuccessToast(true);
  }, []);

  const handleLoginError = useCallback((message) => {
    setErrorToast({ message, type: 'error' });
  }, []);

  const handleSuccessClose = useCallback(() => {
    setShowSuccessToast(false);
    navigate('/calendar');
  }, [navigate]);

  const handleErrorClose = useCallback(() => {
    setErrorToast({ message: '', type: 'error' });
  }, []);

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.content}>
        <h1 className={styles.title}>¡Bienvenid@ de nuevo!</h1>
        <p className={styles.subtitle}>
          Inicia sesión y consulta tus registros de medicamentos y la información personalizada.
        </p>

        <LoginForm onSuccess={handleLoginSuccess} onError={handleLoginError} />

        <p className={styles.link}>
          ¿No tienes cuenta?{' '}
          <Link to="/register" className='register_link'>Regístrate aquí</Link>
        </p>
      </div>

      {showSuccessToast && (
        <Toast
          message="Sesión iniciada correctamente"
          type="success"
          onClose={handleSuccessClose}
          duration={3000}
        />
      )}

      {errorToast.message && (
        <Toast
          message={errorToast.message}
          type={errorToast.type}
          onClose={handleErrorClose}
          duration={3000}
        />
      )}
    </div>
  );
}

export default LoginPage;