import React from "react";
import { useManageOrdersQuery } from "../../redux/features/order/orderApiAdmin";
import StatusBadge from "../../components/StatusBadge";
import DetailOrder from "../../components/DetailOrder";

function ManageOrders() {
  const [isDetailsOpen, setDetailsOpen] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  const {
    data: { orders, totalPages } = [],
    isLoading,
    isError,
  } = useManageOrdersQuery({ page: currentPage });

  React.useEffect(() => {
    console.log(orders);
  }, [orders]);

  if (isLoading) {
    return <div className="loader"></div>;
  } else if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="flex max-h-full flex-col gap-4">
      {isDetailsOpen && (
        <div
          onClick={() => setDetailsOpen(null)}
          className="fixed inset-0 z-30 bg-black/50"
        >
          <DetailOrder order={isDetailsOpen} />
        </div>
      )}
      <table className="table-auto border-collapse border border-slate-300 shadow-2xl">
        <thead>
          <tr className="bg-slate-300">
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Date of Order</th>
            <th className="px-4 py-2">Item Ordered</th>
            <th className="px-4 py-2">Total Price</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border border-slate-300 px-4 py-2">{order._id}</td>
              <td className="border border-slate-300 px-4 py-2">
                {new Date(order.createdAt).toLocaleString("default", {
                  day: "numeric",
                  year: "numeric",
                  month: "long",
                })}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                {order.productsId.map((item) => (
                  <div key={item._id}>{item.title}(x1)</div>
                ))}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                ${order.totalPrice}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                <StatusBadge status={order.status} />
              </td>
              <td className="border border-slate-300 px-4 py-2">
                <div className="flex gap-2 text-sm">
                  <button
                    onClick={() => setDetailsOpen(order)}
                    className="w-20 rounded bg-blue-500 px-2 py-1 text-white"
                  >
                    Details
                  </button>
                  {order.status === "pending" && (
                    <button
                      onClick={() => handleCancelOrder(order._id)}
                      className="w-20 rounded bg-red-500 px-2 py-1 font-medium text-white"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex items-center justify-center gap-2">
        <button
          onClick={() => setCurrentPage(1)}
          className="rounded-lg bg-gray-200 px-4 py-2"
        >
          First
        </button>
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          className="rounded-lg bg-gray-200 px-4 py-2 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className="flex gap-2">
          {[
            currentPage - 2,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            currentPage + 2,
          ]
            .filter((page) => page > 0 && page <= totalPages)
            .map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`${
                  currentPage === page ? "bg-blue-500 text-white" : "bg-white"
                } rounded-lg px-4 py-2 hover:bg-blue-400 hover:text-white`}
              >
                {page}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ManageOrders;
