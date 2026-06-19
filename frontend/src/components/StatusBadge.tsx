type Props = {
  status: string;
};

export default function StatusBadge({
  status,
}: Props) {
  const styles: Record<string, string> = {
    PENDING_MANAGER:
      "bg-yellow-100 text-yellow-800",

    PENDING_ADMIN:
      "bg-orange-100 text-orange-800",

    APPROVED:
      "bg-green-100 text-green-800",

    REJECTED:
      "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        styles[status] ||
        "bg-gray-100 text-gray-700"
      }`}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}