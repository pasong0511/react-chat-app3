import { useState, useEffect } from "react";

import { fetchChatMember } from "../../utils/api";

import MemberItem from "./MemberItem";

type $$CurrentRoom = { roomTitle: string; createdAt: string; id: number };

interface IMemberList {
    currentRoom: $$CurrentRoom;
}

type $$Members = { userId: string; username: string };

interface ImembersData {
    id: number;
    members: $$Members[];
}

function MemberList({ currentRoom }: IMemberList) {
    const [membersData, setMembersData] = useState<ImembersData | null>(null);

    //채팅방 목록 데이터 패칭
    useEffect(() => {
        fetchChatMember(currentRoom.id).then((res: any) => {
            setMembersData(res.data);
        });
    }, [currentRoom]);

    if (!membersData) {
        return <></>;
    }

    return (
        <ul>
            {membersData.members?.map((members) => (
                <MemberItem
                    key={members.userId}
                    username={members.username}
                ></MemberItem>
            ))}
        </ul>
    );
}

export default MemberList;
