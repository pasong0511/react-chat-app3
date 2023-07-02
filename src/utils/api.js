import axios from "axios";

export const LOGIN_USER = {
    userId: "admin",
    username: "Song",
};

const DB_POST = "4001";
const API_URL = `http://localhost:${DB_POST}`;

//채팅 메시지 생성
const addChatMessageGroup = () =>
    axios.post(`${API_URL}/chatMessages`, { messages: [] });

//채팅 멤버 (기본) 생성
const addChatMemberGroup = () =>
    axios.post(`${API_URL}/chatMembers`, { members: [LOGIN_USER] });

export const fetchChatMember = (id) =>
    axios.get(`${API_URL}/chatMembers/${id}`);

const deleteChatMessage = (id) => axios.delete(`${API_URL}/chatMessages/${id}`);

const deleteChatMember = (id) => axios.delete(`${API_URL}/chatMembers/${id}`);

export const getChatRooms = () =>
    axios
        .get(`${API_URL}/chatRooms`)
        .then(({ data }) => data)
        .catch(console.error);

//1. 채팅방 생성 -> 2. 채팅방 메시지 생성 -> 3. 채팅방 멤버 생성
export const addChatRoom = (roomTitle) =>
    axios
        .post(`${API_URL}/chatRooms`, {
            roomTitle,
            createdAt: new Date().toISOString(),
        })
        .then(addChatMessageGroup)
        .then(addChatMemberGroup)
        .catch(console.error);

//1. 채팅방 삭제 -> 3. 채팅방 메신저 삭제 -> 3. 채팅방 멤버 삭제
export const deleteChatRoom = (id) =>
    axios
        .delete(`${API_URL}/chatRooms/${id}`)
        .then(() => deleteChatMessage(id))
        .then(() => deleteChatMember(id))
        .catch(console.error);

export const updateChatMessage = (id, messages) =>
    axios.patch(`${API_URL}/chatMessages/${id}`, {
        messages,
    });

export const getChatMessage = (id) =>
    axios.get(`${API_URL}/chatMessages/${id}`).catch(console.error);
