import { LOGIN_USER } from "../../utils/api";
import { $$Message } from "../../types/type";

interface IMessageDataProps {
    messages?: $$Message[];
}

function MessageList({ messages = [] }: IMessageDataProps) {
    return (
        <div className="chatroom">
            {messages.map((message) => (
                <div
                    key={message.messageId}
                    className={`message ${
                        message.userId === LOGIN_USER.userId
                            ? "message-own"
                            : ""
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

export default MessageList;
