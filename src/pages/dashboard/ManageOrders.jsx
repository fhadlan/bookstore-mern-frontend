import React from "react";
import {
  useManageOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../redux/features/order/orderApiAdmin";
import DetailOrder from "../../components/DetailOrder";
import { useOutletContext } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

function ManageOrders() {
  const { changeTitle } = useOutletContext();
  const [isDetailsOpen, setDetailsOpen] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchStatus, setSearchStatus] = React.useState("");
  const [searchOrderId, setSearchOrderId] = React.useState("");
  const { register, watch } = useForm();

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-orange-100 text-orange-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const searchId = watch("orderId") || "";

  //fetch orders
  const {
    data: { orders, totalPages } = [],
    isLoading,
    isError,
  } = useManageOrdersQuery({
    page: currentPage,
    status: searchStatus,
    id: searchOrderId,
  });

  React.useEffect(() => {
    changeTitle("Manage Orders");
    //console.log(orders);
  }, [orders]);

  // update order status
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleUpdateOrderStatus = async (_id, status) => {
    try {
      Swal.fire({
        title: "Update status?",
        showDenyButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await updateOrderStatus({ id: _id, status });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

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
      <div className="flex items-center gap-2">
        <label htmlFor="status" className="font-bold">
          Filter by Status
        </label>
        <select
          id="status"
          className="rounded-md border border-slate-300 px-2 py-1"
          value={searchStatus}
          onChange={(e) => setSearchStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <label htmlFor="orderId" className="font-bold">
          Search by Order Number
        </label>
        <input
          id="orderId"
          name="orderId"
          className="rounded-md border border-slate-300 px-2 py-1"
          type="text"
          placeholder="Enter Order Number (min 24 characters)"
          {...register("orderId", {
            minLength: {
              value: 24,
              message: "Correct order number have at least 24 characters",
            },
          })}
        />
        <button
          className="bg-primary rounded-md px-2 py-1 text-white disabled:bg-gray-400"
          onClick={() => setSearchOrderId(searchId)}
          disabled={searchId.length < 24 && searchId.length > 0}
        >
          Search
        </button>
      </div>
      <table className="table-auto border-collapse border border-slate-300 shadow-2xl">
        <thead>
          <tr className="bg-slate-300">
            <th className="px-4 py-2">Order Number</th>
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
                <select
                  id="status"
                  className={`rounded-md border border-slate-300 px-2 py-1 ${statusColors[order.status]}`}
                  value={order.status}
                  onChange={(e) =>
                    handleUpdateOrderStatus(order._id, e.target.value)
                  }
                >
                  <option
                    value="pending"
                    disabled={
                      order.status === "shipped" || order.status === "delivered"
                    }
                  >
                    Pending
                  </option>
                  <option
                    value="processing"
                    disabled={
                      order.status === "shipped" || order.status === "delivered"
                    }
                  >
                    Processing
                  </option>
                  <option
                    value="shipped"
                    disabled={order.status === "delivered"}
                  >
                    Shipped
                  </option>
                  <option
                    value="delivered"
                    disabled={order.status === "cancelled"}
                  >
                    Delivered
                  </option>
                  <option value="cancelled">Cancelled</option>
                </select>
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
