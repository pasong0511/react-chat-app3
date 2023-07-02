interface IMemberItem {
    username: string;
}

function MemberItem({ username }: IMemberItem) {
    return (
        <li className="member-name-item">
            <p>{username}</p>
        </li>
    );
}

export default MemberItem;
