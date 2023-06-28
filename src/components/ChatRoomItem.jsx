import React from "react";

const ChatRoomItem = () => {
    return (
        <li className="chat_room_item">
            <div>채팅방</div>
            <div>대화내용</div>
        </li>
    );
};

export default React.memo(ChatRoomItem);
