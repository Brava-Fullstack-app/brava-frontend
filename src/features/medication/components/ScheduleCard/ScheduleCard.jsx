import FormCard from "../../../../shared/components/molecules/FormCard/FormCard";
import Input from "../../../../shared/components/atoms/Input/Input";
import Select from "../../../../shared/components/atoms/Select/Select";
import { FREQUENCY_UNITS } from "../../medication.types";
import styles from "./ScheduleCard.module.scss";

function ScheduleCard({
  time,
  frequencyInterval,
  frequencyUnit,
  startDate,
  endDate,
  onChange
}) {
  return (
    <FormCard title="¿Cuándo lo tomas?">
      <Input
        id="time"
        label="Hora"
        type="time"
        value={time}
        onChange={(event) => onChange("time", event.target.value)}
        required
      />

      <div className={styles.row}>
        <Input
          id="frequencyInterval"
          label="Cada cuánto"
          type="number"
          placeholder="24"
          value={frequencyInterval}
          onChange={(event) =>
            onChange("frequencyInterval", event.target.value)
          }
          required
        />

        <Select
          id="frequencyUnit"
          label="Frecuencia"
          placeholder="Días"
          options={FREQUENCY_UNITS}
          value={frequencyUnit}
          onChange={(event) => onChange("frequencyUnit", event.target.value)}
          required
        />
      </div>

      <Input
        id="startDate"
        label="Fecha de inicio"
        type="date"
        value={startDate}
        onChange={(event) => onChange("startDate", event.target.value)}
      />

      <Input
        id="endDate"
        label="Fecha de fin (opcional)"
        type="date"
        value={endDate}
        onChange={(event) => onChange("endDate", event.target.value)}
      />
    </FormCard>
  );
}

export default ScheduleCard;
