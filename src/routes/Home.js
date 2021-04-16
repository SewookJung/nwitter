import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';

const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  useEffect(() => {
    dbService.collection('nweets').onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  return (
    <div>
      <NweetFactory userObj={userObj} />
      {nweets.map((data) => (
        <Nweet
          key={data.id}
          nweetObj={data}
          isOwner={data.creatorId === userObj.uid}
        />
      ))}
    </div>
  );
};

export default Home;
