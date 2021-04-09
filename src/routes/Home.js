import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { dbService, storageService } from 'fbase';
import Nweet from 'components/Nweet';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachemnt] = useState('');

  useEffect(() => {
    dbService.collection('nweets').onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = '';
    if (attachment !== '') {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const respone = await attachmentRef.putString(attachment, 'data_url');
      attachmentUrl = await respone.ref.getDownloadURL();
    }
    const nweetObj = {
      text: nweet,
      createAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };

    await dbService.collection('nweets').add(nweetObj);
    setNweet('');
    setAttachemnt('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  const onClearAttachment = () => setAttachemnt(null);

  const onFileChane = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachemnt(result);
    };
    reader.readAsDataURL(theFile);
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
        <input type="file" accept="image/*" onChange={onFileChane} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="prolfe" />
            <button type="button" onClick={onClearAttachment}>
              Clear
            </button>
          </div>
        )}
      </form>
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
