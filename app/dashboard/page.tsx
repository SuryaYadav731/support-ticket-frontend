"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { getDashboardStats } from "@/services/dashboard.service";
import useAuthGuard from "@/hooks/useAuthGuard";
import DashboardCharts from "@/components/dashboard/DashboardCharts";

export default function DashboardPage() {

    useAuthGuard();

    const [stats, setStats] = useState<any>(null);

    useEffect(() => {

        const fetchStats = async () => {

            try {

                const data = await getDashboardStats();

                setStats(data);

            } catch (error) {

                console.error("Failed to load dashboard stats", error);

            }

        };

        fetchStats();

    }, []);


    if (!stats) {
        return (
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-8">
                    <p className="text-gray-500">Loading dashboard...</p>
                </div>
            </div>
        );
    }


    return (
        <div className="flex">

            <Sidebar />

            <div className="flex-1 p-8">

                <h1 className="text-3xl font-bold mb-6">
                    Dashboard
                </h1>


                {/* Stats Cards */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Admin Dashboard */}

                    {stats.role === "admin" && (
                        <>
                            <Card title="Total Users" value={stats.total_users} color="bg-blue-500" />
                            <Card title="Total Tickets" value={stats.total_tickets} color="bg-purple-500" />
                            <Card title="Open Tickets" value={stats.open} color="bg-yellow-500" />
                            <Card title="Resolved Tickets" value={stats.resolved} color="bg-green-500" />
                        </>
                    )}


                    {/* Agent Dashboard */}

                    {stats.role === "agent" && (
                        <>
                            <Card title="Assigned Tickets" value={stats.assigned} color="bg-blue-500" />
                            <Card title="Open Tickets" value={stats.open} color="bg-yellow-500" />
                            <Card title="Resolved Tickets" value={stats.resolved} color="bg-green-500" />
                        </>
                    )}


                    {/* Customer Dashboard */}

                    {stats.role === "customer" && (
                        <>
                            <Card title="My Tickets" value={stats.my_tickets} color="bg-blue-500" />
                            <Card title="Open Tickets" value={stats.open} color="bg-yellow-500" />
                            <Card title="Resolved Tickets" value={stats.resolved} color="bg-green-500" />
                        </>
                    )}

                </div>


                {/* Dashboard Charts */}

                <div className="mt-10">

                    <DashboardCharts />

                </div>

            </div>

        </div>
    );
}


function Card({ title, value, color }: any) {

    return (
        <div className={`${color} text-white p-6 rounded shadow hover:scale-105 transition`}>

            <h2 className="text-lg font-semibold">
                {title}
            </h2>

            <p className="text-3xl font-bold mt-2">
                {value}
            </p>

        </div>
    );

}