"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import Link from "next/link";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me");

        console.log(res.data);

        setUser(res.data.user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        AccessFlow Dashboard
      </h1>

      {user && (
        <div className="mt-6 border rounded-lg p-6">
          <p>User ID: {user.id}</p>
          <p>Role: {user.role}</p>
        </div>
      )}

      <Link
        href="/dashboard/resources"
        className="inline-block mt-6 border rounded px-4 py-2"
      >
        View Resources
      </Link>
    </div>
  );
}