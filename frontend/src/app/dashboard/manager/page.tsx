"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import StatusBadge from "@/components/StatusBadge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ManagerPage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await api.get("/manager/requests");

      console.log("Manager Requests:", res.data);

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

  const handleApprove = async (requestId: string) => {
    try {
      await api.put(`/manager/approve/${requestId}`);

      alert("Request Approved");

      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      await api.put(`/manager/reject/${requestId}`);

      alert("Request Rejected");

      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Resource</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {requests.map((request) => (
          <TableRow key={request._id}>
            <TableCell>{request.requestedBy?.name}</TableCell>

            <TableCell>{request.resourceId?.name}</TableCell>

            <TableCell>
              <StatusBadge status={request.status} />
            </TableCell>

            <TableCell>
              <div className="flex gap-2">
                <button
                  className="border px-3 py-1 rounded"
                  onClick={() => handleApprove(request._id)}
                >
                  Approve
                </button>

                <button
                  className="border px-3 py-1 rounded"
                  onClick={() => handleReject(request._id)}
                >
                  Reject
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
