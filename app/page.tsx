"use client";

import { useSession } from "next-auth/react";
import LoginButton from "./components/LoginButton";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <LoginButton buttonText="Sign in with Google" />
      </div>
    );
  }
};

export default Home;
