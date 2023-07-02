export type $$Members = {
    userId: string;
    username: string;
};

export type $$Room = {
    id: number;
    roomTitle: string;
    createdAt: string;
};

export type $$Message = {
    message: string;
    messageId: string;
    userId: string;
    username: string;
    timestamp: string;
};

export interface IMembersData {
    id: number;
    members: $$Members[];
}

export interface IMessageData {
    id: number;
    messages: $$Message[];
}
