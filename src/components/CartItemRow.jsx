export default function CartItemRow({
  item,
  handleUpdateQuantity,
  handleCartDelete,
}) {
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      handleUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <tr className="divide-x divide-white">
      <td className="px-1.5 py-2 md:px-3">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-16 w-16 object-cover"
        />
      </td>
      <td className="px-1.5 py-2 md:px-3">{item.title}</td>
      <td className="px-1.5 py-2 md:px-3">
        ${parseFloat(item.price).toFixed(2)}
      </td>
      <td className="px-1.5 py-2 md:px-3">
        <input
          type="number"
          value={item.quantity}
          min="1"
          onChange={handleQuantityChange}
          className="w-20 border border-gray-300 rounded-md px-2 py-1 text-center"
        />
      </td>
      <td className="px-1.5 py-2 md:px-3">
        <button
          onClick={() => handleCartDelete(item.id)}
          className="text-red-500 hover:underline"
        >
          Remove
        </button>
      </td>
    </tr>
  );
}
