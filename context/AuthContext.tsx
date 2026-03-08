"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {

    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {

        try {

            const savedToken = localStorage.getItem("token");
            const savedUser = localStorage.getItem("user");

            if (savedToken) {
                setToken(savedToken);
            }

            if (savedUser) {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
            }

        } catch (error) {

            console.error("Failed to parse user from localStorage", error);

            localStorage.removeItem("user");

        }

    }, []);


    const login = (userData: any, tokenData: string) => {

        setUser(userData);
        setToken(tokenData);

        localStorage.setItem("token", tokenData);
        localStorage.setItem("user", JSON.stringify(userData));

    };


    const logout = () => {

        setUser(null);
        setToken(null);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

    };


    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

};

export const useAuth = () => useContext(AuthContext);