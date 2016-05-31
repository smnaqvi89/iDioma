import React from 'react';

// should disable when no rooms
const Input = ({ inputText, handleTextInput, clickHandler }) => (
  <div className="chat-message clearfix">
    <textarea
      name="message-to-send"
      id="message-to-send"
      placeholder="Type your message"
      rows="3">
    </textarea>
            
    <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
    <i className="fa fa-file-image-o"></i>
    
    <button>Send</button>

  </div>
);

export default Input;

// <input
//   className="message-composer"
//   type="text"
//   value={inputText.value}
//   onChange={handleTextInput}
//   onKeyDown={(e) => (e.keyCode === 13) && clickHandler()}
// />