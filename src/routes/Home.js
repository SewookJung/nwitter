import React, { useState } from 'react';

const Home = () => {
  const [nweet, setNweet] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="what is on your mind?"
          maxLength={120}
          onChange={onChange}
        />
        <input type="submit" value="Nweet" />
      </form>
    </div>
  );
};
export default Home;
