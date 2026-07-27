import { useNavigate } from 'react-router-dom';
import Button from '../../../../shared/components/atoms/Button/Button';
import MedicationTypeCard from '../../components/MedicationTypeCard/MedicationTypeCard';
import DosageCard from '../../components/DosageCard/DosageCard';
import ScheduleCard from '../../components/ScheduleCard/ScheduleCard';
import ReminderCard from '../../components/ReminderCard/ReminderCard';
import { useAddMedicationForm } from '../../hooks/useAddMedicationForm';
import styles from './RegisterMedication.module.scss';

function RegisterMedication() {
  const navigate = useNavigate();
  const { formData, updateField, submit, isLoading, error } = useAddMedicationForm();

  async function handleSubmit(event) {
    event.preventDefault();
    const success = await submit();
    if (success) navigate('/calendar');
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <i className="bi bi-arrow-left"></i>
        </button>
        <h1 className={styles.title}>Registrar medicamento</h1>
      </header>

      <form className={styles.content} onSubmit={handleSubmit}>
        <MedicationTypeCard
          treatmentCategory={formData.treatmentCategory}
          medicationName={formData.medicationName}
          onChange={updateField}
        />

        <DosageCard
          quantity={formData.quantity}
          doseAmount={formData.doseAmount}
          doseUnit={formData.doseUnit}
          onChange={updateField}
        />

        <ScheduleCard
          time={formData.time}
          frequencyInterval={formData.frequencyInterval}
          frequencyUnit={formData.frequencyUnit}
          startDate={formData.startDate}
          onChange={updateField}
        />

        <ReminderCard reminderEnabled={formData.reminderEnabled} onChange={updateField} />

        {error && <p className={styles.errorText}>{error}</p>}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Guardando...' : 'Guardar medicamento'}
        </Button>
      </form>
    </div>
  );
}

export default RegisterMedication;