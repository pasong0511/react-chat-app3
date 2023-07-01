import { loginUser } from "../../utils/api";

function MessageList({ messageData }) {
    return (
        <div className="chatroom">
            {messageData.messages?.map((message) => (
                <div
                    key={message.messageId}
                    className={`message ${
                        message.username === loginUser.username
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
