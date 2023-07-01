import React, { ReactNode } from "react";

interface IChatTemplate {
    style: object;
    children: ReactNode;
}

function ChatTemplate({ style, children }: IChatTemplate) {
    return (
        <div style={style} className="chat_content">
            {children}
        </div>
    );
}

export default ChatTemplate;
