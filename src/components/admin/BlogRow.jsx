import { useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";

export default function BlogRow({ blog, setBlogs }) {
  const { id, image, title, slug } = blog;
  const [loading, setLoading] = useState(false);

  // Delete Blog
  const handleDelete = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.talukderhomes.com.au/api/blogs/delete/${id}`,
        {
          method: "GET",
        },
      );

      const data = await response.json();

      if (data.status === true) {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
        toast.success("Blog deleted successfully!");
      }
    } catch (error) {
      console.error("Error:", error);
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
              src={image}
              alt={`image of ${title}`}
              loading="lazy"
            />
          </Link>
          <p>{title}</p>
        </div>
      </td>
      <td className="px-2.5 py-2 text-center">
        <div className="inline-flex items-center justify-center gap-2.5">
          <Link
            className="w-full"
            to={`/admin/update-blog/${slug}/${id}`}
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
