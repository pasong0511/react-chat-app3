import { useState, useEffect } from "react";
import "./App.css";

//공통
import ChatTemplate from "./components/share/ChatTemplate";
import InputTxt from "./components/share/input/InputTxt";

//채팅방
import ChatRoomList from "./components/rooms/ChatRoomList";

//채팅 메시지
import MessageList from "./components/messages/MessageList";
import MessageLayout from "./components/messages/MessageLayout";

//API 요청
import {
    LOGIN_USER,
    getChatRooms,
    addChatRoom,
    deleteChatRoom,
    updateChatMessage,
    getChatMessage,
} from "./utils/api";

import { $$Room, IMessageData } from "./types/type";

function App() {
    const [roomLists, setRoomLists] = useState<$$Room[]>([]); //전체 채팅방 목록
    const [messageData, setMessageData] = useState<IMessageData>(); //채팅방에 1개에 따른 메시지 데이터
    const [currentSelectRoom, setCurrentSelectRoom] = useState<$$Room>(); //헌재 선택한 룸
    const [searchRoomTitle, setSearchRoomTitle] = useState<string>("");
    const [newRoomToggle, setNewRoomToggle] = useState<boolean>(false);

    const handleCreateChatRoom = (roomTitle: string) =>
        addChatRoom(roomTitle).then(getChatRooms).then(setRoomLists);

    const handleCloseRoom = () => {
        if (!currentSelectRoom) {
            return;
        }
        deleteChatRoom(currentSelectRoom.id)
            .then(getChatRooms)
            .then(setRoomLists);
    };

    const handleSendMessage = (newText: string) => {
        if (!currentSelectRoom || !messageData) {
            return;
        }

        const newMessage = {
            userId: LOGIN_USER.userId,
            username: LOGIN_USER.username,
            timestamp: new Date().toISOString(),
            message: newText,
        };
        const messages = [
            ...messageData.messages,
            {
                ...newMessage,
                messageId: btoa(
                    encodeURIComponent(
                        `${Math.random()}` + JSON.stringify(newMessage)
                    )
                ).slice(0, 256),
            },
        ];

        updateChatMessage({ id: currentSelectRoom.id, messages })
            .then(() =>
                setMessageData({
                    id: currentSelectRoom.id,
                    messages,
                })
            )
            .catch(() => {
                alert(
                    "존재하지 않는 채팅방이거나 서버에 문제가 발생했습니다. 다시 시도해주세요."
                );
            });
    };

    const handelSearchRooms = (roomTitle: string) => {
        console.log(roomTitle);
        setSearchRoomTitle(roomTitle);
    };

    const handleOpenAddRoom = () => {
        setNewRoomToggle(!newRoomToggle);
    };

    //채팅방 목록 데이터 패칭
    useEffect(() => {
        getChatRooms().then(setRoomLists);
    }, []);

    //대화방 선택에 따라서 채팅방 다시 패칭
    useEffect(() => {
        const aliveRoomIds = roomLists.map((room) => room.id);
        if (aliveRoomIds.length === 0) {
            setCurrentSelectRoom(undefined);
            return;
        }
        if (currentSelectRoom && aliveRoomIds.includes(currentSelectRoom.id)) {
            return;
        }
        const last = roomLists[roomLists.length - 1];
        setCurrentSelectRoom(last);
    }, [currentSelectRoom, roomLists]);

    //채팅방 대화정보 데이터 패칭
    useEffect(() => {
        if (currentSelectRoom?.id) {
            getChatMessage(currentSelectRoom.id)
                .then((res: any) => {
                    setMessageData(res.data);
                })
                .catch(console.error);
        }
    }, [currentSelectRoom]);

    return (
        <div className="App">
            <div className="chat_main">
                <ChatTemplate style={{ minWidth: "250px" }}>
                    <button onClick={handleOpenAddRoom}>새로운방</button>
                    {newRoomToggle && (
                        <InputTxt
                            onChangeTxt={handleCreateChatRoom}
                            placeholderValue={"채팅방 이름 입력 후 엔터"}
                        />
                    )}
                    <InputTxt
                        onChangeTxt={handelSearchRooms}
                        placeholderValue={"검색할 채팅방 이름 입력 후 엔터"}
                    />
                    <ChatRoomList
                        roomLists={roomLists}
                        searchRoomTitle={searchRoomTitle}
                        onClickSelectRoom={setCurrentSelectRoom}
                    />
                </ChatTemplate>
                <ChatTemplate>
                    <MessageLayout
                        currentSelectRoom={currentSelectRoom}
                        handleCloseRoom={handleCloseRoom}
                    >
                        <MessageList messages={messageData?.messages} />
                        <InputTxt
                            onChangeTxt={handleSendMessage}
                            placeholderValue={"메시지 입력 후 엔터"}
                        />
                    </MessageLayout>
                </ChatTemplate>
            </div>
        </div>
    );
}

export default App;
