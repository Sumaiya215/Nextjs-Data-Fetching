"use client";
import {signIn} from "next-auth/react"

const LoginButton = () => {
    return (
        <div>
            <button onClick={()=> signIn()} className="border-1 border-black bg-blue-300">Login</button>
        </div>
    );
};

export default LoginButton;