import React from "react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function ChatHistory({ roomData }) {
    const { roomId, roomName } = roomData;
    const [chat, setChat] = useState();

    useEffect(() => {
        const fetchChatHistory = (id) => {
            console.log("API 요청 함수 실행🧀🧀🧀🧀🧀🧀");
            axios
                .get(`http://localhost:4001/chats/1`)
                .then((res) => {
                    console.log("서버에서 가져온 데이터", res.data);
                    setChat(res.data);
                })
                .catch((e) => {});
        };

        fetchChatHistory(roomId);
    }, []);

    console.log("대화내용", chat);

    if (!roomId) {
        return;
    }

    console.log(roomId, " 이용해서 메시지 가져오기 api 요청");

    // if (!chat.messages) {
    //     return;
    // }

    return (
        <div className="chatroom">
            {/* {chat.messages.map((message, index) => (
                <div
                    key={index}
                    className={`message ${
                        message.username === "Lee" ? "message-own" : ""
                    }`}
                >
                    <h5>
                        {message.username} (
                        {new Date(message.timestamp).toLocaleTimeString()}):
                    </h5>
                    <p>{message.message}</p>
                </div>
            ))} */}
        </div>
    );
}

export default ChatHistory;
