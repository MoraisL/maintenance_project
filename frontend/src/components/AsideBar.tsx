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
    <aside className="w-64 p-6 bg-gray-100 flex flex-col justify-between min-h-screen">
      <div>
        <a href="/" rel="noopener noreferrer">
          <Image
            src="/image/logo.png"
            alt="logo"
            width={150}
            height={200}
            className="mb-4"
          />
        </a>
        <NavBar />
      </div>
      <button
        onClick={handleLogout}
        className="mt-4 p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
      >
        Logout
      </button>
    </aside>
  );
}
