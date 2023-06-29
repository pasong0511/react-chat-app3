import React from "react";
import { useState, useEffect, useCallback } from "react";
import ChatRoomItem from "./ChatRoomItem";
import axios from "axios";

function ChatList({ rooms, onClickSelectRoom }) {
    if (!rooms) {
        return;
    }
    console.log("컴포넌트왓음", rooms);

    return (
        <ul>
            {rooms.map((room, index) => (
                <li
                    className="chat_room_item"
                    key={index}
                    onClick={() => onClickSelectRoom(room.id, room.roomTitle)}
                >
                    <ChatRoomItem roomTitle={room.roomTitle} />
                </li>
            ))}
        </ul>
    );
}

export default ChatList;
