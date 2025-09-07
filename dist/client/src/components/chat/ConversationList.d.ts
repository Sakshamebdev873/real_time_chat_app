import React from 'react';
interface Conversation {
    id: number;
    name: string;
    avatar: string;
    lastMessage: string;
    timestamp: string;
    unread: number;
}
interface ConversationListProps {
    conversations: Conversation[];
    selectedConversation: Conversation;
    onSelectConversation: (conversation: Conversation) => void;
}
declare const ConversationList: React.FC<ConversationListProps>;
export default ConversationList;
//# sourceMappingURL=ConversationList.d.ts.map