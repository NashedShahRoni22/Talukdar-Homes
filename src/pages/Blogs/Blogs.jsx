import { useEffect, useState } from "react";
import LoaderPage from "../../Adminpage/LoaderPage";
import { Link } from "react-router-dom";
import { IoBookOutline } from "react-icons/io5";

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

  if (!blogs?.length > 0) {
    return (
      <div className="mx-5 flex min-h-[calc(100vh-80px)] flex-col justify-center py-5 text-center text-gray-600 md:container md:mx-auto md:py-10">
        <IoBookOutline className="mx-auto text-[40px] text-[#ff5722]" />
        <p className="mt-4 text-xl font-semibold">No blogs found</p>
        <p className="mt-2 text-sm">
          Looks like there&apos;s nothing here right now.
        </p>
      </div>
    );
  }

  return (
    <section className="px-5 py-10 md:container md:mx-auto md:px-0 md:py-20">
      {loading ? (
        <LoaderPage />
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="flex flex-col rounded border border-gray-200 p-2"
            >
              <div>
                <Link
                  to={`/blogs/${blog.slug}`}
                  className="block aspect-[4/3] md:aspect-video"
                >
                  <img
                    src={blog.image}
                    alt="Blog Post"
                    className="h-full w-full rounded object-cover"
                  />
                </Link>
              </div>

              <Link
                to={`/blogs/${blog.slug}`}
                className="my-3 inline-block w-fit text-lg font-medium transition-all duration-200 ease-in-out hover:text-primary"
              >
                {blog.title}
              </Link>

              <button className="rounded bg-primary py-1.5 text-white transition-all duration-200 hover:bg-primary-hover">
                <Link to={`/blogs/${blog.slug}`} className="text-sm">
                  Read More
                </Link>
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
