import React from 'react';

import FourOhFourPage from '~pages/404';

import { render } from '@testing-library/react';

describe('page four oh four', () => {
  const renderPage = () => {
    return render(<FourOhFourPage />);
  };

  it('should render without crashing', () => {
    expect(renderPage()).toBeTruthy();
  });
});
