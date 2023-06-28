import React from "react";
import { useState, useEffect, useCallback } from "react";
import ChatRoomItem from "./ChatRoomItem";
import axios from "axios";

function TodoList({ rooms }) {
    if (!rooms) {
        return;
    }

    console.log("컴포넌트왓음", rooms);

    return (
        <ul>
            {rooms.map((room, index) => (
                <li key={index}>
                    {/* <div>{room.id}</div> */}
                    <div>{room.roomTitle}</div>
                </li>
            ))}
        </ul>
    );
}

export default TodoList;
