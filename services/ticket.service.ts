import { api } from "./api";

export const getTickets = async (page = 1, limit = 10) => {

    const response = await api.get("/tickets", {
        params: {
            page,
            limit
        }
    });

    return response.data;
};
export const createTicket = async (formData: FormData) => {

    const response = await api.post("/tickets/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};
export const updateTicketStatus = async (ticketId: number, status: string) => {

    const response = await api.patch(`/tickets/${ticketId}/status`, {
        status
    });

    return response.data;

};


export const assignTicket = async (ticketId: number, agentId: number) => {

    const res = await api.put(`/tickets/${ticketId}/assign?agent_id=${agentId}`);

    return res.data;

};

export const getMyTickets = async () => {

    const res = await api.get("/tickets/my-tickets");

    return res.data;

};


export const getTicketMessages = async (ticketId: number) => {

    const res = await api.get(`/tickets/${ticketId}/messages`);

    return res.data;

};

export const replyTicket = async (ticketId: number, message: string) => {

    const res = await api.post(`/tickets/${ticketId}/reply`, {
        message
    });

    return res.data;

};