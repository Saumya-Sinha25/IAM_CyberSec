"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function MyRequestsPage() {
  const [requests, setRequests] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res =
          await api.get(
            "/requests/my"
          );

        console.log(
          "My Requests:",
          res.data
        );

        setRequests(
          res.data.requests
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
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
      <h1 className="text-3xl font-bold mb-6">
        My Requests
      </h1>

      {requests.length === 0 ? (
        <p>
          No requests found.
        </p>
      ) : (
        <div className="space-y-4">
          {requests.map(
            (request) => (
              <div
                key={request._id}
                className="border rounded-lg p-4"
              >
                <h2 className="text-xl font-bold">
                  {
                    request
                      .resourceId
                      ?.name
                  }
                </h2>

                <p className="mt-2">
                  Status:
                  {" "}
                  <strong>
                    {
                      request
                        .status
                    }
                  </strong>
                </p>

                <p>
                  Reason:
                  {" "}
                  {
                    request
                      .reason
                  }
                </p>

                <p>
                  Created:
                  {" "}
                  {new Date(
                    request.createdAt
                  ).toLocaleString()}
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}