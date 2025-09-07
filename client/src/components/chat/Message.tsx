import React from 'react';

interface MessageProps {
  sender: 'me' | 'other';
  text: string;
  timestamp: string;
}

const Message: React.FC<MessageProps> = ({ sender, text, timestamp }) => {
  const isMe = sender === 'me';
  return (
    <div className={`flex mb-4 ${isMe ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-md p-4 rounded-2xl ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
      >
        <p>{text}</p>
        <span className={`text-xs mt-2 block text-right ${isMe ? 'text-blue-100' : 'text-gray-500'}`}>
          {timestamp}
        </span>
      </div>
    </div>
  );
};

export default Message;