import { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { formatPrice } from "../../utils/formatPrice";
import OrderDetailsModal from "./OrderDetailsModal";

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
        onClick={toggleModal}
        className={`cursor-pointer ${orderIndex % 2 === 0 && "bg-gray-50"} ${itemIndex === 0 && "border-t border-gray-200"}`}
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
          </>
        )}

        <td className="p-3 text-gray-700">
          <p className="text-sm font-medium text-gray-900">{item.title}</p>
          <p className="mt-1 text-xs">
            <span className="font-semibold">Quantity:</span> {item.quantity}
          </p>
          {item.attribute && (
            <p className="mt-1 text-xs">
              <span className="font-semibold">Variant:</span> {item.attribute}
            </p>
          )}
        </td>

        {itemIndex === 0 && (
          <>
            <td rowSpan={itemCount} className="p-3 text-sm text-gray-700">
              {order?.gateway?.title}
            </td>
            <td rowSpan={itemCount} className="p-3 text-sm text-gray-700">
              ${formatPrice(totalPrice)}
            </td>
            <td rowSpan={itemCount} className="p-3 text-sm text-gray-700">
              {order?.gateway?.status === "1" ? "Paid" : "Unpaid"}
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
