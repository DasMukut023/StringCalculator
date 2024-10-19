
import { render, screen, fireEvent } from '@testing-library/react';
import StringCalculator from './Calculator';

describe('String Calculator', () => {
    test('returns 0 for an empty string', () => {
        render(<StringCalculator />);
        fireEvent.change(screen.getByPlaceholderText(/enter numbers/i), { target: { value: '' } });
        fireEvent.click(screen.getByText(/add/i));
        expect(screen.getByText(/result: 0/i)).toBeInTheDocument();
    });

    test('returns the number for a single number', () => {
        render(<StringCalculator />);
        fireEvent.change(screen.getByPlaceholderText(/enter numbers/i), { target: { value: '1' } });
        fireEvent.click(screen.getByText(/add/i));
        expect(screen.getByText(/result: 1/i)).toBeInTheDocument();
    });

    test('returns the sum of two numbers', () => {
        render(<StringCalculator />);
        fireEvent.change(screen.getByPlaceholderText(/enter numbers/i), { target: { value: '1,5' } });
        fireEvent.click(screen.getByText(/add/i));
        expect(screen.getByText(/result: 6/i)).toBeInTheDocument();
    });

    test('handles new lines between numbers', () => {
        render(<StringCalculator />);
        fireEvent.change(screen.getByPlaceholderText(/enter numbers/i), { target: { value: '1\n2,3' } });
        fireEvent.click(screen.getByText(/add/i));
        expect(screen.getByText(/result: 6/i)).toBeInTheDocument();
    });

    test('handles custom delimiters', () => {
        render(<StringCalculator />);
        fireEvent.change(screen.getByPlaceholderText(/enter numbers/i), { target: { value: '//;\n1;2' } });
        fireEvent.click(screen.getByText(/add/i));
        expect(screen.getByText(/result: 3/i)).toBeInTheDocument();
    });

    test('throws an error for negative numbers', () => {
        render(<StringCalculator />);
        fireEvent.change(screen.getByPlaceholderText(/enter numbers/i), { target: { value: '1,-2,3' } });
        fireEvent.click(screen.getByText(/add/i));
        expect(screen.getByText(/negative numbers not allowed: -2/i)).toBeInTheDocument();
    });

    test('throws an error for multiple negative numbers', () => {
        render(<StringCalculator />);
        fireEvent.change(screen.getByPlaceholderText(/enter numbers/i), { target: { value: '1,-2,-3' } });
        fireEvent.click(screen.getByText(/add/i));
        expect(screen.getByText(/negative numbers not allowed: -2, -3/i)).toBeInTheDocument();
    });
});
