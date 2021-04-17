import AuthForm from 'components/AuthForm';
import { authService, firebaseInstance } from 'fbase';
import React from 'react';
import { CgGoogle } from 'react-icons/cg';
import { FaGithub } from 'react-icons/fa';

import styled from 'styled-components';

const Container = styled.div`
  grid-column: 1/3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  border: none;
  padding: 20px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
  margin: 10px;

  color: white;
  background: ${(props) =>
    props.name === 'google'
      ? 'linear-gradient(-120deg, #4285f4, #34a853, #fbbc05, #ea4335)'
      : '#333'};
  > svg {
    margin-right: 7px;
    line-height: 0.1;
  }
`;

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;

    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };

  return (
    <Container>
      <AuthForm />
      <SocialContainer>
        <Button type="button" name="google" onClick={onSocialClick}>
          <CgGoogle />
          Continue with Google
        </Button>
        <Button type="button" name="github" onClick={onSocialClick}>
          <FaGithub />
          Continue with Github
        </Button>
      </SocialContainer>
    </Container>
  );
};

export default Auth;
