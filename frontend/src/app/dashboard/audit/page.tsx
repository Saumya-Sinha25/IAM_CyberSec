"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AuditPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get("/audit");

        console.log("Audit Logs:", res.data);

        setLogs(res.data.logs);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) {
    return <div className="p-10">Loading Audit Logs...</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Actor</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Action</TableHead>
          <TableHead>Entity</TableHead>
          <TableHead>Timestamp</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {logs.map((log) => (
          <TableRow key={log._id}>
            <TableCell>{log.actor?.name}</TableCell>

            <TableCell>{log.actor?.role}</TableCell>

            <TableCell>{log.action}</TableCell>

            <TableCell>{log.entityType}</TableCell>

            <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
