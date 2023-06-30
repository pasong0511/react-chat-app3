import React from "react";
import { useState, useEffect, useCallback } from "react";
import ChatRoomItem from "./ChatRoomItem";
import axios from "axios";

function ChatRoomList({ rooms, onClickSelectRoom }) {
    if (!rooms) {
        return;
    }

    return (
        <ul>
            {rooms.map((room, index) => (
                <li
                    className="chat-room-item"
                    key={index}
                    onClick={() => onClickSelectRoom(room.id, room.roomTitle)}
                >
                    <ChatRoomItem roomTitle={room.roomTitle} />
                </li>
            ))}
        </ul>
    );
}

export default ChatRoomList;
