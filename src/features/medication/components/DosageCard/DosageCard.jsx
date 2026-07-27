import FormCard from '../../../../shared/components/molecules/FormCard/FormCard';
import Stepper from '../../../../shared/components/atoms/Stepper/Stepper';
import Input from '../../../../shared/components/atoms/Input/Input';
import Select from '../../../../shared/components/atoms/Select/Select';
import { DOSE_UNITS } from '../../medication.types';
import styles from './DosageCard.module.scss';

function DosageCard({ quantity, doseAmount, doseUnit, onChange }) {
  return (
    <FormCard title="¿Cuánto tomas?">
      <Stepper
        id="quantity"
        label="Cantidad"
        value={quantity}
        onChange={(value) => onChange('quantity', value)}
      />

      <div className={styles.row}>
        <Input
          id="doseAmount"
          label="Dosis"
          type="number"
          placeholder="Ej. 20"
          value={doseAmount}
          onChange={(event) => onChange('doseAmount', event.target.value)}
        />

        <Select
          id="doseUnit"
          label="Unidad"
          placeholder="mg"
          options={DOSE_UNITS}
          value={doseUnit}
          onChange={(event) => onChange('doseUnit', event.target.value)}
        />
      </div>
    </FormCard>
  );
}

export default DosageCard;