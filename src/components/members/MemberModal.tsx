import React, { ReactNode } from "react";

interface IMemberModal {
    title: string;
    children: ReactNode;
}

function MemberModal({ title, children }: IMemberModal) {
    return (
        <div style={{ width: "200px", maxWidth: "200px" }} className="modal">
            <header>
                <div className="modal_header_group">
                    <h1 className="content-title">{title}</h1>
                </div>
            </header>
            <div className="modal_content">{children}</div>
        </div>
    );
}

export default MemberModal;
