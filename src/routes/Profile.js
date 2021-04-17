import { authService } from 'fbase';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({ refreshUser, userObj }) => {
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const history = useHistory();
  const onLogoutClick = () => {
    authService.signOut();
    history.push('/');
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
      refreshUser();
    }
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display Name!"
          onChange={onChange}
          value={newDisplayName}
        />
        <input type="submit" placeholder="Update Profile!" />
        <button type="button" onClick={onLogoutClick}>
          Logout
        </button>
      </form>
    </>
  );
};

export default Profile;
