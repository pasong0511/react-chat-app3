import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./App.css";

//공통
import ChatTemplate from "./components/share/ChatTemplate";
import InputTxt from "./components/share/input/InputTxt";

//채팅방
import ChatList from "./components/rooms/ChatList";

//채팅 메시지
import ChatHistory from "./components/chats/ChatHistory";
import ChatRoomModal from "./components/chats/ChatModal";

//멤버

function App() {
    const [roomLists, setRoomLists] = useState([]); //전체 채팅방 목록
    const [messageData, setMessageData] = useState({}); //채팅방에 1개에 따른 메시지 데이터
    const [currentSelectRoom, setCurrentSelectRoom] = useState({}); //헌재 선택한 룸

    const fetchChatRooms = () => {
        axios.get(`http://localhost:4001/chatRooms`).then((res) => {
            setRoomLists(res.data);
        });
    };

    const handleCreateChatRoom = (roomTitle) => {
        const today = new Date();
        const createdAt = today.toISOString();

        let newRoom = {
            roomTitle,
            createdAt: createdAt,
        };
        axios
            .post("http://localhost:4001/chatRooms", {
                roomTitle,
                createdAt: createdAt,
            })
            .then(() => {
                console.log("🚗🚗🚗🚗🚗rooms", roomLists, newRoom);
                //newRoom에 방 id 추가해야함
                setRoomLists([...roomLists, newRoom]);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const handleCloseRoom = () => {
        //db가 없어서 부득이하게 api 두번 쏨
        //1. 채팅방 지우기, 2. 채팅방 데이터 지우기
        axios
            .delete(
                `http://localhost:4001/chatRooms/${currentSelectRoom.roomId}`
            )
            .then(() => {
                axios.delete(
                    `http://localhost:4001/chatMessages/${currentSelectRoom.roomId}`
                );

                //todo : 삭제 후 컴포넌트 리렌더링
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const handleSendMessage = (newMessage) => {
        const today = new Date();
        const createdAt = today.toISOString();

        const saveMessage = {
            user_id: "admin",
            username: "Song",
            timestamp: createdAt,
            message: newMessage,
        };

        const messages = [...messageData.messages, saveMessage];

        axios
            .patch(
                `http://localhost:4001/chatMessages/${currentSelectRoom.roomId}`,
                {
                    messages,
                }
            )
            .then(() => {
                setMessageData({
                    id: messageData.id,
                    messages,
                });
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const handelClickSelectRoom = (roomId, roomName) => {
        setCurrentSelectRoom({ roomId, roomName });
    };

    //채팅방 목록 데이터 패칭
    useEffect(() => {
        fetchChatRooms();
    }, []);

    //채팅방 대화정보 데이터 패칭
    useEffect(() => {
        const fetchMessageHistory = (id) => {
            axios
                .get(`http://localhost:4001/chatMessages/${id}`)
                .then((res) => {
                    setMessageData(res.data);
                })
                .catch((e) => {});
        };

        fetchMessageHistory(currentSelectRoom.roomId);
    }, [currentSelectRoom]);

    console.log(roomLists);

    return (
        <div className="App">
            <div className="chat_main">
                <ChatTemplate>
                    <div>채팅방</div>
                    <InputTxt
                        onChangeTxt={handleCreateChatRoom}
                        value={"채팅방 이름 입력 후 엔터"}
                    />
                    <ChatList
                        rooms={roomLists}
                        onClickSelectRoom={handelClickSelectRoom}
                    />
                </ChatTemplate>
                <ChatTemplate>
                    <ChatRoomModal
                        title={currentSelectRoom.roomName}
                        handleCloseRoom={handleCloseRoom}
                    >
                        <ChatHistory
                            roomData={currentSelectRoom}
                            chat={messageData}
                        />
                        <InputTxt
                            onChangeTxt={handleSendMessage}
                            value={"메시지 입력 후 엔터"}
                        />
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
