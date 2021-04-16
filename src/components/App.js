import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from 'fbase';
import { FaTwitterSquare } from 'react-icons/fa';
import Colors from 'components/styles/Colors';
import styled from 'styled-components';

const Footer = styled.footer`
  text-align: center;
  padding: 20px 0px;
  border-top: ${Colors.Border};
  color: ${Colors.Twitter};
`;

const FooterTitle = styled.span`
  font-weight: 700;
  font-size: 20px;
`;

const FooterIcon = styled.div`
  margin-top: 10px;
  font-size: 20px;
`;

const App = () => {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        'Initializing...'
      )}
      <Footer>
        <FooterTitle>Nwitter</FooterTitle>
        <FooterIcon>
          <FaTwitterSquare />
        </FooterIcon>
      </Footer>
    </>
  );
};

export default App;
