import { api } from "./api";

export const getDashboardStats = async () => {

    const res = await api.get("/dashboard/stats");

    return res.data;

};

export const getStatusChart = async () => {
    const res = await api.get("/dashboard/analytics/status");
    return res.data;
};

export const getPriorityChart = async () => {
    const res = await api.get("/dashboard/analytics/priority");
    return res.data;
};

export const getMonthlyChart = async () => {
    const res = await api.get("/dashboard/analytics/monthly");
    return res.data;
};