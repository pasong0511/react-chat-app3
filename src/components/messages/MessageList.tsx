import React, { useRef, useEffect } from "react";
import { LOGIN_USER } from "../../utils/api";
import { $$Message } from "../../types/type";

interface IMessageDataProps {
    messages?: $$Message[];
}

interface IMessageProps {
    message: $$Message;
    isEned?: boolean;
}

function MessageItem({ message, isEned = false }: IMessageProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isEned) {
            //elem.scrollIntoView() - 특정 요소 위치로 화면 스크롤 이동하기
            ref.current?.scrollIntoView();
        }
    }, [isEned]);

    return (
        <div
            ref={ref}
            className={`message ${
                message.userId === LOGIN_USER.userId ? "message-own" : ""
            }`}
        >
            <h5>
                {message.username} (
                {new Date(message.timestamp).toLocaleTimeString()}):
            </h5>
            <p>{message.message}</p>
        </div>
    );
}

function MessageList({ messages = [] }: IMessageDataProps) {
    return (
        <div className="message-list-wraper">
            {messages.map((message, idx) => (
                <MessageItem
                    key={message.messageId}
                    message={message}
                    isEned={idx === messages.length - 1} //마지막 인덱스인 경우
                />
            ))}
        </div>
    );
}

export default MessageList;
