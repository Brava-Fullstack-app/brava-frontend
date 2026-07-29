import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import TodayDoses from "../../components/TodayDoses/TodayDoses";
import TakeDoseModal from "../../components/TakeDoseModal/TakeDoseModal";
import EditMedicationModal from "../../../medication/components/EditMedicationModal/EditMedicationModal";
import Modal from "../../../../shared/components/organisms/Modal/Modal";
import Button from "../../../../shared/components/atoms/Button/Button";
import { medicationApi } from "../../../medication/services/medicationApi";
import styles from "./DayDetailPage.module.scss";

function DayDetailPage() {
  const { date } = useParams();
  const navigate = useNavigate();
  const [doses, setDoses] = useState([]);
  const [selectedDose, setSelectedDose] = useState(null);
  const [editingDose, setEditingDose] = useState(null);
  const [deletingDose, setDeletingDose] = useState(null);

  const parsedDate = parseISO(date);

  useEffect(() => {
    async function fetchDoses() {
      try {
        const { data } = await medicationApi.getByDate(date);
        setDoses(data);
      } catch (err) {
        console.error("Error fetching doses:", err);
      }
    }
    fetchDoses();
  }, [date]);

  const handleConfirmDose = async (takenAt) => {
    try {
      await medicationApi.registerDose(selectedDose.medicationId, {
        takenAt,
      });
      setSelectedDose(null);
      const { data } = await medicationApi.getByDate(date);
      setDoses(data);
    } catch (err) {
      console.error("Error registering dose:", err);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await medicationApi.remove(deletingDose.medicationId);
      setDeletingDose(null);
      const { data } = await medicationApi.getByDate(date);
      setDoses(data);
    } catch (err) {
      console.error("Error deleting medication:", err);
    }
  };

  const handleConfirmEdit = async (updatedData) => {
    try {
      await medicationApi.update(editingDose.medicationId, updatedData);
      setEditingDose(null);
      const { data } = await medicationApi.getByDate(date);
      setDoses(data);
    } catch (err) {
      console.error("Error updating medication:", err);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate("/calendar")}
        >
          <i className="bi bi-arrow-left"></i>
        </button>
        <h1 className={styles.title}>
          {format(parsedDate, "'Hoy,' d 'de' MMMM", { locale: es })}
        </h1>
      </header>

      <div className={styles.content}>
        <TodayDoses
          doses={doses}
          title="Medicamentos para hoy"
          showActions
          onDoseClick={(dose) => setSelectedDose(dose)}
          onEdit={(dose) => setEditingDose(dose)}
          onDelete={(dose) => setDeletingDose(dose)}
        />

        {selectedDose && (
          <TakeDoseModal
            dose={selectedDose}
            date={date}
            onClose={() => setSelectedDose(null)}
            onConfirm={handleConfirmDose}
          />
        )}

        {editingDose && (
          <EditMedicationModal
            dose={editingDose}
            onClose={() => setEditingDose(null)}
            onConfirm={handleConfirmEdit}
          />
        )}

        {deletingDose && (
          <Modal onClose={() => setDeletingDose(null)}>
            <div className={styles.deleteModal}>
              <i className="bi bi-exclamation-triangle"></i>
              <h2 className={styles.deleteTitle}>Borrar medicamento</h2>
              <p className={styles.deleteText}>
                Se eliminará <strong>{deletingDose.medicationName}</strong> y
                todos sus registros de toma. Esta acción no se puede deshacer.
              </p>
              <div className={styles.deleteActions}>
                <Button
                  variant="primary"
                  fullWidth
                  onClick={handleConfirmDelete}
                >
                  Sí, borrar
                </Button>
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => setDeletingDose(null)}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default DayDetailPage;
