import React from "react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function ChatHistory({ roomData }) {
    const { roomId, roomName } = roomData;
    const [chat, setChat] = useState({});

    //클릭한 채팅방 번호로 데이터 패칭해서 메시지 목록 가져옴
    useEffect(() => {
        const fetchChatHistory = (id) => {
            axios
                .get(`http://localhost:4001/chats/${id}`)
                .then((res) => {
                    setChat(res.data);
                })
                .catch((e) => {});
        };

        fetchChatHistory(roomId);
    }, [roomId]);

    return (
        <div className="chatroom">
            {chat.messages?.map((message, index) => (
                <div
                    key={index}
                    className={`message ${
                        message.username === "Song" ? "message-own" : ""
                    }`}
                >
                    <h5>
                        {message.username} (
                        {new Date(message.timestamp).toLocaleTimeString()}):
                    </h5>
                    <p>{message.message}</p>
                </div>
            ))}
        </div>
    );
}

export default ChatHistory;
