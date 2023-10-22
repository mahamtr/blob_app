import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Upload from './Upload';

describe('<Upload />', () => {
  test('it should mount', () => {
    render(<Upload />);
    
    const upload = screen.getByTestId('Upload');

    expect(upload).toBeInTheDocument();
  });
});