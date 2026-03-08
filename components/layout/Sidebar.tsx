"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Sidebar() {

    const { user, logout } = useAuth();
    console.log("User in Sidebar:", user);
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/login");
    };

    return (
        <div className="w-64 h-screen bg-gray-900 text-white p-5">

            <h1 className="text-2xl font-bold mb-8">
                Support System
            </h1>

            <nav className="flex flex-col gap-4">

                {/* Dashboard */}
                <Link href="/dashboard" className="hover:text-blue-400">
                    Dashboard
                </Link>

                {/* Tickets */}
                <Link href="/tickets" className="hover:text-blue-400">
                    Tickets
                </Link>

                {/* Create Ticket */}
                <Link href="/create-ticket" className="hover:text-blue-400">
                    Create Ticket
                </Link>

                {/* Profile */}
                <Link href="/profile" className="hover:text-blue-400">
                    Profile
                </Link>

                {user?.role === "admin" && (
                    <>
                        <Link href="/analytics">
                            Analytics
                        </Link>

                        <Link href="/admin/users">
                            User Management
                        </Link>
                    </>
                )}
                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="text-red-400 mt-6 hover:text-red-500"
                >
                    Logout
                </button>

            </nav>

        </div>
    );
}