import { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../../../shared/components/organisms/Header/Header';
import Modal from '../../../../shared/components/organisms/Modal/Modal';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import styles from './RegisterPage.module.scss';

function RegisterPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleRegisterSuccess = useCallback(() => {
    setShowModal(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setShowModal(false);
    navigate('/calendar');
  }, [navigate]);

  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.content}>
        <h1 className={styles.title}>Crea una cuenta</h1>
        <p className={styles.subtitle}>
          Podrás guardar tus registros de medicamentos, adaptar los
          recordatorios y recibir notificaciones personalizadas.
        </p>

        <RegisterForm onSuccess={handleRegisterSuccess} />

        <p className={styles.link}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login">Inicia sesión</Link>
        </p>
      </div>

      {showModal && (
        <Modal
          title="¡Cuenta creada!"
          subtitle="Tu cuenta ha sido creada exitosamente. ¡Ya formas parte de Brava!"
          duration={3000}
          onClose={handleModalClose}
          imageSrc="src\assets\images\animo (20260105074857).png"
        />
      )}
    </div>
  );
}

export default RegisterPage;