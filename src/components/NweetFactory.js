import React, { useState } from 'react';
import { dbService, storageService } from 'fbase';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import Colors from 'components/styles/Colors';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { BiHome } from 'react-icons/bi';

const Form = styled.form`
  width: 100%;
`;

const PageTitle = styled.h1`
  font-weight: 700;
  padding: 20px 10px;
  font-size: 18px;
  border-bottom: ${Colors.Border};
`;

const TwitterContents = styled.div`
  padding: 20px 10px;
  margin: 20px 10px;
  border: ${Colors.Border};
  display: inline-block;
  border-radius: 10px;
  width: 50%;
`;

const TwitterInput = styled.input`
  outline: none;
  border: none;
  width: 100%;
  margin-bottom: 10px;
  font-size: 20px;
`;

const TwitterUploadInput = styled.input`
  display: none;
`;

const Label = styled.label`
  font-size: 30px;
  > svg {
    cursor: pointer;
  }
  color: ${Colors.Twitter};
  display: inline-block;
  margin-top: auto;
  line-height: 0.1;
`;

const SubmitBtn = styled.input`
  margin-left: auto;
  border: 0;
  background-color: ${Colors.Twitter};
  color: white;
  font-weight: 700;
  padding: 10px 15px;
  border-radius: 20px;
`;

const TopContent = styled.div`
  width: 100%;
`;

const BottomContent = styled.div`
  width: 100%;
  display: flex;
`;

const AttachContent = styled.div`
  margin-left: 4px;
  margin-top: 10px;
  display: flex;
  align-items: flex-start;
  > img {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    margin-right: 5px;
  }
  > button {
    border: 0;
    padding: 0;
    background-color: inherit;
    cursor: pointer;
    line-height: 1.2;
  }
`;

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [attachment, setAttachemnt] = useState('');

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
    <Form onSubmit={onSubmit}>
      <PageTitle>
        <BiHome />
        Home
      </PageTitle>
      <TwitterContents>
        <TopContent>
          <TwitterInput
            type="text"
            placeholder="What's happening?"
            maxLength={120}
            onChange={onChange}
            value={nweet}
          />
        </TopContent>
        <BottomContent>
          <Label htmlFor="image">
            <HiOutlinePhotograph />
          </Label>
          <TwitterUploadInput
            type="file"
            accept="image/*"
            onChange={onFileChane}
            id="image"
          />
          <SubmitBtn type="submit" value="Nweet" />
        </BottomContent>

        {attachment && (
          <AttachContent>
            <img src={attachment} alt="prolfe" />
            <button type="button" onClick={onClearAttachment}>
              ❌
            </button>
          </AttachContent>
        )}
      </TwitterContents>
    </Form>
  );
};

export default NweetFactory;
