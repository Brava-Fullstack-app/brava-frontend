import { useNotifications } from "../../context/useNotifications";
import NotificationToast from "../NotificationToast/NotificationToast";
import styles from "./NotificationCenter.module.scss";

function NotificationCenter({ onDoseRegistered }) {
  const { notifications } = useNotifications();

  return (
    <div className={styles.container}>
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className={styles.toastWrapper}
          style={{ top: `${16 + index * 180}px` }}
        >
          <NotificationToast
            notification={notification}
            onDoseRegistered={onDoseRegistered}
          />
        </div>
      ))}
    </div>
  );
}

export default NotificationCenter;