import { useEffect, useState } from "react";
import axios from "axios";

function ChatInput({ onCreateMessage }) {
    const [messageTxt, setMessageTxt] = useState("");

    const handleInputChange = (e) => {
        setMessageTxt(e.target.value);
    };

    const handelCreateMessage = (e) => {
        e.preventDefault();
        onCreateMessage(messageTxt);
        setMessageTxt("");
    };

    return (
        <>
            <div>
                <form onSubmit={handelCreateMessage}>
                    <input
                        autoFocus
                        onChange={handleInputChange}
                        value={messageTxt}
                        placeholder="메시지입력"
                    ></input>
                    <button onClick={handelCreateMessage}>입력</button>
                </form>
            </div>
        </>
    );
}

export default ChatInput;
