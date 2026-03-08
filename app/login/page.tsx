"use client";

import { useState } from "react";
import { loginUser } from "@/services/auth.service";
import { getProfile } from "@/services/user.service";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {

    const { login } = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {

        e.preventDefault();
        setError(null);

        try {

            setLoading(true);

            // 🔹 Login API
            const data = await loginUser({
                email,
                password
            });

            const token = data.access_token;

            // Save token
            localStorage.setItem("token", token);

            // 🔹 Get logged in user
            const user = await getProfile();

            // Save user in context
            login(user, token);

            router.push("/dashboard");

        } catch (err) {

            console.error(err);
            setError("Invalid email or password");

        } finally {

            setLoading(false);

        }

    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

                <h2 className="text-3xl font-bold text-center mb-6">
                    Welcome Back
                </h2>

                <p className="text-gray-500 text-center mb-6">
                    Login to access your dashboard
                </p>

                {error && (
                    <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">

                    {/* Email */}

                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {/* Password */}

                    <div className="relative">

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full border p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-sm text-gray-500"
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>

                    </div>

                    {/* Login Button */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition disabled:opacity-50"
                    >

                        {loading ? "Logging in..." : "Login"}

                    </button>

                </form>

                {/* Register Link */}

                <p className="text-center text-sm text-gray-500 mt-6">

                    Don't have an account?{" "}

                    <Link
                        href="/"
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}