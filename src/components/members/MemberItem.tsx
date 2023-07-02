interface IMemberItemProps {
    username: string;
}

function MemberItem({ username }: IMemberItemProps) {
    return (
        <li className="member-name-item">
            <p>{username}</p>
        </li>
    );
}

export default MemberItem;
