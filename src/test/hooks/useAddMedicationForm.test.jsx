import { renderHook, act } from '@testing-library/react';
import { useAddMedicationForm } from '../../features/medication/hooks/useAddMedicationForm';
import { medicationApi } from '../../features/medication/services/medicationApi';

vi.mock('../../features/medication/services/medicationApi');

describe('useAddMedicationForm', () => {
  const today = new Date().toISOString().split('T')[0];

  it('inicializa con valores por defecto', () => {
    const { result } = renderHook(() => useAddMedicationForm());
    expect(result.current.formData.startDate).toBe(today);
    expect(result.current.formData.reminderEnabled).toBe(true);
    expect(result.current.formData.quantity).toBe(1);
    expect(result.current.formData.frequencyUnit).toBe('DAYS');
  });

  it('updateField actualiza un campo y respeta los demas', () => {
    const { result } = renderHook(() => useAddMedicationForm());

    act(() => result.current.updateField('medicationName', 'Metotrexato'));

    expect(result.current.formData.medicationName).toBe('Metotrexato');
    expect(result.current.formData.quantity).toBe(1);
  });

  it('submit formatea time, doseAmount y endDate correctamente', async () => {
    medicationApi.create.mockResolvedValue({});
    const { result } = renderHook(() => useAddMedicationForm());

    act(() => result.current.updateField('medicationName', 'Metotrexato'));
    act(() => result.current.updateField('time', '14:30'));
    act(() => result.current.updateField('frequencyInterval', '24'));

    await act(() => result.current.submit());

    expect(medicationApi.create).toHaveBeenCalledWith(
      expect.objectContaining({
        medicationName: 'Metotrexato',
        time: '14:30:00',
        doseAmount: null,
        endDate: null,
      })
    );
  });

  it('submit maneja error del API y lo expone', async () => {
    medicationApi.create.mockRejectedValue({
      response: { data: { message: 'Error de prueba' } },
    });
    const { result } = renderHook(() => useAddMedicationForm());

    act(() => result.current.updateField('medicationName', 'Metotrexato'));
    act(() => result.current.updateField('time', '10:00'));
    act(() => result.current.updateField('frequencyInterval', '24'));

    await act(() => result.current.submit());

    expect(result.current.error).toBe('Error de prueba');
    expect(result.current.isLoading).toBe(false);
  });
});