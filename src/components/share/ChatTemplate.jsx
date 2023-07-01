function ChatTemplate({ style, children }) {
    return (
        <div style={style} className="chat_content">
            {children}
        </div>
    );
}

export default ChatTemplate;
