"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function ResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [reason, setReason] = useState("");

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

  const handleRequestSubmit = async () => {
    try {
      const res = await api.post("/requests", {
        resourceId: selectedResource._id,
        reason,
      });

      console.log("Request Created:", res.data);

      alert("Request Submitted Successfully");

      setReason("");
      setSelectedResource(null);
    } catch (error: any) {
  console.error("REQUEST ERROR:", error);

  console.log(
    "Response:",
    error?.response?.data
  );

  alert(
    JSON.stringify(
      error?.response?.data
    )
  );
}
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Resources
      </h1>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <div
            key={resource._id}
            className="border rounded-lg p-4 shadow-sm"
          >
            <h2 className="text-xl font-bold">
              {resource.name}
            </h2>

            <p className="mt-2 text-gray-600">
              {resource.description}
            </p>

            <p className="mt-2">
              <strong>Risk:</strong>{" "}
              {resource.riskLevel}
            </p>

            <p>
              <strong>Department:</strong>{" "}
              {resource.ownerDepartment}
            </p>

            <button
              className="mt-4 border rounded px-4 py-2 hover:bg-gray-100"
              onClick={() =>
                setSelectedResource(resource)
              }
            >
              Request Access
            </button>
          </div>
        ))}
      </div>

      {/* Request Form */}
      {selectedResource && (
        <div className="mt-8 border rounded-lg p-6">
          <h2 className="text-xl font-bold">
            Request Access
          </h2>

          <p className="mt-2">
            Resource:
            {" "}
            <strong>
              {selectedResource.name}
            </strong>
          </p>

          <textarea
            className="w-full border rounded mt-4 p-3"
            rows={4}
            placeholder="Why do you need access?"
            value={reason}
            onChange={(e) =>
              setReason(e.target.value)
            }
          />

          <div className="flex gap-3 mt-4">
            <button
              className="border rounded px-4 py-2 hover:bg-gray-100"
              onClick={handleRequestSubmit}
            >
              Submit Request
            </button>

            <button
              className="border rounded px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setSelectedResource(null);
                setReason("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}