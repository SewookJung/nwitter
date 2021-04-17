import { authService } from 'fbase';
import React, { useState } from 'react';
import { FaTwitter, FaUserAlt, FaLock } from 'react-icons/fa';
import styled from 'styled-components';
import Colors from './styles/Colors';

const Icon = styled(FaTwitter)`
  color: ${Colors.Twitter};
  font-size: 50px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 0;
  border: 0;
  width: 300px;
  height: 50px;
  outline: none;
  font-size: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputContainer = styled.div`
  padding: 10px 10px;
  display: flex;
  align-items: center;
  border-bottom: ${Colors.Border};
  > svg {
    font-size: 20px;
    margin-right: 10px;
    color: #636e72;
  }
  margin-bottom: 20px;
`;

const SubmitInput = styled.input`
  padding: 10px 20px;
  background: #2193b0; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #6dd5ed,
    #2193b0
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #6dd5ed,
    #2193b0
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  font-size: 18px;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const Span = styled.span`
  font-weight: 700;
  cursor: pointer;
  margin-bottom: 20px;
`;

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
      <Form onSubmit={onSubmit}>
        <Icon />
        <InputContainer>
          <FaUserAlt />
          <Input
            name="email"
            type="email"
            placeholder="email"
            required
            value={email}
            onChange={onChange}
          />
        </InputContainer>
        <InputContainer>
          <FaLock />
          <Input
            name="password"
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={onChange}
          />
        </InputContainer>
        <SubmitInput
          type="submit"
          value={newAccount ? 'Create a new account!' : 'Login'}
        />
        {error}
        <Span
          onClick={toggleAccount}
          role="button"
          tabIndex={0}
          aria-hidden="true"
        >
          Click to
          {newAccount ? ' Log in' : ' Create Account'}
        </Span>
      </Form>
    </>
  );
};

export default AuthForm;
