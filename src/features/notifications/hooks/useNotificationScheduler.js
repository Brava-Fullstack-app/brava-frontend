import { useEffect, useRef } from "react";
import { useNotifications } from "../../notifications/context/useNotifications";
import { medicationApi } from "../../medication/services/medicationApi";

let audioUnlocked = false;

function unlockAudio() {
  if (audioUnlocked) return;
  const temp = new Audio("/notification-sound.mp3");
  temp.volume = 0;
  temp.play().then(() => {
    temp.pause();
    temp.currentTime = 0;
    audioUnlocked = true;
    document.removeEventListener("click", unlockAudio);
  }).catch(() => {});
}

document.addEventListener("click", unlockAudio);

function playSound() {
  if (!audioUnlocked) return;
  const audio = new Audio("/notification-sound.mp3");
  audio.play().catch(() => {});
}

export function useNotificationScheduler() {
  const { addNotification } = useNotifications();
  const stateRef = useRef({ sent: new Set() });

  useEffect(() => {
    const check = async () => {
      try {
        const { data: doses } = await medicationApi.getToday();
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        for (const dose of doses) {
          if (dose.status === "COMPLETED") continue;

          const [h, m] = dose.scheduledTime.split(":").map(Number);
          const doseMinutes = h * 60 + m;
          const diff = doseMinutes - currentMinutes;

          const today = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
          const keyNow = `${dose.medicationId}-now-${today}-${h}-${m}`;
          const key5 = `${dose.medicationId}-5min-${today}-${h}-${m}`;

          if (diff === 0 && !stateRef.current.sent.has(keyNow)) {
            stateRef.current.sent.add(keyNow);
            addNotification({
              medicationId: dose.medicationId,
              medicationName: dose.medicationName,
              doseAmount: dose.doseAmount,
              doseUnit: dose.doseUnit,
              scheduledTime: dose.scheduledTime,
              treatmentCategory: dose.treatmentCategory,
              type: "now",
            });
            playSound();
          }

          if (diff === 5 && !stateRef.current.sent.has(key5)) {
            stateRef.current.sent.add(key5);
            addNotification({
              medicationId: dose.medicationId,
              medicationName: dose.medicationName,
              doseAmount: dose.doseAmount,
              doseUnit: dose.doseUnit,
              scheduledTime: dose.scheduledTime,
              treatmentCategory: dose.treatmentCategory,
              type: "reminder",
            });
            playSound();
          }
        }
      } catch (err) {
        console.error("Notification scheduler error:", err);
      }
    };

    check();
    const interval = setInterval(check, 10000);
    return () => clearInterval(interval);
  }, [addNotification]);
}