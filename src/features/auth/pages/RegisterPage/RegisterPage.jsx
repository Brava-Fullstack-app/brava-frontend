import { Link } from 'react-router-dom';
import Header from '../../../../shared/components/organisms/Header/Header';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import styles from './RegisterPage.module.scss';

function RegisterPage() {
  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.content}>
        <h1 className={styles.title}>Crea una cuenta</h1>
        <p className={styles.subtitle}>
          Podrás guardar tus registros de medicamentos, adaptar los
          recordatorios y recibir notificaciones personalizadas.
        </p>

        <RegisterForm />

        <p className={styles.link}>
          ¿Ya tienes cuenta?{' '}
          <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;