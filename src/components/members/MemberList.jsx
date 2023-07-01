import React from "react";
import { useState, useEffect, useCallback } from "react";

import { fetchChatMember } from "../../utils/api";

import MemberItem from "./MemberItem";

function MemberList({ currentRoom }) {
    const [membersData, setMembersData] = useState({});

    //채팅방 목록 데이터 패칭
    useEffect(() => {
        fetchChatMember(currentRoom.id).then((res) => {
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
