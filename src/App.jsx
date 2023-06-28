import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";

import ChatTemplate from "./components/ChatTemplate";
import ChatList from "./components/ChatList";
import ChatCreate from "./components/ChatCreate";

function App() {
    const [rooms, setRooms] = useState([]);

    const createChat = async (chatRoom) => {
        let params = {
            roomTitle: chatRoom,
            createdAt: Date.now(),
        };

        axios
            .post("http://localhost:4001/chatRooms", {
                params,
            })
            .then(() => {
                console.log("성공");
                setRooms([...rooms, params]);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    useEffect(() => {
        const fetchTodos = async () => {
            axios.get(`http://localhost:4001/chatRooms`).then((res) => {
                setRooms(res.data);
            });
        };

        fetchTodos();
    }, []);

    return (
        <div className="App">
            <ChatTemplate>
                <ChatCreate onAddChat={createChat} />
                <ChatList rooms={rooms} />
            </ChatTemplate>
        </div>
    );
}

export default App;
