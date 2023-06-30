import React from "react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

import MemberItem from "./MemberItem";

//currentRoom을 받을지 id도 함께 받을지 고민
function MemberList({ currentRoom }) {
    const [roomId, setRoomId] = useState(currentRoom.id || "");
    const [membersData, setMembersData] = useState({});

    //채팅방 목록 데이터 패칭
    //todo : id가 바로 안넘어옴
    useEffect(() => {
        console.log("🍙api 요청");

        const fetchChatMembers = () => {
            axios.get(`http://localhost:4001/chatMembers/1`).then((res) => {
                setMembersData(res.data);
            });
        };
        fetchChatMembers();
    }, [roomId]);

    // console.log("🍔🍔🍔🍔 currentRoom", currentRoom.id);
    // console.log("채팅방에 참여한 멤버!", membersData);

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
