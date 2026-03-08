"use client";

import { updateTicketStatus } from "@/services/ticket.service";

export default function StatusDropdown({ ticket }: any) {

    const handleChange = async (e: any) => {

        const status = e.target.value;

        await updateTicketStatus(ticket.id, status);

        alert("Status Updated");

    };

    return (

        <select
            defaultValue={ticket.status}
            onChange={handleChange}
            className="border p-2 rounded"
        >

            <option value="open">Open</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>

        </select>

    );

}