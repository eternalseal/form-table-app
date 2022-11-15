import {
  act,
  fireEvent,
  getByTestId,
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { setupWrapper } from '../../lib/testUtil';
import Home from '../../pages';

const refObj = setupWrapper();

describe('Equipment List', () => {
  it('renders', async () => {
    render(<Home />, { wrapper: refObj.Wrapper });

    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
