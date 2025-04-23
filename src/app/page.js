import Image from "next/image";
import LoginButton from "./components/LoginButton";
import UserInfo from "./components/UserInfo";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import LogOutButton from "./components/LogOutButton";

export default async function Home() {
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <div className="flex flex-col justify-center items-center gap-6 mt-12">
      {session?.user ? (<LogOutButton/>):(<LoginButton/> )}
      <p className="font-bold text-xl">FROM CLIENT COMPONENT:</p>
      <UserInfo></UserInfo>
      <p className="font-bold text-xl">FROM SERVER COMPONENT:</p>
      {JSON.stringify(session)}
    </div>
  );
}
