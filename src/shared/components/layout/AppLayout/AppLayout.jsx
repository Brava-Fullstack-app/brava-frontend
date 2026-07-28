import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../organisms/Header/Header";
import NotificationCenter from "../../../../features/notifications/components/NotificationCenter/NotificationCenter";
import { useNotificationScheduler } from "../../../../features/notifications/hooks/useNotificationScheduler";
import styles from "./AppLayout.module.scss";

function AppLayout() {
  const navigate = useNavigate();
  useNotificationScheduler();
  const [refreshFn, setRefreshFn] = useState(null);

  return (
    <div className={styles.layout}>
      <Header
        showProfile
        showHome
        onProfileClick={() => navigate("/profile")}
        onHomeClick={() => navigate("/calendar")}
      />
      <main className={styles.content}>
        <Outlet context={{ registerRefresh: setRefreshFn }} />
      </main>
      <NotificationCenter onDoseRegistered={refreshFn} />
    </div>
  );
}

export default AppLayout;