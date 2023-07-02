import React from "react";

interface IChatRoomProps {
    roomTitle: string;
}

function ChatRoomItem({ roomTitle }: IChatRoomProps) {
    return <div>{roomTitle}</div>;
}

export default ChatRoomItem;
