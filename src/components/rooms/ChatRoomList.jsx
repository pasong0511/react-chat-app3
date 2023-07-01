import React, { useEffect } from "react";
import { useState, useCallback } from "react";
import ChatRoomItem from "./ChatRoomItem";

function ChatRoomList({ rooms, searchRoomTitle, onClickSelectRoom }) {
    const [newRooms, setNewRooms] = useState(rooms);

    useEffect(() => {
        setNewRooms(rooms);
    }, [rooms]);

    if (!rooms) {
        return;
    }

    console.log("🥟🥟🥟방", rooms);

    const searchedRooms = newRooms.filter(
        (item) =>
            !searchRoomTitle ||
            item.roomTitle.toLowerCase().includes(searchRoomTitle)
    );

    console.log("검색결과🧀🧀🧀", searchedRooms);

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
