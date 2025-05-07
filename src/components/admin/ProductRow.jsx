import { useState } from "react";
import toast from "react-hot-toast";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ProductRow({ product, setProducts }) {
  const {
    id,
    slug,
    thumbnail,
    title,
    price,
    discount,
    shipping_charge,
    quantity,
    category,
  } = product;
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `https://api.talukderhomes.com.au/api/products/delete/${id}`,
      );
      const data = await res.json();
      if (data.status === true) {
        toast.success("Product deleted successfully");
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id),
        );
      }
    } catch (error) {
      console.error(`product delete: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr className="border-b border-gray-200 last:border-b-0">
      <td className="px-2.5 py-2">
        <div className="flex items-center gap-2.5">
          <Link>
            <img
              className="mx-auto size-11 rounded object-contain"
              src={thumbnail}
              alt={`image of ${title}`}
              loading="lazy"
            />
          </Link>
          <p>{title}</p>
        </div>
      </td>
      <td className="px-2.5 py-2 text-center">${price}</td>
      <td className="px-2.5 py-2 text-center">${discount}</td>
      <td className="px-2.5 py-2 text-center">${shipping_charge}</td>
      <td className="px-2.5 py-2 text-center">{quantity}</td>
      <td className="px-2.5 py-2 text-center">{category?.title}</td>
      <td className="px-2.5 py-2 text-center">
        <div className="inline-flex items-center justify-center gap-2.5">
          <Link
            className="w-full"
            to={`/admin/update-product/${slug}`}
            disabled={loading}
          >
            <FiEdit
              className={`transition-all duration-200 ease-in-out hover:text-green-500 ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
            />
          </Link>

          <button className="w-full" onClick={handleDelete} disabled={loading}>
            <MdDeleteOutline
              className={`text-xl transition-all duration-200 ease-in-out hover:text-orange-500 ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
            />
          </button>
        </div>
      </td>
    </tr>
  );
}
