import { useState, useEffect, useCallback } from "react";
import MemberList from "../members/MemberList";
import MemberModal from "../members/MemberModal";

const ChatRoomLayout = ({
    currentSelectRoom,
    title,
    handleCloseRoom,
    children,
}) => {
    const [memberViewOpen, setMemberViewOpen] = useState(false);

    const memberViewClose = () => {
        console.log("멤버보기");

        setMemberViewOpen(!memberViewOpen);
    };

    console.log("보여주기", currentSelectRoom);

    return (
        <>
            <div className="modal">
                <div className="modal_wrapper">
                    <header>
                        <div className="modal_header_group">
                            <h1 className="content-title">{title}</h1>
                            <button onClick={handleCloseRoom}>나가기</button>
                            <button onClick={memberViewClose}>멤버보기</button>
                        </div>
                    </header>
                    <div className="modal_content">{children}</div>
                </div>
            </div>

            {memberViewOpen && (
                <MemberModal title={currentSelectRoom.roomTitle}>
                    <MemberList currentRoom={currentSelectRoom} />
                </MemberModal>
            )}
        </>
    );
};

export default ChatRoomLayout;
