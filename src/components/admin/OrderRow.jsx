import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { formatPrice } from "../../utils/formatPrice";

export default function OrderRow({ order, item, itemIndex, itemCount }) {
  const navigate = useNavigate();

  // total price of individual order in cents
  const totalPriceInCents = order.reference_items.reduce((acc, item) => {
    const priceCents = Math.round(parseFloat(item.price) * 100);
    const qty = parseInt(item.quantity);
    return acc + priceCents * qty;
  }, 0);

  const totalPrice = (totalPriceInCents / 100).toFixed(2);

  return (
    <tr
      onClick={() => navigate(`/admin/orders/${order?.invoice}`)}
      className="relative cursor-pointer border-t border-gray-200 text-sm transition-all duration-200 ease-in-out hover:bg-gray-50"
    >
      {itemIndex === 0 && (
        <>
          <td className="py-2" rowSpan={itemCount}>
            #{order?.invoice}
          </td>
          <td className="py-2" rowSpan={itemCount}>
            {formatDate(order?.created_at)}
          </td>
          <td className="py-2" rowSpan={itemCount}>
            {order?.client?.email}
          </td>
        </>
      )}

      <td className="py-2">
        <p>
          {item?.title} {item?.attribute && `- Variant: ${item?.attribute}`}
        </p>
      </td>

      {itemIndex === 0 && (
        <>
          <td rowSpan={itemCount}>{order?.gateway?.title}</td>
          <td rowSpan={itemCount}>${formatPrice(totalPrice)}</td>
          <td rowSpan={itemCount}>
            {order?.gateway?.status === "1" ? "Paid" : "Unpaid"}
          </td>
        </>
      )}
    </tr>
  );
}
