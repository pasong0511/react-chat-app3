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
import {
    loginUser,
    getChatRooms,
    addChatRoom,
    deleteChatRoom,
    updateChatMessage,
    getChatMessage,
} from "./utils/api";

//멤버

function App() {
    const [roomLists, setRoomLists] = useState([]); //전체 채팅방 목록
    const [messageData, setMessageData] = useState({}); //채팅방에 1개에 따른 메시지 데이터
    const [currentSelectRoom, setCurrentSelectRoom] = useState({}); //헌재 선택한 룸

    const handleCreateChatRoom = (roomTitle) =>
        addChatRoom(roomTitle).then(getChatRooms).then(setRoomLists);

    const handleCloseRoom = () => {
        deleteChatRoom(currentSelectRoom.id);
    };

    const handleSendMessage = (newMessage) => {
        const messages = [
            ...messageData.messages,
            {
                userId: loginUser.userId,
                username: loginUser.username,
                timestamp: new Date().toISOString(),
                message: newMessage,
            },
        ];

        updateChatMessage(currentSelectRoom.id, messages).then(
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

    //대화방 선택에 따라서 채팅방 다시 패칭
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
            getChatMessage(currentSelectRoom.id)
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
