import React from "react";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

//currentRoom을 받을지 id도 함께 받을지 고민
function MemberList({ currentRoom }) {
    const [roomId, setRoomId] = useState(currentRoom.id || "");
    const [membersData, setMembersData] = useState({});

    //채팅방 목록 데이터 패칭
    useEffect(() => {
        const fetchChatMembers = () => {
            axios
                .get(`http://localhost:4001/chatMembers/${roomId}`)
                .then((res) => {
                    setMembersData(res.data);
                });
        };
        fetchChatMembers();
    }, []);

    console.log("채팅방에 참여한 멤버!", membersData);

    return (
        <div className="">
            {membersData.members?.map((members, index) => (
                <p>{members}</p>
            ))}
        </div>
    );
}

export default MemberList;
