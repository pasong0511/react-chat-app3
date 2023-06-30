import React from "react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function ChatHistory({ roomData, chat }) {
    const { roomId, roomName } = roomData;

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
