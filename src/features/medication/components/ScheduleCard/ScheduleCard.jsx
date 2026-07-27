import FormCard from '../../../../shared/components/molecules/FormCard/FormCard';
import Input from '../../../../shared/components/atoms/Input/Input';
import Select from '../../../../shared/components/atoms/Select/Select';
import { FREQUENCY_UNITS } from '../../medication.types';
import styles from './ScheduleCard.module.scss';

function ScheduleCard({ time, frequencyInterval, frequencyUnit, startDate, onChange }) {
  return (
    <FormCard title="¿Cuándo lo tomas?">
      <Input
        id="time"
        label="Hora"
        type="time"
        value={time}
        onChange={(event) => onChange('time', event.target.value)}
      />

      <div className={styles.row}>
        <Input
          id="frequencyInterval"
          label="Cada cuánto"
          type="number"
          placeholder="24"
          value={frequencyInterval}
          onChange={(event) => onChange('frequencyInterval', event.target.value)}
        />

        <Select
          id="frequencyUnit"
          label="Frecuencia"
          placeholder="Días"
          options={FREQUENCY_UNITS}
          value={frequencyUnit}
          onChange={(event) => onChange('frequencyUnit', event.target.value)}
        />
      </div>

      <Input
        id="startDate"
        label="Fecha de inicio"
        type="date"
        value={startDate}
        onChange={(event) => onChange('startDate', event.target.value)}
      />
    </FormCard>
  );
}

export default ScheduleCard;