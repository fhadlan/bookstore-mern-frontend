import React from "react";
import {
  useFetchUserOrdersQuery,
  useCancelOrderMutation,
} from "../../redux/features/order/orderApi";
import { auth } from "../../firebase/firebase.config";
import StatusBadge from "../../components/StatusBadge";
import Swal from "sweetalert2";
import DetailOrder from "../../components/DetailOrder";

function Orders() {
  const { uid } = auth.currentUser;
  const [isDetailsOpen, setDetailsOpen] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  const {
    data: { orders, totalPages } = [],
    isLoading,
    isError,
  } = useFetchUserOrdersQuery({ id: uid, page: currentPage });

  const [cancelOrder] = useCancelOrderMutation();

  // console.log(orders);

  const handleCancelOrder = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel this order",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await cancelOrder(_id).then(() => {
          Swal.fire({
            icon: "success",
            title: "Order cancelled",
            showConfirmButton: false,
            timer: 1500,
          });
        });
      }
    });
  };

  const handleDetail = (order) => {};

  if (isLoading) {
    return <div className="loader"></div>;
  } else if (isError) {
    return <div>Error</div>;
  }

  return (
    // Render orders here when not loading or error
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
                {order.items.map((item) => (
                  <div key={item._id}>
                    {item.productId.title}(x{item.quantity})
                  </div>
                ))}
              </td>
              <td className="border border-slate-300 px-4 py-2">
                ${order.finalAmount}
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
export default Orders;
