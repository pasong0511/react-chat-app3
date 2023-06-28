import React from "react";
import { useState, useEffect, useCallback } from "react";
import ChatRoomItem from "./ChatRoomItem";
import axios from "axios";

function TodoList() {
    const [chats, setChats] = useState([]);

    const getRooms = () => {
        axios.get(`http://localhost:4001/chatRooms`, {}).then((res) => {
            console.log(res.data);
            setChats(res.data);
        });
    };

    useEffect(() => {
        getRooms();
    }, []);

    return (
        <ul>
            <ChatRoomItem />
        </ul>
    );
}

export default TodoList;
