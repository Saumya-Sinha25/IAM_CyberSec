"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import DashboardCard from "@/components/DashboardCard";

type Stats = {
  resources: number;
  myRequests: number;
  pendingManager: number;
  pendingAdmin: number;
  approved: number;
  rejected: number;
};

export default function Dashboard() {
  const [stats, setStats] =
    useState<Stats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get(
          "/dashboard/stats"
        );

        setStats(res.data.stats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        AccessFlow Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <DashboardCard
          title="Resources"
          value={stats.resources}
        />

        <DashboardCard
          title="My Requests"
          value={stats.myRequests}
        />

        <DashboardCard
          title="Pending Manager"
          value={stats.pendingManager}
        />

        <DashboardCard
          title="Pending Admin"
          value={stats.pendingAdmin}
        />

        <DashboardCard
          title="Approved"
          value={stats.approved}
        />

        <DashboardCard
          title="Rejected"
          value={stats.rejected}
        />
      </div>
    </div>
  );
}