import { render, screen } from '@testing-library/react';

import { setupWrapper } from '../../lib/testUtil';

import EquipmentList from './EquipmentList';

const refObj = setupWrapper();

describe('Equipment List', () => {
  it('renders', async () => {
    const state = [
      {
        equipmentType: 'ahu',
        equipmentName: 'Value1',
        sensorType: 'pressure',
        sensorName: 'Value2',
        sensorSetPoint: 3,
      },
    ];

    render(<EquipmentList items={state} />, { wrapper: refObj.Wrapper });
    expect(screen.getByTestId('equipment-row-0')).toHaveTextContent(
      state[0].equipmentName,
    );
  });
});
