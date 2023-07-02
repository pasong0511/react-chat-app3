import React, { ReactNode } from "react";

interface IChatTemplateProps {
    style?: object;
    children: ReactNode;
}

function ChatTemplate({ style, children }: IChatTemplateProps) {
    return (
        <div style={style} className="chat-content">
            {children}
        </div>
    );
}

export default ChatTemplate;
