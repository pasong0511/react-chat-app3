import { useEffect } from "react";
import { useState } from "react";
import ChatRoomItem from "./ChatRoomItem";

type $$Room = {
    id: number;
    roomTitle: string;
    createdAt: string;
};

interface IChatRoomList {
    roomLists: $$Room[];
    searchRoomTitle: string;
    onClickSelectRoom: React.Dispatch<React.SetStateAction<$$Room>>;
}

function ChatRoomList({
    roomLists,
    searchRoomTitle,
    onClickSelectRoom,
}: IChatRoomList) {
    const [newRoomLists, setNewRoomLists] = useState<$$Room[]>(roomLists);

    useEffect(() => {
        setNewRoomLists(roomLists);
    }, [roomLists]);

    if (!roomLists) {
        return;
    }

    const searchRoomLists = newRoomLists.filter(
        (item: $$Room) =>
            !searchRoomTitle ||
            item.roomTitle.toLowerCase().includes(searchRoomTitle)
    );

    return (
        <ul>
            {searchRoomLists.map((room: $$Room) => (
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
