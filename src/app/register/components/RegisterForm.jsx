"use client";

import { RegisterUser } from "@/app/actions/auth/RegisterUser";

const RegisterForm = () => {
    const handleRegister = async (e) => {
        e.preventDefault();
        const form = e.target;
        const username = form.username.value;
        const password = form.password.value;
        const payload = { username, password };
        //console.log("Registration payload", payload);
        const result = await RegisterUser(payload);
        console.log(result)
    }
    return (
        <div>
            <>
                <form onSubmit={handleRegister} className="space-y-4">
                    <label htmlFor="username" className="block">
                        Username
                    </label>
                    <input
                        className="block p-1 text-black"
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Enter unique username"
                    />
                    <label htmlFor="password" className="block">
                        Password
                    </label>
                    <input
                        className="block p-1  text-black"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                    />
                    <button type="submit" className="outline rounded-md p-2">
                        Register
                    </button>
                </form>
            </>
        </div>
    );
};

export default RegisterForm;