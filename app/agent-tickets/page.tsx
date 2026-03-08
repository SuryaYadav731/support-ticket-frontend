"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { getMyTickets } from "@/services/ticket.service";

export default function AgentTicketsPage() {

    const [tickets, setTickets] = useState<any[]>([]);

    useEffect(() => {

        const fetchTickets = async () => {

            const data = await getMyTickets();

            setTickets(data);

        };

        fetchTickets();

    }, []);

    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1 p-8">

                <h1 className="text-3xl font-bold mb-6">

                    My Assigned Tickets

                </h1>

                <table className="w-full border">

                    <thead className="bg-gray-200">

                        <tr>

                            <th className="p-3 border">ID</th>

                            <th className="p-3 border">Title</th>

                            <th className="p-3 border">Status</th>

                            <th className="p-3 border">Priority</th>

                        </tr>

                    </thead>

                    <tbody>

                        {tickets.map((ticket) => (

                            <tr key={ticket.id}>

                                <td className="p-3 border">{ticket.id}</td>

                                <td className="p-3 border">{ticket.title}</td>

                                <td className="p-3 border">{ticket.status}</td>

                                <td className="p-3 border">{ticket.priority}</td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    );

}