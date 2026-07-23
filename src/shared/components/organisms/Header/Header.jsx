import styles from "./Header.module.scss";

function Header({
  showProfile = false,
  showHome = false,
  onProfileClick,
  onHomeClick,
}) {
  return (
    <header className={styles.header}>
      <img
        src="public\Simbol brava 1.svg"
        alt="Brava icon"
        className={styles.logo}
      />

      <div className={styles.rightGroup}>
        {showProfile && (
          <button
            type="button"
            className={styles.profileButton}
            onClick={onProfileClick}
            aria-label="Open profile menu"
          >
            <i className="bi bi-person-circle"></i>
            <span className={styles.profileLabel}>Perfil</span>
          </button>
        )}

        {showHome && (
          <button
            type="button"
            className={styles.iconButton}
            onClick={onHomeClick}
            aria-label="Go to home"
          >
            <i className="bi bi-house"></i>
            <i className="bi bi-house-fill"></i>
            <span className={styles.profileLabel}>Inicio</span>
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
