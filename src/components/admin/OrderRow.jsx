import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { formatPrice } from "../../utils/formatPrice";
import OrderDetailsModal from "./OrderDetailsModal";
import { AiFillEye, AiOutlineEye } from "react-icons/ai";
import { LuCheck, LuEye, LuTrash } from "react-icons/lu";
import { IoMdStopwatch } from "react-icons/io";

export default function OrderRow({
  order,
  item,
  orderIndex,
  itemIndex,
  itemCount,
}) {
  const [showModal, setShowModal] = useState(false);

  // total price of individual order in cents
  const totalPriceInCents = order.reference_items.reduce((acc, item) => {
    const priceCents = Math.round(parseFloat(item.price) * 100);
    const qty = parseInt(item.quantity);
    return acc + priceCents * qty;
  }, 0);

  const totalPrice = (totalPriceInCents / 100).toFixed(2);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      <tr
        className={`${orderIndex % 2 === 0 ? "bg-gray-50" : "bg-white"} ${itemIndex === 0 && "border-t border-gray-200"}`}
      >
        {itemIndex === 0 && (
          <>
            <td className="p-3 text-sm text-gray-700" rowSpan={itemCount}>
              #{order?.invoice}
            </td>
            <td className="p-3 text-sm text-gray-700" rowSpan={itemCount}>
              {formatDate(order?.created_at)}
            </td>
            <td className="p-3 text-sm text-gray-700" rowSpan={itemCount}>
              {order?.client?.email}
            </td>

            {/* Payment Status - Consistent with Financial UI Patterns */}
            <td rowSpan={itemCount} className="p-3 text-sm">
              <span
                className={`inline-flex items-center gap-0.5 px-3 py-1 rounded-md text-xs font-medium ${
                  order?.gateway?.status === 1
                    ? "bg-green-50 text-green-700 border border-green-100"
                    : "bg-amber-50 text-amber-700 border border-amber-100"
                }`}
              >
                {order?.gateway?.status === 1 ? (
                  <>
                    <LuCheck className="shrink-0 text-sm" /> Paid via{" "}
                    {order?.gateway?.title}
                  </>
                ) : (
                  <>
                    <IoMdStopwatch className="text-base shrink-0" /> Unpaid (
                    {order?.gateway?.title})
                  </>
                )}
              </span>
            </td>

            <td
              rowSpan={itemCount}
              className="p-3 text-sm font-medium text-gray-900"
            >
              ${formatPrice(totalPrice)}
            </td>

            {/* Order Status - Distinct from Payment Status */}
            <td rowSpan={itemCount} className="p-3 text-sm">
              <span
                className={`inline-flex items-center min-w-[95px] text-center gap-1 justify-center px-3 py-1 rounded-md text-xs font-medium ${
                  order?.confirmed_at !== null
                    ? "bg-blue-50 text-blue-700 border border-blue-100"
                    : "bg-gray-100 text-gray-700 border border-gray-200"
                }`}
              >
                {order?.confirmed_at !== null ? (
                  <>
                    <LuCheck className="shrink-0 text-sm" /> Confirmed
                  </>
                ) : (
                  <>
                    <IoMdStopwatch className="shrink-0 text-base" /> Pending
                  </>
                )}
              </span>
            </td>

            {/* Action Buttons - Optimized for Quick Scanning */}
            <td rowSpan={itemCount} className="p-3 text-sm">
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                  title="View details"
                >
                  <LuEye className="w-4 h-4" />
                  View
                </button>
                <button
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md border border-red-100 bg-white text-red-400 hover:bg-red-50/50 transition-colors"
                  title="Delete order"
                >
                  <LuTrash className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </td>
          </>
        )}
      </tr>

      <OrderDetailsModal
        open={showModal}
        handleClose={toggleModal}
        order={order}
      />
    </>
  );
}
