import { api } from "./api";
export const getComments = async (ticketId: number) => {

    const response = await api.get(`/comments/ticket/${ticketId}`);

    return response.data;

};


export const addComment = async (ticketId: number, message: string) => {

    const response = await api.post("/comments", {
        ticket_id: ticketId,
        message: message,
    });

    return response.data;

};


export const updateComment = async (commentId: number, message: string) => {

    const response = await api.put(`/comments/${commentId}`, {
        message,
    });

    return response.data;

};


export const deleteComment = async (commentId: number) => {

    const response = await api.delete(`/comments/${commentId}`);

    return response.data;

};