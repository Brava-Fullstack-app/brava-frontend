import Toggle from '../../../../shared/components/atoms/Toggle/Toggle';
import styles from './ReminderCard.module.scss';

function ReminderCard({ reminderEnabled, onChange }) {
  return (
    <section className={styles.card}>
      <Toggle
        id="reminderEnabled"
        label="Recordatorio"
        description="Activar dentro de la app"
        checked={reminderEnabled}
        onChange={(value) => onChange('reminderEnabled', value)}
      />
    </section>
  );
}

export default ReminderCard;