"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { validateMobile } from "@/lib/validate";

export default function LoginPage() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!validateMobile(mobile)) {
      setError("Invalid Iranian mobile number");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://randomuser.me/api/?results=1&nat=us");
      const data = await response.json();

      const user = {
        name: `${data.results[0].name.first} ${data.results[0].name.last}`,
        email: data.results[0].email,
        picture: data.results[0].picture.large,
      };

      localStorage.setItem("user", JSON.stringify(user));
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <Input
          label="Mobile Number"
          value={mobile}
          onChange={setMobile}
          placeholder="09xxxxxxxxx"
          error={error}
        />

        <Button onClick={handleLogin} loading={loading}>
          Login
        </Button>
      </div>
    </div>
  );
}
