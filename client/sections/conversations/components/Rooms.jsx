import React from 'react';
import Button from './Button.jsx';
import classNames from 'classnames';

const nameMaker = (users) => {
  const last = users.length - 1;
  return users
  .map(user => `${user.firstName} ${user.lastName}`)
  .reduce((names, currName, i) =>
    names + (i === last ? ' & ' : ', ') + currName
  );
};

const Room = ({ selfId, room, handleRoomChange, roomDeleter, index }) => (

  <li className="clearfix">
    <img src={room.users[0].photoUrl} className="profilePic" alt="avatar" />
    <div className="about">
      <div className="name">{nameMaker(room.users)}</div>
      <div className="status">
        <i className="fa fa-circle online"></i> online
      </div>
    </div>
  </li>
);

// TODO
/* add time last updated?? */
/* display last message text? */

const Rooms = ({ selfId, rooms, handleRoomChange, roomDeleter }) => (
  <div className="people-list" id="people-list">
    <ul className="list">
      {rooms.map((room, i, roomsState) => (
         <Room key={i} index={i} room={room} handleRoomChange={handleRoomChange} roomDeleter={roomDeleter} selfId={selfId} />
       ))}
    </ul>
  </div>
);

export default Rooms;

// <Button label='Delete' type='action' clickHandler={(e) => roomDeleter(e, index, selfId, room.id)} />
      // <div className="thread-name">{room.onlineNow ? 'Online now!' : ''}</div>
      // <Button label='Delete' type='action' clickHandler={(e) => roomDeleter(e, index, selfId, room.id)} />
/* TODO: Rooms should be linked lists
room users should be pointers to pairs */

  // <div className="thread-section">
  //   <div className="thread-list">
  //     {rooms.map((room, i, roomsState) => (
  //       <Room key={i} index={i} room={room} handleRoomChange={handleRoomChange} roomDeleter={roomDeleter} selfId={selfId} />
  //     ))}
  //   </div>
  // </div>

  // <a href="#" onClick={(e) => handleRoomChange(e, index)}>
  //   <div className="room">
  //     <div className="thread-name">{nameMaker(room.users)}</div>
  //     <Button label='Delete' type='action' clickHandler={(e) => roomDeleter(e, index, selfId, room.id)} />
  //   </div>
  // </a>