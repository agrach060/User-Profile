import { signIn } from "next-auth/react";

const LoginButton = ({ buttonText }: { buttonText?: string }) => {
    return (
        <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard", prompt: "select_account" })}
            className="flex items-center justify-center border border-gray-500 rounded-md px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
        >
            {buttonText || "Sign in with Google"}
        </button>
    );
};

export default LoginButton;
