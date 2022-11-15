import { render, screen } from '@testing-library/react';

import { setupWrapper } from '../../lib/testUtil';
import Home from '../../pages';

const refObj = setupWrapper();

describe('Equipment List', () => {
  it('renders', async () => {
    render(<Home />, { wrapper: refObj.Wrapper });

    expect(screen.getByText('Home')).toBeInTheDocument();
  });
});
