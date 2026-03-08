"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { getUsers, changeRole, deactivateUser } from "@/services/user.service";

export default function UsersPage() {

    const [users, setUsers] = useState<any[]>([])

    const fetchUsers = async () => {

        const data = await getUsers()

        setUsers(data)

    }

    useEffect(() => {

        fetchUsers()

    }, [])


    const handleRoleChange = async (id: number, role: string) => {

        await changeRole(id, role)

        fetchUsers()

    }


    const handleDeactivate = async (id: number) => {

        await deactivateUser(id)

        fetchUsers()

    }


    return (

        <div className="flex">

            <Sidebar />

            <div className="flex-1 p-8">

                <h1 className="text-3xl font-bold mb-6">
                    Users Management
                </h1>


                <table className="w-full border">

                    <thead className="bg-gray-200">

                        <tr>

                            <th className="p-3 border">ID</th>
                            <th className="p-3 border">Name</th>
                            <th className="p-3 border">Email</th>
                            <th className="p-3 border">Role</th>
                            <th className="p-3 border">Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {users.map(user => (

                            <tr key={user.id}>

                                <td className="border p-2">{user.id}</td>
                                <td className="border p-2">{user.name}</td>
                                <td className="border p-2">{user.email}</td>

                                <td className="border p-2">

                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                    >

                                        <option value="customer">Customer</option>
                                        <option value="agent">Agent</option>
                                        <option value="admin">Admin</option>

                                    </select>

                                </td>

                                <td className="border p-2">

                                    <button
                                        onClick={() => handleDeactivate(user.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >

                                        Deactivate

                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    )

}