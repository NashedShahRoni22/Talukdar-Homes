import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoaderPage from "../../Adminpage/LoaderPage";

export default function BlogDetails() {
  const { slug } = useParams();
  const [loader, setLoader] = useState(false);
  const [blog, setBlog] = useState({});

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()} ${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`;
  };

  //get service
  useEffect(() => {
    setLoader(true);
    fetch(`https://api.talukderhomes.com.au/api/blogs/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          setBlog(data?.data);
        }
        setLoader(false);
      });
  }, [slug]);

  if (loader) {
    return <LoaderPage />;
  }

  console.log(blog);

  return (
    <section className="mx-5 py-10 md:container md:mx-auto md:py-20">
      <div className="mx-auto max-w-4xl">
        {/* Blog Title */}
        <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
          {blog.title}
        </h1>

        {/* Blog Meta (Date) */}
        <div className="mb-6 text-gray-600">
          <span>Published on: {formatDate(blog.created_at)}</span>
        </div>

        {/* Featured Image */}
        <div className="mb-8 overflow-hidden rounded-lg">
          <img
            src={blog.image}
            alt={blog.title}
            className="h-auto max-h-96 w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Blog Content */}
        <div>
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>

        {/* Back Button */}
        <div className="mt-10">
          <button
            onClick={() => window.history.back()}
            className="hover:bg-primary-dark rounded bg-primary px-4 py-2 text-white"
          >
            ← Back to Blogs
          </button>
        </div>
      </div>
    </section>
  );
}
