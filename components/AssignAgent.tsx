"use client";

import { useEffect, useState } from "react";
import { getAgents } from "@/services/user.service";
import { assignTicket } from "@/services/ticket.service";

export default function AssignAgent({ ticketId }: any) {

    const [agents, setAgents] = useState<any[]>([]);

    const handleAssign = async (agentId: number) => {

        await assignTicket(ticketId, agentId);

        alert("Agent assigned");

    };

    useEffect(() => {

        const fetchAgents = async () => {

            const data = await getAgents();

            setAgents(data);

        };

        fetchAgents();

    }, []);

    return (

        <select
            onChange={(e) => handleAssign(Number(e.target.value))}
            className="border p-2 rounded"
        >

            <option>Select Agent</option>

            {agents.map((agent) => (

                <option key={agent.id} value={agent.id}>

                    {agent.name}

                </option>

            ))}

        </select>

    );
}