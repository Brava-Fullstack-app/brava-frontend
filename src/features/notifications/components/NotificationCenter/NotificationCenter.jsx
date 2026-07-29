import { useNotifications } from "../../context/useNotifications";
import NotificationToast from "../NotificationToast/NotificationToast";
import styles from "./NotificationCenter.module.scss";

function NotificationCenter({ onDoseRegistered }) {
  const { notifications } = useNotifications();

  return (
    <>
      {notifications.length > 0 && <div className={styles.backdrop} />}
      <div className={styles.root}>
        <div className={styles.container}>
          {notifications.map((notification) => (
            <div key={notification.id} className={styles.toastWrapper}>
              <NotificationToast
                notification={notification}
                onDoseRegistered={onDoseRegistered}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default NotificationCenter;