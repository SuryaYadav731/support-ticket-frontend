"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { getTickets } from "@/services/ticket.service";
import useAuthGuard from "@/hooks/useAuthGuard";
import { useRouter } from "next/navigation";
import AssignAgent from "@/components/AssignAgent";
import StatusDropdown from "@/components/StatusDropdown";
interface Ticket {
    id: number;
    title: string;
    status: string;
    priority: string;
    agent_id?: number;
}

export default function TicketsPage() {

    useAuthGuard();

    const router = useRouter();

    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);


    const fetchTickets = async () => {

        try {

            setLoading(true);

            const data = await getTickets(page);

            setTickets(data.items || data);
            setTotalPages(data.pages || 1);

            setError(null);

        } catch (err) {

            console.error("Failed to fetch tickets", err);
            setError("Failed to load tickets");

        } finally {

            setLoading(false);

        }

    };


    useEffect(() => {
        fetchTickets();
    }, [page]);


    const handleOpenTicket = (id: number) => {
        router.push(`/tickets/${id}`);
    };


    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1 p-8">

                <h1 className="text-3xl font-bold mb-6">
                    Tickets
                </h1>

                {loading && (
                    <p className="text-gray-500 mb-4">
                        Loading tickets...
                    </p>
                )}

                {error && (
                    <p className="text-red-500 mb-4">
                        {error}
                    </p>
                )}

                <table className="w-full border">

                    <thead className="bg-gray-200">

                        <tr>
                            <th className="p-3 border">ID</th>
                            <th className="p-3 border">Title</th>
                            <th className="p-3 border">Status</th>
                            <th className="p-3 border">Priority</th>
                            <th className="p-3 border">Assigned Agent</th>
                            <th className="p-3 border">Assign</th>
                        </tr>

                    </thead>

                    <tbody>

                        {tickets.map((ticket) => (

                            <tr
                                key={ticket.id}
                                className="cursor-pointer hover:bg-gray-100"
                                onClick={() => handleOpenTicket(ticket.id)}
                            >

                                <td className="p-3 border">{ticket.id}</td>

                                <td className="p-3 border">{ticket.title}</td>

                                <td
                                    className="p-3 border"
                                    onClick={(e) => e.stopPropagation()}
                                >

                                    <StatusDropdown ticket={ticket} />

                                </td>

                                <td className="p-3 border">{ticket.priority}</td>

                                {/* Assigned Agent */}

                                <td className="p-3 border">

                                    {ticket.agent_id
                                        ? `Agent ${ticket.agent_id}`
                                        : "Unassigned"}

                                </td>

                                {/* Assign Agent Dropdown */}

                                <td
                                    className="p-3 border"
                                    onClick={(e) => e.stopPropagation()}
                                >

                                    <AssignAgent ticketId={ticket.id} />

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>


                {/* Pagination */}

                <div className="flex items-center gap-4 mt-6">

                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Prev
                    </button>

                    <span>
                        Page {page} of {totalPages}
                    </span>

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                        className="px-3 py-1 border rounded disabled:opacity-50"
                    >
                        Next
                    </button>

                </div>

            </div>

        </div>

    );

}