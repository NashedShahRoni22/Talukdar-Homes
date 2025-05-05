import { useEffect, useState } from "react";
import LoaderPage from "../../Adminpage/LoaderPage";
import { Link } from "react-router-dom";

export default function Blogs() {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setLoading(true);

    const getBlogs = async () => {
      try {
        const res = await fetch("https://api.talukderhomes.com.au/api/blogs");
        const data = await res.json();
        if (data?.status === true) {
          setBlogs(data?.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  return (
    <section className="px-5 py-10 md:container md:mx-auto md:px-0 md:py-20">
      {loading ? (
        <LoaderPage />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="rounded border border-gray-200 p-2">
              <div className="aspect-[4/3] md:aspect-video">
                <img
                  src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*I46oiZDR8itT_6xUZAe0gw.jpeg"
                  alt="Blog Post"
                  className="h-full w-full rounded object-cover"
                />
              </div>
              <Link
                to={blog.slug}
                className="text-lg font-medium transition-all duration-200 ease-in-out hover:text-primary"
              >
                {blog.title}
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
