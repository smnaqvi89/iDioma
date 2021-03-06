import React from 'react';
import Rooms from './Rooms.jsx';
import Messages from './Messages.jsx';
import Input from './Input.jsx';
import Button from './Button.jsx';
import VideoRequestButton from './VideoRequestButton.jsx';

// current room will always be the first object in rooms (i.e. rooms[0])
const Conversations = ({ self, rooms, inputText, handleRoomChange, roomDeleter, handleTextInput, handleOnSend, handleVideoRequestClick, handleVideoDisconnectClick, handleToggleHasError, isInVideo, isWaiting, hasError, errorMessage, invite }) => {
  if (rooms.length === 0) {
    return (
      <div className="empty-tab-message">
        <p>You haven't had a conversation with a pair yet. Break the ice?</p>
        <p>Potential conversation starters:</p>
        <p>1) Exchange a simple greeting in a language you and your pair both know.</p>
        <p>2) Share an interesting cultural anecdote.</p>
        <p>3) Introduce a song you like.</p>
        <p>4) Introduce a movie you recently watched.</p>
        <p>Be open and creative!</p>
      </div>
    );
  }

  const currRoom = rooms[0] || { id: 0, messages: [], users: [] };

  const msgTemplate = {
    roomId: currRoom.id,
    senderId: self.id,
    from: { firstName: self.firstName, lastName: self.lastName },
    body: '',
  };

  const submitMsg = () =>
    handleOnSend(Object.assign({}, msgTemplate, { body: inputText.value }));

  const waitingMessage = isWaiting ?
    <div>Waiting for response...</div>
    : null;
  const errorMessageHolder = hasError ?
    <div>
      <div className="language">
        {errorMessage}
      </div>
      <button className="x" onClick={() => { handleToggleHasError(); }}>x</button>
    </div>
    : null;
  const videoRequestButton = !isInVideo ?
    <VideoRequestButton handleVideoRequestClick={handleVideoRequestClick} isWaiting={isWaiting} invite={invite} otherId={'Test'} />
    : null;
    
  return (
    <div className="chatapp">
      <link rel="stylesheet" href="/css/chat.css" media="screen" title="no title" charset="utf-8"></link>
      <link rel='stylesheet prefetch' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css'></link>
      <div className="container clearfix">
        <div className="people-list" id="people-list">
          <div className="search">
            <input type="text" placeholder="search" />
            <i className="fa fa-search"></i>
          </div>
          <Rooms rooms={rooms} currentRoom={currRoom} handleRoomChange={handleRoomChange} roomDeleter={roomDeleter} selfId={self.id} />
        </div>
        
        <div className="chat">
          <div className="chat-header clearfix">
            <img src="" />
            
            <div className="chat-about">
              <div className="chat-with">Chat with</div>
              <div className="chat-num-messages">100 messages</div>
            </div>
            <i className="fa fa-star"></i>
          </div>
          
          <div className="chat-history">
            <ul>
              <li className="clearfix">
                <div className="message-data align-right">
                  <span className="message-data-time" >10:10 AM, Today</span> &nbsp; &nbsp;
                  <span className="message-data-name" >Olia</span> <i className="fa fa-circle me"></i>
                  
                </div>
                <div className="message other-message float-right">
                  Hi Vincent, how are you? How is the project coming along?
                </div>
              </li>
              
              <li>
                <div className="message-data">
                  <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                  <span className="message-data-time">10:12 AM, Today</span>
                </div>
                <div className="message my-message">
                  Are we meeting today? Project has been already finished and I have results to show you.
                </div>
              </li>
              
              <li className="clearfix">
                <div className="message-data align-right">
                  <span className="message-data-time" >10:14 AM, Today</span> &nbsp; &nbsp;
                  <span className="message-data-name" >Olia</span> <i className="fa fa-circle me"></i>
                  
                </div>
                <div className="message other-message float-right">
                  Well I am not sure. The rest of the team is not here yet. Maybe in an hour or so? Have you faced any problems at the last phase of the project?
                </div>
              </li>
              
              <li>
                <div className="message-data">
                  <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                  <span className="message-data-time">10:20 AM, Today</span>
                </div>
                <div className="message my-message">
                  Actually everything was fine. I'm very excited to show this to our team.
                </div>
              </li>
              
              <li>
                <div className="message-data">
                  <span className="message-data-name"><i className="fa fa-circle online"></i> Vincent</span>
                  <span className="message-data-time">10:31 AM, Today</span>
                </div>
                <i className="fa fa-circle online"></i>
              </li>
              
            </ul>
            
          </div>
          
          <Input />
          
        </div>
        
      </div>
      {videoRequestButton}
      {waitingMessage}
      {errorMessageHolder}
    </div>
  );
};

export default Conversations;

// <div>
//   <Rooms rooms={rooms} currentRoom={currRoom} handleRoomChange={handleRoomChange} roomDeleter={roomDeleter} selfId={self.id} />
// </div>
// <div>
//   <div>
//     <Messages usersKey={currRoom.usersKey} messages={currRoom.messages || []} />
//   </div>
//   <Input inputText={inputText} clickHandler={submitMsg} handleTextInput={handleTextInput} />
//   <Button clickHandler={submitMsg} label='Send' type='action' />
// </div>
