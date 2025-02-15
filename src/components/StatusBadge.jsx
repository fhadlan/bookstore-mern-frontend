import React from "react";

function StatusBadge({ status }) {
  status = status.charAt(0).toUpperCase() + status.slice(1);
  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Processing: "bg-blue-100 text-blue-800",
    Shipped: "bg-orange-100 text-orange-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`rounded px-2 py-1 text-sm font-medium ${statusColors[status]}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
