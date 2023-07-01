import { useEffect } from "react";
import { useState } from "react";
import ChatRoomItem from "./ChatRoomItem";

function ChatRoomList({ roomLists, searchRoomTitle, onClickSelectRoom }) {
    const [newRoomLists, setNewRoomLists] = useState(roomLists);

    useEffect(() => {
        setNewRoomLists(roomLists);
    }, [roomLists]);

    if (!roomLists) {
        return;
    }

    const searchRoomLists = newRoomLists.filter(
        (item) =>
            !searchRoomTitle ||
            item.roomTitle.toLowerCase().includes(searchRoomTitle)
    );

    return (
        <ul>
            {searchRoomLists.map((room) => (
                <li
                    className="chat-room-item"
                    key={room.id}
                    onClick={() => onClickSelectRoom(room)}
                >
                    <ChatRoomItem roomTitle={room.roomTitle} />
                </li>
            ))}
        </ul>
    );
}

export default ChatRoomList;
