import React from "react";
import "./App.css";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";

import ChatTemplate from "./components/ChatTemplate";
import ChatList from "./components/ChatList";
import ChatCreate from "./components/ChatCreate";

function App() {
    const getPosts = () => {
        axios.get(`http://localhost:4001/chatRooms`, {}).then((res) => {
            console.log(res.data);
        });
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className="App">
            <ChatTemplate>
                <ChatCreate />
                <ChatList />
            </ChatTemplate>
        </div>
    );
}

export default App;
