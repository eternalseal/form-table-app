import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { setupWrapper } from '../../lib/testUtil';

import EquipmentForm from './EquipmentForm';

const refObj = setupWrapper();

describe('EquipmentForm', () => {
  it('Renders', async () => {
    const state = [
      {
        equipmentType: 'ahu',
        equipmentName: 'Value1',
        sensorType: 'pressure',
        sensorName: 'Value2',
        sensorSetPoint: 3,
      },
    ];
    const dispatch = jest.fn();
    render(<EquipmentForm items={state} dispatch={dispatch} />, {
      wrapper: refObj.Wrapper,
    });

    // Equipment type
    const equipmentTypeInput = screen.getByLabelText(/equipment type/i);
    expect(equipmentTypeInput).toBeInTheDocument();

    // Equipment Name
    const equipmentNameInput = screen.getByLabelText(/equipment Name/i);
    expect(equipmentNameInput).toBeInTheDocument();

    // Equipment type
    const sensorTypeInput = screen.getByLabelText(/sensor type/i);
    expect(sensorTypeInput).toBeInTheDocument();

    // Equipment type
    const sensorNameInput = screen.getByLabelText(/sensor Name/i);
    expect(sensorNameInput).toBeInTheDocument();

    // Sensor SetPoint
    const sensorSetPoint = screen.getByLabelText(/equipment type/i);
    expect(sensorSetPoint).toBeInTheDocument();

    const submitButton = screen.getByRole('button', {
      name: /Submit/i,
    });
    expect(submitButton).toBeInTheDocument();
  });
  it('Shows equipment type error', async () => {
    const state = [
      {
        equipmentType: 'ahu',
        equipmentName: 'Value1',
        sensorType: 'pressure',
        sensorName: 'Value2',
        sensorSetPoint: 3,
      },
    ];
    const dispatch = jest.fn();
    render(<EquipmentForm items={state} dispatch={dispatch} />, {
      wrapper: refObj.Wrapper,
    });

    // Equipment type
    const equipmentTypeInput = screen.getByLabelText(/equipment type/i);
    expect(equipmentTypeInput).toBeInTheDocument();
    const submitButton = screen.getByRole('button', {
      name: /Submit/i,
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });
    expect(equipmentTypeInput).toHaveAccessibleDescription(
      'Please select an option',
    );
  });
  it('Shows equipment name error', async () => {
    const state = [
      {
        equipmentType: 'ahu',
        equipmentName: 'Value1',
        sensorType: 'pressure',
        sensorName: 'Value2',
        sensorSetPoint: 3,
      },
    ];
    const dispatch = jest.fn();
    render(<EquipmentForm items={state} dispatch={dispatch} />, {
      wrapper: refObj.Wrapper,
    });

    // Equipment Name
    const equipmentNameInput = screen.getByLabelText(/equipment Name/i);

    const submitButton = screen.getByRole('button', {
      name: /Submit/i,
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });
    expect(equipmentNameInput).toHaveAccessibleDescription(
      'Must be alphanumeric string',
    );
  });
  it('Shows sensor type error', async () => {
    const state = [
      {
        equipmentType: 'ahu',
        equipmentName: 'Value1',
        sensorType: 'pressure',
        sensorName: 'Value2',
        sensorSetPoint: 3,
      },
    ];
    const dispatch = jest.fn();
    render(<EquipmentForm items={state} dispatch={dispatch} />, {
      wrapper: refObj.Wrapper,
    });

    // Sensor type
    const sensorTypeInput = screen.getByLabelText(/sensor type/i);
    expect(sensorTypeInput).toBeInTheDocument();

    const submitButton = screen.getByRole('button', {
      name: /Submit/i,
    });

    await act(async () => {
      fireEvent.click(submitButton);
    });
    expect(sensorTypeInput).toHaveAccessibleDescription(
      'Please select an option',
    );
  });
  it('Shows sensor name error', async () => {
    const state = [
      {
        equipmentType: 'ahu',
        equipmentName: 'Value1',
        sensorType: 'pressure',
        sensorName: 'Value2',
        sensorSetPoint: 3,
      },
    ];
    const dispatch = jest.fn();
    render(<EquipmentForm items={state} dispatch={dispatch} />, {
      wrapper: refObj.Wrapper,
    });

    // Sensor Name
    const sensorNameInput = screen.getByLabelText(/sensor Name/i);
    expect(sensorNameInput).toBeInTheDocument();

    const submitButton = screen.getByRole('button', {
      name: /Submit/i,
    });
    await act(async () => {
      fireEvent.click(submitButton);
    });
    expect(sensorNameInput).toHaveAccessibleDescription(
      'Must be alphanumeric string',
    );
  });
  it('does not submit with duplicate data', async () => {
    const state = [
      {
        equipmentType: 'ahu',
        equipmentName: 'Value1',
        sensorType: 'pressure',
        sensorName: 'Value2',
        sensorSetPoint: 3,
      },
    ];
    const dispatch = jest.fn();
    render(<EquipmentForm items={state} dispatch={dispatch} />, {
      wrapper: refObj.Wrapper,
    });

    // Equipment type
    const equipmentTypeLabel = /Equipment Type/i;
    const selectEquipmentType = await screen.findByLabelText(
      equipmentTypeLabel,
    );
    expect(selectEquipmentType).toBeInTheDocument();
    // Equipment Name
    const equipmentNameInput = screen.getByLabelText(/equipment Name/i);
    // Sensor type
    const sensorTypeLabel = /sensor type/i;
    const selectSensorType = await screen.findByLabelText(sensorTypeLabel);
    expect(selectSensorType).toBeInTheDocument();
    // Sensor type
    const sensorNameInput = screen.getByLabelText(/sensor Name/i);
    // Sensor SetPoint
    const sensorSetPoint = screen.getByLabelText(/equipment type/i);
    const submitButton = screen.getByRole('button', {
      name: /Submit/i,
    });

    await userEvent.click(selectEquipmentType);

    const equipmentOptions = await screen.findByRole('listbox', {
      name: equipmentTypeLabel,
    });

    await userEvent.click(selectSensorType);

    const sensorTypeOptions = await screen.findByRole('listbox', {
      name: sensorTypeLabel,
    });

    await userEvent.click(within(equipmentOptions).getByText(/ahu/i));
    await userEvent.click(within(sensorTypeOptions).getByText(/pressure/i));
    await userEvent.type(equipmentNameInput, state[0].equipmentName);
    await userEvent.type(sensorNameInput, state[0].sensorName);
    await userEvent.type(sensorSetPoint, state[0].sensorSetPoint.toString());

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(dispatch).not.toHaveBeenCalled();
    expect(screen.getByTestId('toast')).toBeInTheDocument();
  });
  it('Submits with unique data', async () => {
    const state = [
      {
        equipmentType: 'ahu',
        equipmentName: 'Value1',
        sensorType: 'pressure',
        sensorName: 'Value2',
        sensorSetPoint: 3,
      },
    ];
    const dispatch = jest.fn();
    render(<EquipmentForm items={state} dispatch={dispatch} />, {
      wrapper: refObj.Wrapper,
    });

    // Equipment type
    const equipmentTypeLabel = /Equipment Type/i;
    const selectEquipmentType = await screen.findByLabelText(
      equipmentTypeLabel,
    );

    // Equipment Name
    const equipmentNameInput = screen.getByLabelText(/equipment Name/i);
    // Sensor type
    const sensorTypeLabel = /sensor type/i;
    const selectSensorType = await screen.findByLabelText(sensorTypeLabel);

    // Sensor type
    const sensorNameInput = screen.getByLabelText(/sensor Name/i);
    // Sensor SetPoint
    const sensorSetPoint = screen.getByLabelText(/equipment type/i);
    const submitButton = screen.getByRole('button', {
      name: /Submit/i,
    });

    await userEvent.click(selectEquipmentType);

    const equipmentOptions = await screen.findByRole('listbox', {
      name: equipmentTypeLabel,
    });

    await userEvent.click(selectSensorType);

    const sensorTypeOptions = await screen.findByRole('listbox', {
      name: sensorTypeLabel,
    });

    await userEvent.click(within(equipmentOptions).getByText(/rtu/i));
    await userEvent.click(within(sensorTypeOptions).getByText(/pressure/i));

    await userEvent.type(equipmentNameInput, 'testname1');
    await userEvent.type(sensorNameInput, 'testName2');
    await userEvent.type(sensorSetPoint, 'testName3');

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(dispatch).toHaveBeenCalledWith({
      payload: {
        equipmentName: 'testname1',
        equipmentType: 'rtu',
        sensorName: 'testName2',
        sensorSetPoint: 0,
        sensorType: 'pressure',
      },
      type: 'add',
    });
  });
});
