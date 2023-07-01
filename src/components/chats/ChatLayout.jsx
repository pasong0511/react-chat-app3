import { useState, useEffect, useCallback } from "react";
import MemberList from "../members/MemberList";
import MemberModal from "../members/MemberModal";

const ChatRoomLayout = ({ currentSelectRoom, handleCloseRoom, children }) => {
    const [memberViewOpen, setMemberViewOpen] = useState(false);

    const memberViewClose = () => {
        setMemberViewOpen(!memberViewOpen);
    };

    return (
        <>
            <div style={{ minWidth: "300px" }} className="modal">
                <div className="modal_wrapper">
                    {currentSelectRoom.id && (
                        <>
                            <header>
                                <div className="modal_header_group">
                                    <h1 className="content-title">
                                        {currentSelectRoom.roomTitle}
                                    </h1>
                                    <button onClick={handleCloseRoom}>
                                        나가기
                                    </button>
                                    <button onClick={memberViewClose}>
                                        멤버보기
                                    </button>
                                </div>
                            </header>
                            <div className="modal_content">{children}</div>
                        </>
                    )}
                </div>
            </div>

            {currentSelectRoom.id && memberViewOpen && (
                <MemberModal title={currentSelectRoom.roomTitle}>
                    <MemberList currentRoom={currentSelectRoom} />
                </MemberModal>
            )}
        </>
    );
};

export default ChatRoomLayout;
