import React from 'react';
import { render, screen } from '@testing-library/react';
import AuthPage from '../authPage';

describe('AuthPage Component', () => {
  it('renders the login form', () => {
    render(<AuthPage onAuth={jest.fn()} />);

    expect(screen.getByPlaceholderText(/login username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/login password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('renders the sign up form', () => {
    render(<AuthPage onAuth={jest.fn()} />);

    expect(
      screen.getByPlaceholderText(/sign up username/i),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/sign up password/i),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/first name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/last name/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /sign up/i }),
    ).toBeInTheDocument();
  });
});
