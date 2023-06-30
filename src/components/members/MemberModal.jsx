const MemberModal = ({ title, children }) => {
    return (
        <div className="modal">
            <div className="modal_wrapper">
                <header>
                    <div className="modal_header_group">
                        <h1>{title}</h1>
                    </div>
                </header>
                <div className="modal_content">{children}</div>
            </div>
        </div>
    );
};

export default MemberModal;
