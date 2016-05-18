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
  const dispatch = store.dispatch;
  // initialize user and enter rooms server-side
  const state = store.getState();
  const userId = state.profile.id;
  const roomIds = state.rooms.map(room => room.id);
  socket.emit('join', { userId, roomIds });

  // add socket listeners
  socket.on('new message', msg => {
    dispatch(actions.addMsg(msg));
  });

  socket.on('online now', roomId => {
    console.log('got it');
    dispatch(actions.incrementOnlineNow(roomId));
  });
}

/*
TODO: join new room
new message incoming should open new room
leave room
online now
*/
