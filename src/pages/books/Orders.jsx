import React from "react";
import { useFetchUserOrdersQuery } from "../../redux/features/order/orderApi";
import { auth } from "../../firebase/firebase.config";

function Orders() {
  const { uid } = auth.currentUser;
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useFetchUserOrdersQuery(uid);

  return (
    <div>
      {isLoading ? (
        <div className="loader"></div>
      ) : isError ? (
        <div>Error</div>
      ) : (
        // Render orders here when not loading or error
        orders.map((order) => (
          <div
            key={order._id}
            className="mb-4 border border-gray-300 bg-gray-100 p-4"
          >
            <h3>
              <strong>Order ID:</strong> {order._id}
            </h3>
            <p>Name: {order.name}</p>
            <p>Email: {order.email}</p>
            <p>Phone: {order.phone}</p>

            <p>
              Date of Order:{" "}
              {new Date(order.createdAt).toLocaleString("default", {
                day: "numeric",
                year: "numeric",
                month: "long",
              })}
            </p>
            <ul className="list-disc">
              <strong>Products:</strong>{" "}
              {order.productsId.map((productId, index) => (
                <li key={index} className="block pl-4">
                  {productId["title"]}{" "}
                  <span className="float-right">{productId["newPrice"]}</span>
                </li>
              ))}
            </ul>
            <p>
              <strong>Address:</strong> {order.address.street}{" "}
              {order.address.city} {order.address.state} {order.address.zipcode}{" "}
              {order.address.country}
            </p>
            <p>
              <strong>Total Price:</strong> {order.totalPrice}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
