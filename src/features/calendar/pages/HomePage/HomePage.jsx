import { useState, useEffect, useCallback } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
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
  const { registerRefresh } = useOutletContext();
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
    registerRefresh(refreshAll);
    return () => registerRefresh(null);
  }, [refreshAll, registerRefresh]);

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
            setSelectedDose({
              medicationId: nextDose.medicationId,
              medicationName: nextDose.medicationName,
              doseAmount: nextDose.doseAmount,
              doseUnit: nextDose.doseUnit,
              scheduledTime: nextDose.scheduledAt?.slice(11, 16),
            });
          }
        }}
      />
      <TodayDoses doses={doses} onDoseClick={(dose) => setSelectedDose(dose)} />
      {selectedDose && (
        <TakeDoseModal
          dose={selectedDose}
          date={format(new Date(), "yyyy-MM-dd")}
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