import { PersonCircle } from 'react-bootstrap-icons';
import Logo from '../../atoms/Logo/Logo';
import styles from './Header.module.scss';

function Header({ showProfile = false, onProfileClick }) {
  return (
    <header className={styles.header}>
      <Logo size="small" />

      {showProfile && (
        <button
          type="button"
          className={styles.profileButton}
          onClick={onProfileClick}
          aria-label="Open profile menu"
        >
          <PersonCircle size={24} />
          <span className={styles.profileLabel}>Perfil</span>
        </button>
      )}
    </header>
  );
}

export default Header;