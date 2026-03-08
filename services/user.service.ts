import { api } from "./api";

export const getProfile = async () => {

    const res = await api.get("/users/me");

    return res.data;

};

export const updateProfile = async (name: string) => {

    const res = await api.put("/users/update", { name });

    return res.data;

};

export const changePassword = async (oldPassword: string, newPassword: string) => {

    const res = await api.put("/users/change-password", {
        old_password: oldPassword,
        new_password: newPassword
    });

    return res.data;

};


export const getUsers = async () => {

    const res = await api.get("/users");

    return res.data;

};

export const createAgent = async (data: any) => {

    const res = await api.post("/users/create-agent", data);

    return res.data;

};

export const changeRole = async (userId: number, role: string) => {

    const res = await api.put(`/users/change-role/${userId}?role=${role}`);

    return res.data;

};

export const deactivateUser = async (userId: number) => {

    const res = await api.put(`/users/deactivate/${userId}`);

    return res.data;

};



export const getAgents = async () => {

    const res = await api.get("/users/agents");

    return res.data;

};