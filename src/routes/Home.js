import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';

const Home = () => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);

  const getNweets = async () => {
    const dbNweets = await dbService.collection('nweets').get();
    dbNweets.forEach((document) => {
      const nweetsObj = {
        ...document.data(),
        id: document.id,
      };
      setNweets((prev) => [nweetsObj, ...prev]);
    });
  };

  useEffect(() => {
    getNweets();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection('nweets').add({
      nweet,
      createAt: Date.now(),
    });
    setNweet('');
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
          value={nweet}
        />
        <input type="submit" value="Nweet" />
      </form>
      {nweets.map((data) => (
        <div key={data.id}>
          <h4>{data.nweet}</h4>
        </div>
      ))}
    </div>
  );
};

export default Home;
