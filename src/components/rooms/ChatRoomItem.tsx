import React from "react";

interface IChatRoom {
    roomTitle: string;
}

function ChatRoomItem({ roomTitle }: IChatRoom) {
    return <div>{roomTitle}</div>;
}

export default ChatRoomItem;
