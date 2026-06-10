"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function ResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await api.get("/resources");

        console.log("Resources API:", res.data);

        setResources(res.data.resources);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResources();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Resources
      </h1>

      <div className="grid gap-4">
        {resources.map((resource) => (
          <div
            key={resource._id}
            className="border rounded p-4"
          >
            <h2>{resource.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}