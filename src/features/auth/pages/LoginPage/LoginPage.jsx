import { Link } from 'react-router-dom';
import Header from '../../../../shared/components/organisms/Header/Header';
import LoginForm from '../../components/LoginForm/LoginForm';
import styles from './LoginPage.module.scss';

function LoginPage() {
  return (
    <div className={styles.page}>
      <Header />

      <div className={styles.content}>
        <h1 className={styles.title}>Bienvenida de nuevo</h1>
        <p className={styles.subtitle}>
          Inicia sesión y consulta tus registros de medicamentos y la información personalizada.
        </p>

        <LoginForm />

        <p className={styles.link}>
          ¿No tienes cuenta?{' '}
          <Link to="/register" className='register_link'>Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;