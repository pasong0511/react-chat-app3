import React from "react";

const ChatRoomItem = ({ roomTitle }) => {
    return (
        <>
            <div>{roomTitle}</div>
        </>
    );
};

export default React.memo(ChatRoomItem);
