import React, { Component } from 'react';

class Video extends Component {

  componentDidMount() {
    const conversation = this.props.conversation;
    conversation.localMedia.attach(this.refs.localMedia);

    conversation.on('participantConnected', participant => {
      participant.media.attach(this.refs.remoteMedia);
    });
  }

  componentWillUnmount() {
    const conversation = this.props.conversation;
    conversation.localMedia.stop();
    conversation.disconnect();
  }

  render() {
    const { handleVideoDisconnectClick } = this.props;
    return (
      <div className="video-container">
        <div ref="remoteMedia" className="other-media-container"></div>
        <div ref="localMedia" className="self-media-container"></div>
        <button className="action disconnect" onClick={() => { handleVideoDisconnectClick(); }}>Disconnect</button>
      </div>
    );
  }
}

export default Video;
