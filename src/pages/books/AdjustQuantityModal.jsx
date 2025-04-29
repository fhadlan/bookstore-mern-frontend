import React from "react";
import { FaWindowClose } from "react-icons/fa";
import { adjustQuantity } from "../../redux/features/cart/cartSlice";

function AdjustQuantityModal({ _id, stock, closeModal, dispatch }) {
  const handleOnChange = (e) => {
    dispatch(adjustQuantity({ _id, quantity: e.target.value }));
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative mx-auto w-full max-w-xs rounded bg-white p-6">
        <FaWindowClose
          onClick={closeModal}
          className="absolute top-2 right-2 cursor-pointer text-2xl text-red-500"
        />
        <label className="px-2 py-1">
          Quantity:
          <select
            className="ml-1 rounded-md px-2 py-1"
            name="quantity"
            onChange={(e) => handleOnChange(e)}
          >
            {[...Array(stock).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

export default AdjustQuantityModal;
