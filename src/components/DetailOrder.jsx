import React from "react";
import StatusBadge from "./StatusBadge";

function DetailOrder({ order }) {
  //console.log(order);
  return (
    <div className="fixed top-1/2 left-1/2 max-w-md -translate-x-1/2 -translate-y-1/2 transform rounded bg-white p-4">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl font-bold">Detail Order</h1>
        <p>Order ID: {order._id}</p>
        <p>Name: {order.name}</p>
        <p>Email: {order.email}</p>
        <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>
        <p>
          Order Status: <StatusBadge status={order.status} />
        </p>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Book Title</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="px-4 py-2">{item.productId.title}</td>
                <td className="px-4 py-2">
                  {item.priceAtOrder.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
                <td className="px-4 py-2">{item.quantity}</td>
                <td className="px-4 py-2">
                  {item.total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
              </tr>
            ))}
            <tr className="border-t-2 font-bold">
              <td className="px-4 py-2">Total Price</td>
              <td className="px-4 py-2 text-right" colSpan={3}>
                ${order.finalAmount}
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          Address: {order.address["street"]},&nbsp;{order.address["city"]}
          ,&nbsp;
          {order.address["zipcode"]},&nbsp;{order.address["state"]},&nbsp;
          {order.address["country"]}
        </p>
      </div>
    </div>
  );
}

export default DetailOrder;
