"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import { getProfile, updateProfile, changePassword } from "@/services/user.service";
import useAuthGuard from "@/hooks/useAuthGuard";

export default function ProfilePage() {

    useAuthGuard();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const data = await getProfile();

                console.log("Profile Data:", data);

                setName(data?.name || "");
                setEmail(data?.email || "");
                setRole(data?.role || "");

            } catch (error) {

                console.error("Failed to load profile:", error);

            } finally {

                setLoading(false);

            }

        };

        loadProfile();

    }, []);


    const handleUpdate = async () => {

        try {

            await updateProfile(name);

            alert("Profile updated successfully");

        } catch (error) {

            console.error(error);

            alert("Profile update failed");

        }

    };


    const handlePassword = async () => {

        try {

            await changePassword(oldPassword, newPassword);

            alert("Password changed successfully");

            setOldPassword("");
            setNewPassword("");

        } catch (error) {

            console.error(error);

            alert("Password change failed");

        }

    };


    if (loading) {
        return (
            <div className="flex">
                <Sidebar />
                <div className="flex-1 p-8">
                    <p>Loading profile...</p>
                </div>
            </div>
        );
    }


    return (
        <div className="flex">

            <Sidebar />

            <div className="flex-1 p-8">

                <h1 className="text-3xl font-bold mb-6">
                    My Profile
                </h1>


                {/* Profile Info */}

                <div className="bg-white shadow rounded p-6 mb-6 max-w-lg">

                    <h2 className="text-xl font-semibold mb-4">
                        Profile Information
                    </h2>

                    <p className="mb-2">
                        <strong>Name:</strong> {name}
                    </p>

                    <p className="mb-2">
                        <strong>Email:</strong> {email}
                    </p>

                    <p>
                        <strong>Role:</strong> {role}
                    </p>

                </div>


                {/* Update Profile */}

                <div className="bg-white shadow rounded p-6 mb-6 max-w-lg">

                    <h2 className="text-xl font-semibold mb-4">
                        Update Profile
                    </h2>

                    <input
                        type="text"
                        className="border p-2 w-full mb-4"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <button
                        onClick={handleUpdate}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Update Profile
                    </button>

                </div>


                {/* Change Password */}

                <div className="bg-white shadow rounded p-6 max-w-lg">

                    <h2 className="text-xl font-semibold mb-4">
                        Change Password
                    </h2>

                    <input
                        type="password"
                        placeholder="Old Password"
                        className="border p-2 w-full mb-3"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="New Password"
                        className="border p-2 w-full mb-3"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />

                    <button
                        onClick={handlePassword}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Change Password
                    </button>

                </div>

            </div>

        </div>
    );
}