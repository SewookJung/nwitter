import { authService } from 'fbase';
import React, { useState } from 'react';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      if (newAccount) {
        const data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        const data = await authService.signInWithEmailAndPassword(
          email,
          password
        );
      }
    } catch (e) {
      setError(e.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={onChange}
        />
        <input
          type="submit"
          value={newAccount ? 'Create a new account!' : 'Login'}
        />
        {error}
      </form>
      <span
        onClick={toggleAccount}
        role="button"
        tabIndex={0}
        aria-hidden="true"
      >
        {newAccount ? 'Log in' : 'Create Account'}
      </span>
    </>
  );
};

export default AuthForm;
