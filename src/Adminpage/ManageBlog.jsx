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
    <section className="mt-5 md:mt-0 md:p-5 lg:p-10">
      {loading ? (
        <LoaderPage />
      ) : (
        <>
          <h5 className="px-5 py-2.5 text-xl font-semibold text-orange-500">
            Total Blogs: {blogs?.length || 0}
          </h5>
          {blogs && blogs.length > 0 ? (
            <table className="w-full overflow-x-auto">
              <thead className="bg-orange-50">
                <tr>
                  <th className="px-2.5 py-2">Title</th>
                  <th className="px-2.5 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <BlogRow key={blog.id} blog={blog} setBlogs={setBlogs} />
                ))}
              </tbody>
            </table>
          ) : (
            <p className="px-5 text-xl font-semibold">No Blogs added yet!</p>
          )}
        </>
      )}
    </section>
  );
};

export default ManageBlog;
