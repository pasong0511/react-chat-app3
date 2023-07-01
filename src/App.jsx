import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./App.css";

//공통
import ChatTemplate from "./components/share/ChatTemplate";
import InputTxt from "./components/share/input/InputTxt";

//채팅방
import ChatRoomList from "./components/rooms/ChatRoomList";

//채팅 메시지
import ChatHistory from "./components/chats/ChatHistory";
import ChatRoomLayout from "./components/chats/ChatLayout";
import { addChatRoom, getChatRooms } from "./utils/api";

//멤버

function App() {
    const [roomLists, setRoomLists] = useState([]); //전체 채팅방 목록
    const [messageData, setMessageData] = useState({}); //채팅방에 1개에 따른 메시지 데이터
    const [currentSelectRoom, setCurrentSelectRoom] = useState({}); //헌재 선택한 룸

    const handleCreateChatRoom = (roomTitle) =>
        addChatRoom(roomTitle).then(getChatRooms).then(setRoomLists);

    const handleCloseRoom = () => {
        //db가 없어서 부득이하게 api 두번 쏨
        //1. 채팅방 지우기, 2. 채팅방 데이터 지우기
        axios
            .delete(`http://localhost:4001/chatRooms/${currentSelectRoom.id}`)
            .then(() => {
                axios.delete(
                    `http://localhost:4001/chatMessages/${currentSelectRoom.id}`
                );

                //todo : 삭제 후 컴포넌트 리렌더링
            })
            .catch(console.error);
    };

    const handleSendMessage = (newMessage) => {
        const today = new Date();
        const createdAt = today.toISOString();
        const messages = [
            ...messageData.messages,
            {
                userId: "admin",
                username: "Song",
                timestamp: createdAt,
                message: newMessage,
            },
        ];

        //메시지가 중간에 이어지면 이게 가능, 하지만 신규로 만들어진 방은 이게 불가능하다 그냥 푸시해야함
        //중간방이면 이게 가능

        axios
            .patch(
                `http://localhost:4001/chatMessages/${currentSelectRoom.id}`,
                { messages }
            )
            .catch(console.error)
            .then(
                setMessageData({
                    id: currentSelectRoom.id,
                    messages,
                })
            );
    };

    const handelClickSelectRoom = (id, roomTitle) => {
        setCurrentSelectRoom({ id, roomTitle });
    };

    //채팅방 목록 데이터 패칭
    useEffect(() => {
        getChatRooms().then(setRoomLists);
    }, []);

    useEffect(() => {
        if (roomLists.length > 0) {
            const last = roomLists[roomLists.length - 1];
            console.log(roomLists);
            handelClickSelectRoom(last.id, last.roomTitle);
        }
    }, [roomLists]);

    //채팅방 대화정보 데이터 패칭
    useEffect(() => {
        if (currentSelectRoom?.id) {
            axios
                .get(
                    `http://localhost:4001/chatMessages/${currentSelectRoom.id}`
                )
                .then((res) => {
                    setMessageData(res.data);
                })
                .catch(console.error);
        }
    }, [currentSelectRoom]);

    console.log("💡 room 상태", roomLists);
    console.log("💡 messageData 상태", messageData);
    console.log("💡 currentSelectRoom 상태", currentSelectRoom);

    return (
        <div className="App">
            <div className="chat_main">
                <ChatTemplate>
                    <InputTxt
                        onChangeTxt={handleCreateChatRoom}
                        placeholderValue={"채팅방 이름 입력 후 엔터"}
                    />
                    <ChatRoomList
                        rooms={roomLists}
                        onClickSelectRoom={handelClickSelectRoom}
                    />
                </ChatTemplate>
                <ChatTemplate>
                    <ChatRoomLayout
                        currentSelectRoom={currentSelectRoom}
                        title={currentSelectRoom.roomTitle}
                        handleCloseRoom={handleCloseRoom}
                    >
                        <ChatHistory
                            roomData={currentSelectRoom}
                            chat={messageData}
                        />
                        <InputTxt
                            onChangeTxt={handleSendMessage}
                            placeholderValue={"메시지 입력 후 엔터"}
                        />
                    </ChatRoomLayout>
                </ChatTemplate>
            </div>
        </div>
    );
}

export default App;
