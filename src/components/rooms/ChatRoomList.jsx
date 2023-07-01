import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import ChatRoomItem from "./ChatRoomItem";

function ChatRoomList({ roomLists, searchRoomTitle, onClickSelectRoom }) {
    const [newRooms, setNewRooms] = useState(roomLists);

    useEffect(() => {
        setNewRooms(roomLists);
    }, [roomLists]);

    if (!roomLists) {
        return;
    }

    const searchedRooms = newRooms.filter(
        (item) =>
            !searchRoomTitle ||
            item.roomTitle.toLowerCase().includes(searchRoomTitle)
    );

    return (
        <ul>
            {searchedRooms.map((room) => (
                <li
                    className="chat-room-item"
                    key={room.id}
                    onClick={() => onClickSelectRoom(room)}
                >
                    <ChatRoomItem roomTitle={room.roomTitle} />
                </li>
            ))}
        </ul>
    );
}

export default ChatRoomList;
