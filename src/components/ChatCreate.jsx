import { useEffect, useState } from "react";
import axios from "axios";

function ChatCreate({ onCreateChatRoom }) {
    const [roomTitle, setRoomTitle] = useState("");

    const handleInputChange = (e) => {
        setRoomTitle(e.target.value);
    };

    const createChatRoom = (e) => {
        e.preventDefault();
        onCreateChatRoom(roomTitle); //입력한 값 매개변수 통해서 여기서 넘겨줌
        setRoomTitle("");
    };

    return (
        <>
            <div>
                <form onSubmit={createChatRoom}>
                    <input
                        autoFocus
                        onChange={handleInputChange}
                        value={roomTitle}
                        placeholder="채팅방 이름 입력 후 엔터"
                    ></input>
                    <button onClick={createChatRoom}>입력</button>
                </form>
            </div>
        </>
    );
}

export default ChatCreate;
