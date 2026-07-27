import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

  useEffect(() => {
    async function fetchToday() {
      try {
        const { data } = await medicationApi.getToday();
        setDoses(data);
      } catch (err) {
        console.error("Error fetching today doses:", err);
      }
    }
    fetchToday();
  }, []);

  useEffect(() => {
    async function fetchNextDose() {
      try {
        const { data } = await calendarApi.getNextDose();
        setNextDose(data);
      } catch (err) {
        console.error("Error fetching next dose:", err);
      }
    }
    fetchNextDose();
  }, []);

  const handleConfirm = async (takenAt) => {
    try {
      await medicationApi.registerDose(selectedDose.medicationId, {
        takenAt,
      });
      setSelectedDose(null);
      const { data } = await medicationApi.getToday();
      setDoses(data);
      const { data: next } = await calendarApi.getNextDose();
      setNextDose(next);
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
      <NextDoseCard dose={nextDose} />
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
