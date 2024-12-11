"use client";

import Image from "next/image";
import { FaBuilding, FaTools, FaUsers } from "react-icons/fa";
import { MdDashboard, MdForklift } from "react-icons/md";
import { NavBar } from "./NavBar";
import { useRouter } from "next/navigation";

export function Aside() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    window.location.reload();
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-blue-600 to-gray-700 text-white flex flex-col justify-between min-h-screen shadow-md">
      <div className="p-6">
        <a href="/" rel="noopener noreferrer">
          <Image
            src="/image/logo.png"
            alt="logo"
            width={150}
            height={200}
            className="mb-6"
          />
        </a>
        <NavBar />
      </div>
      <button
        onClick={handleLogout}
        className="m-6 p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors shadow-lg"
      >
        Logout
      </button>
    </aside>
  );
}
