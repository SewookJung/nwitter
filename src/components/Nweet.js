import { dbService, storageService } from 'fbase';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Submit, Cancel, Delete, Edit } from 'components/styles/Submit';
import TwitterInput from 'components/styles/Inputs';
import Colors from 'components/styles/Colors';
import { FiEdit3 } from 'react-icons/fi';
import { RiDeleteBin2Line } from 'react-icons/ri';

const Nweets = styled.div``;

const EditForm = styled.form`
  border: ${Colors.Border};
  width: 50%;
  padding: 20px 10px;
  border-radius: 10px;
  margin: 20px 10px;
`;

const EditFormBtns = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const NweetList = styled.div`
  border: ${Colors.Border};
  width: 50%;
  padding: 15px 10px;
  border-radius: 10px;
  margin: 20px 10px;
  display: inline-flex;
  > div:first-child {
    width: 100px;
    height: 100px;
    margin-right: 20px;
  }
  > div:last-child {
    width: 100%;
    height: 100%;
  }
  > div:last-child > div {
    display: flex;
    justify-content: flex-end;
  }

  > div:last-child > div > button:last-child {
    margin-left: 10px;
  }
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
`;

const NweetMsg = styled.span`
  font-weight: 700;
  font-size: 18px;
  display: block;
  margin-bottom: 20px;
  margin-top: 5px;
`;

const Nweet = ({ nweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newNweet, setNewNweet] = useState(nweetObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this nweet?');
    if (ok) {
      await dbService.doc(`nweets/${nweetObj.id}`).delete();
      await storageService.refFromURL(nweetObj.attachmentUrl).delete();
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`nweets/${nweetObj.id}`).update({
      text: newNweet,
    });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewNweet(value);
  };

  return (
    <Nweets>
      {editing ? (
        <div>
          <EditForm onSubmit={onSubmit}>
            <TwitterInput
              type="text"
              placeholder="Edit your nweet"
              value={newNweet}
              onChange={onChange}
              required
            />
            <EditFormBtns>
              <Cancel type="button" onClick={toggleEditing}>
                Cancel
              </Cancel>
              <Submit type="submit" value="Update Nweet!" />
            </EditFormBtns>
          </EditForm>
        </div>
      ) : (
        <NweetList>
          <div>
            {nweetObj.attachmentUrl && (
              <Photo src={nweetObj.attachmentUrl} alt="Profile" />
            )}
          </div>
          <div>
            <NweetMsg>{nweetObj.text}</NweetMsg>
            {isOwner && (
              <div>
                <Delete type="button" onClick={onDeleteClick}>
                  <RiDeleteBin2Line size={20} />
                </Delete>
                <Edit type="button" onClick={toggleEditing}>
                  <FiEdit3 size={20} />
                </Edit>
              </div>
            )}
          </div>
        </NweetList>
      )}
    </Nweets>
  );
};

export default Nweet;
