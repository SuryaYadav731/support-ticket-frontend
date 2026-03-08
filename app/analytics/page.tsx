"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import {
    getDashboardAnalytics,
    getTicketsPerDay,
    getAgentPerformance,
} from "@/services/analytics.service";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
} from "recharts";

const COLORS = ["#3b82f6", "#10b981", "#ef4444"];

export default function AnalyticsPage() {

    const [stats, setStats] = useState<any>(null);
    const [ticketsPerDay, setTicketsPerDay] = useState<any[]>([]);
    const [agentPerformance, setAgentPerformance] = useState<any[]>([]);

    const fetchAnalytics = async () => {

        try {

            const dashboard = await getDashboardAnalytics();
            const perDay = await getTicketsPerDay();
            const agentPerf = await getAgentPerformance();

            setStats(dashboard);
            setTicketsPerDay(perDay);
            setAgentPerformance(agentPerf);

        } catch (error) {

            console.error("Analytics error", error);

        }

    };

    useEffect(() => {

        fetchAnalytics();

        // 🔥 Auto refresh every 10 seconds
        const interval = setInterval(fetchAnalytics, 10000);

        return () => clearInterval(interval);

    }, []);

    if (!stats) return <p className="p-8">Loading analytics...</p>;

    const statusData = [
        { name: "Open", value: stats.status.open },
        { name: "Resolved", value: stats.status.resolved },
        { name: "Closed", value: stats.status.closed },
    ];

    const priorityData = [
        { name: "High", value: stats.priority.high },
        { name: "Medium", value: stats.priority.medium },
        { name: "Low", value: stats.priority.low },
    ];

    return (
        <div className="flex">

            <Sidebar />

            <div className="flex-1 p-8 bg-gray-100 min-h-screen">

                <h1 className="text-3xl font-bold mb-8">
                    Analytics Dashboard
                </h1>

                {/* Cards */}

                <div className="grid grid-cols-4 gap-6 mb-10">

                    <div className="bg-white shadow p-6 rounded">
                        <p className="text-gray-500">Total Tickets</p>
                        <h2 className="text-2xl font-bold">{stats.total_tickets}</h2>
                    </div>

                    <div className="bg-white shadow p-6 rounded">
                        <p className="text-gray-500">Open</p>
                        <h2 className="text-2xl font-bold">{stats.status.open}</h2>
                    </div>

                    <div className="bg-white shadow p-6 rounded">
                        <p className="text-gray-500">Resolved</p>
                        <h2 className="text-2xl font-bold">{stats.status.resolved}</h2>
                    </div>

                    <div className="bg-white shadow p-6 rounded">
                        <p className="text-gray-500">Closed</p>
                        <h2 className="text-2xl font-bold">{stats.status.closed}</h2>
                    </div>

                </div>


                {/* Charts Row 1 */}

                <div className="grid grid-cols-2 gap-6 mb-10">

                    {/* Status Chart */}

                    <div className="bg-white shadow p-6 rounded">

                        <h2 className="text-lg font-bold mb-4">
                            Ticket Status
                        </h2>

                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={statusData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#3b82f6" />
                            </BarChart>
                        </ResponsiveContainer>

                    </div>


                    {/* Priority Pie */}

                    <div className="bg-white shadow p-6 rounded">

                        <h2 className="text-lg font-bold mb-4">
                            Priority Distribution
                        </h2>

                        <ResponsiveContainer width="100%" height={300}>

                            <PieChart>

                                <Pie
                                    data={priorityData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={100}
                                    label
                                >

                                    {priorityData.map((entry, index) => (
                                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                    ))}

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </div>


                {/* Charts Row 2 */}

                <div className="grid grid-cols-2 gap-6">

                    {/* Tickets per Day */}

                    <div className="bg-white shadow p-6 rounded">

                        <h2 className="text-lg font-bold mb-4">
                            Tickets Per Day
                        </h2>

                        <ResponsiveContainer width="100%" height={300}>

                            <LineChart data={ticketsPerDay}>

                                <XAxis dataKey="date" />

                                <YAxis />

                                <Tooltip />

                                <Line
                                    type="monotone"
                                    dataKey="tickets"
                                    stroke="#10b981"
                                    strokeWidth={3}
                                />

                            </LineChart>

                        </ResponsiveContainer>

                    </div>


                    {/* Agent Performance */}

                    <div className="bg-white shadow p-6 rounded">

                        <h2 className="text-lg font-bold mb-4">
                            Agent Performance
                        </h2>

                        <ResponsiveContainer width="100%" height={300}>

                            <BarChart data={agentPerformance}>

                                <XAxis dataKey="agent_id" />

                                <YAxis />

                                <Tooltip />

                                <Bar
                                    dataKey="resolved_tickets"
                                    fill="#f59e0b"
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>

        </div>
    );
}