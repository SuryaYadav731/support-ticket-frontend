import { api } from "./api";

export const getDashboardAnalytics = async () => {
    const res = await api.get("/analytics/dashboard");
    return res.data;
};

export const getTicketsPerDay = async () => {
    const res = await api.get("/analytics/tickets-per-day");
    return res.data;
};

export const getAgentPerformance = async () => {
    const res = await api.get("/analytics/agent-performance");
    return res.data;
};