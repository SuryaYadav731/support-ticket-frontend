"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { createTicket } from "@/services/ticket.service";
import { useRouter } from "next/navigation";
import useAuthGuard from "@/hooks/useAuthGuard";

export default function CreateTicketPage() {

    useAuthGuard();

    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("low");
    const [file, setFile] = useState<File | null>(null);


    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        try {

            const formData = new FormData();

            formData.append("title", title);
            formData.append("description", description);
            formData.append("priority", priority);

            if (file) {
                formData.append("file", file);
            }

            await createTicket(formData);

            alert("Ticket created successfully");

            router.push("/tickets");

        } catch (error) {

            console.error("Ticket creation failed", error);
            alert("Failed to create ticket");

        }

    };

    return (
        <div className="flex">

            <Sidebar />

            <div className="flex-1 p-8">

                <h1 className="text-3xl font-bold mb-6">
                    Create Ticket
                </h1>

                <form onSubmit={handleSubmit} className="max-w-lg">

                    {/* Title */}

                    <div className="mb-4">

                        <label className="block mb-2 font-semibold">
                            Title
                        </label>

                        <input
                            type="text"
                            className="border p-2 w-full"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />

                    </div>


                    {/* Description */}

                    <div className="mb-4">

                        <label className="block mb-2 font-semibold">
                            Description
                        </label>

                        <textarea
                            className="border p-2 w-full"
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />

                    </div>


                    {/* Priority */}

                    <div className="mb-4">

                        <label className="block mb-2 font-semibold">
                            Priority
                        </label>

                        <select
                            className="border p-2 w-full"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >

                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>

                        </select>

                    </div>


                    {/* File Upload */}

                    <div className="mb-4">

                        <label className="block mb-2 font-semibold">
                            Attachment
                        </label>

                        <input
                            type="file"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />

                    </div>


                    {/* Submit Button */}

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Create Ticket
                    </button>

                </form>

            </div>

        </div>
    );
}