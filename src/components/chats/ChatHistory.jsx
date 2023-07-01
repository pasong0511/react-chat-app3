import React from "react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function ChatHistory({ messageData }) {
    return (
        <div className="chatroom">
            {messageData.messages?.map((message) => (
                <div
                    key={message.messageId}
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
