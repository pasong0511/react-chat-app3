import axios from "axios";

const addChatMessageGroup = () =>
    axios.post("http://localhost:4001/chatMessages", { messages: [] });

export const getChatRooms = () =>
    axios
        .get(`http://localhost:4001/chatRooms`)
        .then(({ data }) => data)
        .catch(console.error);

export const addChatRoom = (roomTitle) =>
    axios
        .post("http://localhost:4001/chatRooms", {
            roomTitle,
            createdAt: new Date().toISOString(),
        })
        .then(addChatMessageGroup)
        .catch(console.error);
