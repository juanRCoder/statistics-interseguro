// // Agrupacion de tests
// describe('Navbar', () => {
//   // Test Unitario
//   test('Add two numbers', () => {
//     expect(1 + 1).toBe(2);
//   });
// });

import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar Component', () => {
  beforeEach(() => {
    render(<Navbar />);
  });

  test('renders the title', () => {
    expect(screen.getByText('Vite React App')).toBeDefined();
  });

  test('should show the content when the button is clicked', () => {
    const button = screen.getByText(/Empezar/i);
    fireEvent.click(button);
    expect(screen.getByText(/Detener/i)).toBeDefined();
    fireEvent.click(button);
    expect(screen.getByText(/Empezar/i)).toBeDefined();
  });
});
