const MemberModal = ({ title, children }) => {
    return (
        <div className="modal">
            <header>
                <div className="modal_header_group">
                    <h1 className="content-title">{title}</h1>
                </div>
            </header>
            <div className="modal_content">{children}</div>
        </div>
    );
};

export default MemberModal;
