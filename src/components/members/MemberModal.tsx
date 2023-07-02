import React, { ReactNode } from "react";

interface IMemberModalProps {
    title: string;
    children: ReactNode;
}

function MemberModal({ title, children }: IMemberModalProps) {
    return (
        <div
            style={{ width: "200px", maxWidth: "200px" }}
            className="modal member-view"
        >
            <header>
                <div className="modal-header-group">
                    <h1 className="content-title">{title}</h1>
                </div>
            </header>
            <div className="modal_content">{children}</div>
        </div>
    );
}

export default MemberModal;
