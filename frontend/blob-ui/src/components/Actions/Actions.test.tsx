import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Actions from './Actions';

describe('<Actions />', () => {
  test('it should mount', () => {
    render(<Actions />);
    
    const actions = screen.getByTestId('Actions');

    expect(actions).toBeInTheDocument();
  });
});