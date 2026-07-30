import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EditMedicationModal from '../../features/medication/components/EditMedicationModal/EditMedicationModal';
import { medicationApi } from '../../features/medication/services/medicationApi';

vi.mock('../../features/medication/services/medicationApi');

describe('EditMedicationModal', () => {
  const mockDose = { medicationId: '1', medicationName: 'Metotrexato' };

  it('renderiza null (loading) mientras carga el medicamento', () => {
    medicationApi.getAll.mockReturnValue(new Promise(() => {}));
    const { container } = render(
      <EditMedicationModal dose={mockDose} onClose={() => {}} onConfirm={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('valida campos requeridos y muestra errores', async () => {
    medicationApi.getAll.mockResolvedValue({
      data: [{
        id: '1',
        doseAmount: '',
        doseUnit: '',
        time: '',
        quantity: 1,
        frequencyInterval: '',
        frequencyUnit: '',
        reminderEnabled: false,
        startDate: '',
        endDate: '',
      }],
    });

    render(
      <EditMedicationModal dose={mockDose} onClose={() => {}} onConfirm={() => {}} />
    );

    const guardarBtn = await screen.findByText('Guardar cambios');
    await userEvent.click(guardarBtn);

    await waitFor(() => {
      expect(screen.getAllByText('Requerido').length).toBeGreaterThanOrEqual(3);
    });
  });

  it('valida que doseUnit sea requerido si doseAmount tiene valor', async () => {
    medicationApi.getAll.mockResolvedValue({
      data: [{
        id: '1',
        doseAmount: '20',
        doseUnit: '',
        time: '10:00',
        quantity: 1,
        frequencyInterval: '24',
        frequencyUnit: 'HOURS',
        reminderEnabled: false,
        startDate: '2026-07-30',
        endDate: '',
      }],
    });

    render(
      <EditMedicationModal dose={mockDose} onClose={() => {}} onConfirm={() => {}} />
    );

    const guardarBtn = await screen.findByText('Guardar cambios');
    await userEvent.click(guardarBtn);

    await waitFor(() => {
      expect(screen.getByText('Selecciona una unidad')).toBeInTheDocument();
    });
  });
});