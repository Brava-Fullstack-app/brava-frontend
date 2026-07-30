import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "../../organisms/Header/Header";
import NotificationCenter from "../../../../features/notifications/components/NotificationCenter/NotificationCenter";
import { useNotificationScheduler } from "../../../../features/notifications/hooks/useNotificationScheduler";
import styles from "./AppLayout.module.scss";

function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  useNotificationScheduler();

  const isHomeActive = location.pathname === "/calendar";
  const isProfileActive = location.pathname === "/profile";

  return (
    <div className={styles.layout}>
      <Header
        showProfile
        showHome
        isHomeActive={isHomeActive}
        isProfileActive={isProfileActive}
        onProfileClick={() => navigate("/profile")}
        onHomeClick={() => navigate("/calendar")}
      />
      <main className={styles.content}>
        <Outlet />
      </main>
      <NotificationCenter />
    </div>
  );
}

export default AppLayout;
