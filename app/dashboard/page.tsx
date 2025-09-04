"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
  picture: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  // بررسی وضعیت لاگین کاربر
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/"); // هدایت به Login
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [router]);

  // تابع Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/"); // هدایت به Login
  };

  if (!user) return null; // تا لود شدن داده‌ها چیزی نمایش نده

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <img
        src={user.picture}
        alt={user.name}
        className="w-24 h-24 rounded-full mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">Welcome, {user.name}!</h1>
      <p className="mb-6">{user.email}</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
