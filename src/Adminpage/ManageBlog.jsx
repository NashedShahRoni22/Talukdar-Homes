import { useEffect, useState } from "react";
import LoaderPage from "../Adminpage/LoaderPage";
import BlogRow from "../components/admin/BlogRow";

const ManageBlog = () => {
  const [loading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);

  //get blogs
  useEffect(() => {
    setLoading(true);
    fetch("https://api.talukderhomes.com.au/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          setBlogs(data.data);
          setLoading(false);
        }
      });
  }, []);

  return (
    <section className="p-5">
      {loading ? (
        <LoaderPage />
      ) : (
        <>
          <h1 className="text-3xl font-bold text-gray-800">Manage Blogs</h1>
          {blogs && blogs.length > 0 ? (
            <div className="mt-4 overflow-x-auto rounded border border-gray-200 p-6">
              <table className="w-full border-collapse">
                <thead className="border-b border-gray-200 text-gray-900">
                  <tr>
                    <th className="px-2.5 py-2 text-left">Title</th>
                    <th className="px-2.5 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog, i) => (
                    <BlogRow
                      key={blog.id}
                      index={i}
                      blog={blog}
                      setBlogs={setBlogs}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="px-5 text-xl font-semibold">No Blogs added yet!</p>
          )}
        </>
      )}
    </section>
  );
};

export default ManageBlog;
