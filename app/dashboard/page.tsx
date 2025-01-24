"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { signOut } from "next-auth/react";
import Image from "next/image";

const Dashboard = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [movieFact, setMovieFact] = useState("");

    useEffect(() => {
        if (status === "loading") {
            return;
        }

        if (status === "unauthenticated") {
            router.push("/");
            return;
        }

        if (session?.user?.favoriteMovie === null) {
            router.push("/set-movie");
            return;
        }

        const fetchMovieFact = async () => {
            try {
                const response = await axios.post("/api/movie-fact", {
                    movie: session?.user.favoriteMovie,
                });
                setMovieFact(response.data.fact);
            } catch (error) {
                console.error("Error fetching movie fact:", error);
            }
        };

        fetchMovieFact();
    }, [session, status, router]);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                <h1 className="text-2xl font-bold mb-4 text-center">User Profile</h1>
                <div className="flex flex-col items-center space-y-4 mb-6">
                    {session?.user.image && (
                        <Image
                            src={session?.user.image}
                            alt={session?.user.name || ""}
                            className="rounded-full border"
                            width={150}
                            height={150}
                        />)}
                    <div className="space-y-1">
                        <h2 className="text-md font-bold">Name:</h2>
                        <p className="text-md"> {session?.user.name || "User"}</p>
                        <h2 className="text-md font-bold">Email:</h2>
                        <p>{session?.user.email}</p>
                        <h2 className="text-md font-bold">Movie Fact:</h2>
                        <p>{movieFact}</p>
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={() => signOut()}
                        className="w-1/3 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div >
    );
};

export default Dashboard;
