import React, { useState } from 'react';
import AppRouter from 'components/Router';
import authService from 'fbase';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>
        &copy; Niwtter
        {new Date().getFullYear()}
      </footer>
    </>
  );
};

export default App;
