"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/services/api";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me");

        console.log("User:", res.data);

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
      <h1 className="text-4xl font-bold mb-6">
        AccessFlow Dashboard
      </h1>

      {user && (
        <div className="border rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">
            User Information
          </h2>

          <p>
            <strong>User ID:</strong> {user.id}
          </p>

          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-4">
        <Link
          href="/dashboard/resources"
          className="border rounded px-4 py-2 hover:bg-gray-100"
        >
          Resources
        </Link>

        <Link
          href="/dashboard/requests"
          className="border rounded px-4 py-2 hover:bg-gray-100"
        >
          My Requests
        </Link>

        <Link
          href="/dashboard/manager"
          className="border rounded px-4 py-2 hover:bg-gray-100"
        >
        Manager Queue
        </Link>
              
        <Link
            href="/dashboard/admin"
            className="border rounded px-4 py-2"
        >
        Admin Queue
        </Link>
      </div>
    </div>
  );
}