const ChatRoomModal = ({ title, onClose, onSaveData, children }) => {
    return (
        <div className="modal">
            <div className="modal_wrapper">
                <header>
                    <h1>{title}</h1>
                    <button className="btn_layer_x" onClick={onClose}>
                        X
                    </button>
                </header>
                <div className="modal_content">{children}</div>
            </div>
        </div>
    );
};

export default ChatRoomModal;
