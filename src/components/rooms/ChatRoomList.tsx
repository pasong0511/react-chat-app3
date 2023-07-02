import { useEffect } from "react";
import { useState } from "react";
import ChatRoomItem from "./ChatRoomItem";

import { $$Room } from "../../types/type";

interface IChatRoomListProps {
    roomLists: $$Room[];
    searchRoomTitle: string;
    onClickSelectRoom: (value: $$Room) => void;
}

function ChatRoomList({
    roomLists,
    searchRoomTitle,
    onClickSelectRoom,
}: IChatRoomListProps) {
    const [newRoomLists, setNewRoomLists] = useState<$$Room[]>(roomLists);

    useEffect(() => {
        setNewRoomLists(roomLists);
    }, [roomLists]);

    if (!roomLists) {
        return null;
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
