"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function AdminPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/admin/requests");

      console.log("Admin Requests:", res.data);

      setRequests(res.data.requests);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (
    requestId: string
  ) => {
    try {
      await api.put(
        `/admin/approve/${requestId}`
      );

      alert("Request Approved");

      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (
    requestId: string
  ) => {
    try {
      await api.put(
        `/admin/reject/${requestId}`
      );

      alert("Request Rejected");

      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">
        Admin Queue
      </h1>

      {requests.length === 0 ? (
        <p>No pending admin requests.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request._id}
              className="border rounded-lg p-4"
            >
              <h2 className="text-xl font-bold">
                {
                  request.requestedBy
                    ?.name
                }
              </h2>

              <p>
                Resource:{" "}
                {
                  request.resourceId
                    ?.name
                }
              </p>

              <p>
                Reason:{" "}
                {request.reason}
              </p>

              <p>
                Status:{" "}
                {request.status}
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  className="border rounded px-4 py-2"
                  onClick={() =>
                    handleApprove(
                      request._id
                    )
                  }
                >
                  Approve
                </button>

                <button
                  className="border rounded px-4 py-2"
                  onClick={() =>
                    handleReject(
                      request._id
                    )
                  }
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}