import { useState, useEffect, useCallback } from "react";
import { useNavigate} from "react-router-dom";
import CalendarView from "../../components/CalendarView/CalendarView";
import TodayDoses from "../../components/TodayDoses/TodayDoses";
import NextDoseCard from "../../components/NextDoseCard/NextDoseCard";
import TakeDoseModal from "../../components/TakeDoseModal/TakeDoseModal";
import { medicationApi } from "../../../medication/services/medicationApi";
import { calendarApi } from "../../services/calendarApi";
import styles from "./HomePage.module.scss";
import Button from "../../../../shared/components/atoms/Button/Button";
import { format } from "date-fns";

function HomePage() {
  const navigate = useNavigate();
  const [doses, setDoses] = useState([]);
  const [nextDose, setNextDose] = useState(null);
  const [selectedDose, setSelectedDose] = useState(null);

  const refreshAll = useCallback(async () => {
    try {
      const { data } = await medicationApi.getToday();
      setDoses(data);
      const { data: next } = await calendarApi.getNextDose();
      setNextDose(next);
    } catch (err) {
      console.error("Error refreshing:", err);
    }
  }, []);

useEffect(() => {
  let mounted = true;
  (async () => {
    try {
      const { data } = await medicationApi.getToday();
      if (mounted) setDoses(data);
      const { data: next } = await calendarApi.getNextDose();
      if (mounted) setNextDose(next);
    } catch (err) {
      console.error("Error loading:", err);
    }
  })();
  return () => { mounted = false; };
}, []);

useEffect(() => {
  const handler = () => refreshAll();
  window.addEventListener("dose-registered", handler);
  return () => window.removeEventListener("dose-registered", handler);
}, [refreshAll]);

  const handleConfirm = async (takenAt) => {
    try {
      await medicationApi.registerDose(selectedDose.medicationId, { takenAt });
      setSelectedDose(null);
      await refreshAll();
    } catch (err) {
      console.error("Error registering dose:", err);
    }
  };

  return (
    <div className={styles.home}>
      <h1 className={styles.home__title}>Calendario</h1>
      <CalendarView
        onDayClick={(date) => {
          const dateStr = format(date, "yyyy-MM-dd");
          navigate(`/calendar/${dateStr}`);
        }}
      />
      <p className={styles.subtitle_home_page}>PRÓXIMA TOMA</p>
      <NextDoseCard
        dose={nextDose}
        onClick={() => {
          if (nextDose) {
            setSelectedDose(nextDose);
          }
        }}
      />
      <TodayDoses
        doses={doses}
        onDoseClick={(dose) =>
          setSelectedDose({
            ...dose,
            scheduledAt: `${format(new Date(), "yyyy-MM-dd")}T${(dose.scheduledTime || "00:00").slice(0, 5)}:00`,
          })
        }
      />
      {selectedDose && (
        <TakeDoseModal
          dose={selectedDose}
          date={selectedDose.scheduledAt?.slice(0, 10) || format(new Date(), "yyyy-MM-dd")}
          onClose={() => setSelectedDose(null)}
          onConfirm={handleConfirm}
        />
      )}

      <div className={styles.fabWrapper}>
        <Button
          variant="primary"
          icon="bi-plus-lg"
          onClick={() => navigate("/medications/register")}
        >
          Registrar medicamento
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
