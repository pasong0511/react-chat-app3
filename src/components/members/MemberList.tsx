import { useState, useEffect } from "react";

import { fetchChatMember } from "../../utils/api";

import MemberItem from "./MemberItem";

import { $$Room, IMembersData } from "../../types/type";

interface IMemberListProps {
    currentRoom: $$Room;
}

function MemberList({ currentRoom }: IMemberListProps) {
    const [membersData, setMembersData] = useState<IMembersData | null>(null);

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
