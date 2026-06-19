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


export default function MyRequestsPage() {
  const [requests, setRequests] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await api.get("/requests/my");

        console.log("My Requests:", res.data);

        setRequests(res.data.requests);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  if (loading) {
    return <div className="p-10">Loading...</div>;
  }

  return (
    <Table>
  <TableHeader>
    <TableRow>
      <TableHead>Resource</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Reason</TableHead>
      <TableHead>Created</TableHead>
    </TableRow>
  </TableHeader>

  <TableBody>
    {requests.map((request) => (
      <TableRow key={request._id}>
        <TableCell>
          {request.resourceId?.name}
        </TableCell>

        <TableCell>
          <StatusBadge
            status={request.status}
          />
        </TableCell>

        <TableCell>
          {request.reason}
        </TableCell>

        <TableCell>
          {new Date(
            request.createdAt
          ).toLocaleDateString()}
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
  );
}
