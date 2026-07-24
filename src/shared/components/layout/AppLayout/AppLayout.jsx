import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../organisms/Header/Header";
import styles from "./AppLayout.module.scss";

function AppLayout() {
  const navigate = useNavigate();

  return (
    <div className={styles.layout}>
      <Header
        showProfile
        showHome
        onProfileClick={() => navigate("/profile")}
        onHomeClick={() => navigate("/calendar")}
      />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;