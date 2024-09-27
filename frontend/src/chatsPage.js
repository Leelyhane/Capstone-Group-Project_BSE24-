import React from 'react';
import { PrettyChatWindow } from 'react-chat-engine-pretty';

const ChatsPage = ({ user = { username: '', secret: '' } }) => (
  <div style={{ height: '100vh', width: '100vw' }}>
    <PrettyChatWindow
      projectId={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
      username={user.username}
      secret={user.secret}
      style={{ height: '100%' }}
      data-testid="pretty-chat-window"
    />
  </div>
);

export default ChatsPage;
