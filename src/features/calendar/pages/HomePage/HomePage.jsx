import { useState, useEffect } from "react";
import CalendarView from "../../components/CalendarView/CalendarView";
import TodayDoses from "../../components/TodayDoses/TodayDoses";
import TakeDoseModal from "../../components/TakeDoseModal/TakeDoseModal";
import { medicationApi } from "../../../medication/services/medicationApi";
import styles from "./HomePage.module.scss";

function HomePage() {
  const [doses, setDoses] = useState([]);
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

  const handleConfirm = async () => {
    try {
      await medicationApi.registerDose(selectedDose.medicationId, {
        takenAt: new Date().toISOString(),
      });
      setSelectedDose(null);
      const { data } = await medicationApi.getToday();
      setDoses(data);
    } catch (err) {
      console.error("Error registering dose:", err);
    }
  };

  return (
    <div className={styles.home}>
      <h1 className="home_title">Calendario</h1>
      <CalendarView onDayClick={(date) => console.log("Day clicked:", date)} />
      <TodayDoses doses={doses} onDoseClick={(dose) => setSelectedDose(dose)} />

      {selectedDose && (
        <TakeDoseModal
          dose={selectedDose}
          onClose={() => setSelectedDose(null)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}

export default HomePage;