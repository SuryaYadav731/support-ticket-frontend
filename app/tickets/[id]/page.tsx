"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";

import {
    getComments,
    addComment,
    updateComment,
    deleteComment,
} from "@/services/comment.service";

export default function TicketDetailsPage() {
    const params = useParams();
    const ticketId = Number(params.id);

    const [comments, setComments] = useState<any[]>([]);
    const [message, setMessage] = useState("");
    const [editingId, setEditingId] = useState<number | null>(null);

    // ===============================
    // Fetch Comments
    // ===============================

    const fetchComments = async () => {
        try {
            const data = await getComments(ticketId);
            setComments(data);
        } catch (error) {
            console.error("Failed to load comments", error);
        }
    };

    useEffect(() => {
        if (ticketId) {
            fetchComments();
        }
    }, [ticketId]);

    // ===============================
    // Send Comment
    // ===============================

    const handleSend = async () => {
        if (!message.trim()) return;

        await addComment(ticketId, message);

        setMessage("");
        fetchComments();
    };

    // ===============================
    // Update Comment
    // ===============================

    const handleUpdate = async (id: number) => {
        if (!message.trim()) return;

        await updateComment(id, message);

        setEditingId(null);
        setMessage("");

        fetchComments();
    };

    // ===============================
    // Delete Comment
    // ===============================

    const handleDelete = async (id: number) => {
        await deleteComment(id);
        fetchComments();
    };

    return (
        <div className="flex">

            <Sidebar />

            <div className="flex-1 p-8">

                <h1 className="text-3xl font-bold mb-6">
                    Ticket Conversation
                </h1>

                {/* Comments List */}

                <div className="bg-white p-6 rounded shadow mb-6">

                    {comments.length === 0 && (
                        <p className="text-gray-500">No messages yet.</p>
                    )}

                    {comments.map((comment) => (

                        <div
                            key={comment.id}
                            className="border-b pb-4 mb-4"
                        >

                            <p className="font-semibold text-sm">
                                {comment.user?.name || "User"}
                            </p>

                            {editingId === comment.id ? (

                                <input
                                    className="border p-2 w-full mt-2"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />

                            ) : (

                                <p className="text-gray-700 mt-2">
                                    {comment.message}
                                </p>

                            )}

                            {/* Actions */}

                            <div className="flex gap-4 mt-2 text-sm">

                                <button
                                    className="text-blue-500"
                                    onClick={() => {
                                        setEditingId(comment.id);
                                        setMessage(comment.message);
                                    }}
                                >
                                    Edit
                                </button>

                                <button
                                    className="text-red-500"
                                    onClick={() => handleDelete(comment.id)}
                                >
                                    Delete
                                </button>

                                {editingId === comment.id && (

                                    <button
                                        className="text-green-600"
                                        onClick={() => handleUpdate(comment.id)}
                                    >
                                        Save
                                    </button>

                                )}

                            </div>

                        </div>

                    ))}

                </div>

                {/* Send Comment */}

                <div className="flex gap-2">

                    <input
                        type="text"
                        placeholder="Write a comment..."
                        className="border p-2 flex-1"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <button
                        onClick={handleSend}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Send
                    </button>

                </div>

            </div>

        </div>
    );
}