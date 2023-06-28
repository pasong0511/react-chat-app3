import { useEffect, useState } from "react";
import axios from "axios";

function ChatCreate() {
    const [roomTitle, setRoomTitle] = useState("");

    const onChange = (e) => setRoomTitle(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(roomTitle);
        axios
            .post("http://localhost:4001/chatRooms", {
                roomTitle,
                createdAt: Date.now(),
            })
            .then(() => {
                console.log("성공");
            })
            .catch((e) => {});
        setRoomTitle("");
    };

    return (
        <>
            <div>
                <form onSubmit={onSubmit}>
                    <input
                        autoFocus
                        onChange={onChange}
                        value={roomTitle}
                        placeholder="채팅방 이름 입력 후 엔터"
                    ></input>
                </form>
            </div>
        </>
    );
}

export default ChatCreate;
