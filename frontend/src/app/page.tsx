"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res =
        await api.post(
          "/auth/login",
          {
            email,
            password,
          }
        );

      localStorage.setItem(
        "token",
        res.data.token
      );

      router.push(
        "/dashboard"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Login failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md space-y-4 border p-6 rounded-xl"
      >

        <h1 className="text-2xl font-bold">
          AccessFlow
        </h1>

        <input
          className="w-full border p-3 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          className="w-full border p-3 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full border p-3 rounded"
        >
          {loading
            ? "Signing In..."
            : "Sign In"}
        </button>

      </form>

    </div>
  );
}