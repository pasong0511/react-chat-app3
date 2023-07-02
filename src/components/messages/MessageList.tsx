import { LOGIN_USER } from "../../utils/api";

type $$Message = {
    message: string;
    messageId: number;
    timestamp: string;
    userId: string;
    username: string;
};

interface IMessageList {
    id: number;
    messages: $$Message[];
}

interface IMessageData {
    messageData: IMessageList;
}

function MessageList({ messageData }: IMessageData) {
    return (
        <div className="chatroom">
            {messageData.messages?.map((message: $$Message) => (
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
