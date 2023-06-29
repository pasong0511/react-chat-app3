import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import ChatTemplate from "./components/ChatTemplate";
import ChatList from "./components/ChatList";
import ChatCreate from "./components/ChatCreate";
import ChatHistory from "./components/ChatHistory";

import "./App.css";
import ChatRoomModal from "./components/ChatModal";
import ChatInput from "./components/ChatInput";

function App() {
    const [rooms, setRooms] = useState([]);
    const [currentShowRoom, setCurrentShowRoom] = useState({});

    const fetchChatRooms = () => {
        axios.get(`http://localhost:4001/chatRooms`).then((res) => {
            setRooms(res.data);
        });
    };

    const handleCreateChatRoom = (roomTitle) => {
        let newRoom = {
            roomTitle,
            createdAt: Date.now(),
        };
        axios
            .post("http://localhost:4001/chatRooms", {
                roomTitle,
                createdAt: Date.now(),
            })
            .then(() => {
                setRooms([...rooms, newRoom]);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const onClose = () => {
        console.log("닫기 버튼 클릭, 대화방 나가기");
    };

    const onCreateMessage = (message) => {
        console.log("메시지 입력-->", message);
    };

    useEffect(() => {
        fetchChatRooms();
    }, []);

    const handelClickSelectRoom = (roomId, roomName) => {
        console.log("🥗채팅 룸 번호", roomId, roomName);
        setCurrentShowRoom({ roomId, roomName });
    };

    console.log("선택한 룸 정보", currentShowRoom);

    return (
        <div className="App">
            <div className="chat_main">
                <ChatTemplate>
                    <div>채팅방</div>
                    <ChatCreate onCreateChatRoom={handleCreateChatRoom} />
                    <ChatList
                        rooms={rooms}
                        onClickSelectRoom={handelClickSelectRoom}
                    />
                </ChatTemplate>
                <ChatTemplate>
                    <ChatRoomModal
                        title={currentShowRoom.roomName}
                        onClose={onClose}
                    >
                        <ChatHistory roomData={currentShowRoom} />
                        <ChatInput onCreateMessage={onCreateMessage} />
                    </ChatRoomModal>
                </ChatTemplate>
                <ChatTemplate>
                    <div>멤버방</div>
                </ChatTemplate>
            </div>
        </div>
    );
}

export default App;
