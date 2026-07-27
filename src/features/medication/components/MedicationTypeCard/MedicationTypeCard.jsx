import { useState, useEffect } from 'react';
import FormCard from '../../../../shared/components/molecules/FormCard/FormCard';
import Select from '../../../../shared/components/atoms/Select/Select';
import Autocomplete from '../../../../shared/components/molecules/Autocomplete/Autocomplete';
import { medicationApi } from '../../services/medicationApi';
import { TREATMENT_CATEGORIES } from '../../medication.types';

function MedicationTypeCard({ treatmentCategory, medicationName, onChange }) {
  const [catalogOptions, setCatalogOptions] = useState([]);

  useEffect(() => {
    medicationApi.getCatalog(treatmentCategory)
  .then((response) => setCatalogOptions(response.data))
  .catch(() => setCatalogOptions([]));
  }, [treatmentCategory]);

  return (
    <FormCard title="¿Qué medicamento es?">
      <Select
        id="treatmentCategory"
        label="Tipo de tratamiento"
        placeholder="Selecciona una opción"
        options={TREATMENT_CATEGORIES}
        value={treatmentCategory}
        onChange={(event) => onChange('treatmentCategory', event.target.value)}
      />

      <Autocomplete
        id="medicationName"
        label="Medicamento"
        placeholder="Ej. Tamoxifeno"
        options={catalogOptions}
        value={medicationName}
        onChange={(value) => onChange('medicationName', value)}
      />
    </FormCard>
  );
}

export default MedicationTypeCard;