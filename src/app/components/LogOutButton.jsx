"use client";
import { signOut } from "next-auth/react";

const LogOutButton = () => {
    return (
        <div>
          <button onClick={() => signOut()} className="border-1 border-black bg-blue-300">Logout</button>  
        </div>
    );
};

export default LogOutButton;