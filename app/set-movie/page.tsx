"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

const SetMovie = () => {
    const [favoriteMovie, setFavoriteMovie] = useState("");
    const router = useRouter();
    const { data: session, status, update } = useSession();
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);

    const handleSave = async () => {
        if (!session?.user?.id) {
            console.error("Session user ID is not available");
            return;
        }

        try {
            setIsSaving(true);
            const response = await axios.post("/api/save-movie", {
                userId: session.user.id,
                favoriteMovie,
            });
            if (response.status === 200) {
                await update();
                router.push("/dashboard");
            } else {
                console.error("Unexpected response status:", response.status);
            }
        } catch (error) {
            console.error("Error saving favorite movie:", error);
            setIsSaving(false);
        }
    };

    if (status === "unauthenticated") {
        router.push("/");
        return null;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Please enter your favorite movie</h1>
                <input
                    type="text"
                    value={favoriteMovie}
                    onChange={(e) => setFavoriteMovie(e.target.value)}
                    className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none mb-4"
                />
                <button
                    onClick={handleSave}
                    className={`w-full bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition ${isSaving ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    disabled={isSaving}
                >
                    {isSaving ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
};

export default SetMovie;
