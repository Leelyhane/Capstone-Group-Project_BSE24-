import React from 'react';

const AuthPage = ({ onAuth }) => {
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onAuth}>
        <input
          name="username"
          placeholder="Login Username" // Updated placeholder
          type="text"
          aria-label="username"
        />
        <input
          name="password"
          placeholder="Login Password" 
          type="password"
          aria-label="password"
        />
        <button type="submit">Log In</button>
      </form>

      <h2>Sign Up</h2>
      <form onSubmit={onAuth}>
        <input
          name="signupUsername"
          placeholder="Sign Up Username"
          type="text"
          aria-label="signup-username"
        />
        <input
          name="signupPassword"
          placeholder="Sign Up Password"
          type="password"
          aria-label="signup-password"
        />
        <input
          name="email"
          placeholder="Email"
          type="text"
          aria-label="email"
        />
        <input
          name="first_name"
          placeholder="First Name"
          type="text"
          aria-label="first-name"
        />
        <input
          name="last_name"
          placeholder="Last Name"
          type="text"
          aria-label="last-name"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default AuthPage;
