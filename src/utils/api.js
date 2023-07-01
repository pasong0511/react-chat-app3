import axios from "axios";

export const loginUser = {
    userId: "admin",
    username: "Song",
};

//채팅 메시지 생성
const addChatMessageGroup = () =>
    axios.post("http://localhost:4001/chatMessages", { messages: [] });

//채팅 멤버 (기본) 생성
const addChatMemberGroup = () =>
    axios.post("http://localhost:4001/chatMembers", { members: [loginUser] });

export const fetchChatMember = (id) =>
    axios.get(`http://localhost:4001/chatMembers/${id}`);

const deleteChatMessage = (id) =>
    axios.delete(`http://localhost:4001/chatMessages/${id}`);

const deleteChatMember = (id) =>
    axios.delete(`http://localhost:4001/chatMembers/${id}`);

export const getChatRooms = () =>
    axios
        .get(`http://localhost:4001/chatRooms`)
        .then(({ data }) => data)
        .catch(console.error);

//1. 채팅방 생성 -> 2. 채팅방 메시지 생성 -> 3. 채팅방 멤버 생성
export const addChatRoom = (roomTitle) =>
    axios
        .post("http://localhost:4001/chatRooms", {
            roomTitle,
            createdAt: new Date().toISOString(),
        })
        .then(addChatMessageGroup)
        .then(addChatMemberGroup)
        .catch(console.error);

//1. 채팅방 삭제 -> 3. 채팅방 메신저 삭제 -> 3. 채팅방 멤버 삭제
export const deleteChatRoom = (id) =>
    axios
        .delete(`http://localhost:4001/chatRooms/${id}`)
        .then(() => deleteChatMessage(id))
        .then(() => deleteChatMember(id))
        .catch(console.error);

export const updateChatMessage = (id, messages) =>
    axios
        .patch(`http://localhost:4001/chatMessages/${id}`, {
            messages,
        })
        .catch(console.error);

export const getChatMessage = (id) =>
    axios.get(`http://localhost:4001/chatMessages/${id}`).catch(console.error);
