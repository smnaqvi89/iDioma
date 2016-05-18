import * as actions from './actions/';
import io from 'socket.io-client';

export const socket = io();

socket.emitMsg = (msg) => {
  socket.emit('new message', msg);
};

socket.enterRoom = (user, room) => {
  socket.emit('enter room', room);
};

export default function (store) {
  // initialize user and enter rooms server-side
  const state = store.getState();
  const userId = state.profile.id;
  const roomIds = state.rooms.map(room => room.id);
  socket.emit('join', { userId, roomIds });

  // add socket listeners
  socket.on('new message', msg => {
    store.dispatch(actions.addMsg(msg));
  });

  socket.on('new user', data => {
    console.log(userId, roomId);
  });
}

/*
join new room
new message incoming should open new room
leave room
online now
*/
