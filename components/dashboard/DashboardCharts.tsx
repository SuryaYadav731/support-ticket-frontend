"use client";

import { useEffect, useState } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend
} from "chart.js";

import {
    getStatusChart,
    getPriorityChart,
    getMonthlyChart
} from "@/services/dashboard.service";

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend
);

export default function DashboardCharts() {

    const [statusData, setStatusData] = useState<any>({});
    const [priorityData, setPriorityData] = useState<any>({});
    const [monthlyData, setMonthlyData] = useState<any>({});

    useEffect(() => {

        const fetchCharts = async () => {

            setStatusData(await getStatusChart());
            setPriorityData(await getPriorityChart());
            setMonthlyData(await getMonthlyChart());

        };

        fetchCharts();

    }, []);


    const statusChart = {
        labels: Object.keys(statusData),
        datasets: [
            {
                data: Object.values(statusData),
            },
        ],
    };

    const priorityChart = {
        labels: Object.keys(priorityData),
        datasets: [
            {
                data: Object.values(priorityData),
            },
        ],
    };

    const monthlyChart = {
        labels: Object.keys(monthlyData),
        datasets: [
            {
                label: "Tickets",
                data: Object.values(monthlyData),
            },
        ],
    };


    return (
        <div className="grid md:grid-cols-3 gap-6 mt-10">

            <div className="bg-white p-6 shadow rounded">
                <h2 className="font-semibold mb-4">
                    Tickets by Status
                </h2>
                <Pie data={statusChart} />
            </div>

            <div className="bg-white p-6 shadow rounded">
                <h2 className="font-semibold mb-4">
                    Tickets by Priority
                </h2>
                <Bar data={priorityChart} />
            </div>

            <div className="bg-white p-6 shadow rounded">
                <h2 className="font-semibold mb-4">
                    Monthly Ticket Trend
                </h2>
                <Line data={monthlyChart} />
            </div>

        </div>
    );
}