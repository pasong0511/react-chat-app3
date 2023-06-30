const ChatRoomModal = ({
    title,
    handleCloseRoom,
    handleViewMember,
    children,
}) => {
    return (
        <div className="modal">
            <div className="modal_wrapper">
                <header>
                    <div className="modal_header_group">
                        <h1>{title}</h1>
                        <button onClick={handleCloseRoom}>나가기</button>
                        <button onClick={handleViewMember}>멤버보기</button>
                    </div>
                </header>
                <div className="modal_content">{children}</div>
            </div>
        </div>
    );
};

export default ChatRoomModal;
