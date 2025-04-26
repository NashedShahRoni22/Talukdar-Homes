import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoaderPage from "../Adminpage/LoaderPage";

const ManageBlog = () => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  //get services
  useEffect(() => {
    setLoading(true);
    fetch("https://api.talukderhomes.com.au/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          setServices(data.data);
          setLoading(false);
        }
      });
  }, []);
  // delete service
  const deleteService = async (id) => {
    try {
      const response = await fetch(
        `https://api.smartmovefinancial.com.au/api/service/delete/${id}`,
        {
          method: "GET",
        },
      );
      const data = await response.json();
      if (data.status === true) {
        const updatedServices = services.filter((s) => s.id !== id);
        setServices(updatedServices);
        window.alert("Service deleted successfully!");
      }

      // Handle response data as needed
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <section className="mt-5 md:mt-0 md:p-5 lg:p-10">
      {loading ? (
        <LoaderPage />
      ) : (
        <>
          <h5 className="text-blue p-5 text-xl font-semibold">
            Total Blogs: {services?.length}
          </h5>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-4">
            {services?.map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-between gap-5 rounded-3xl p-10 shadow duration-300 ease-linear hover:shadow-blue-500"
              >
                <div>
                  <img src={s?.image} alt="" className="md:size-18 size-12" />
                </div>
                <p className="text-center text-xl font-bold md:text-2xl">
                  {s?.title}
                </p>
                <p className="text-center md:text-xl">{s?.slogan}</p>
                <div className="flex gap-2">
                  <Link
                    to={`/admin/update_service/${s?.slug}/${s?.id}`}
                    className="rounded bg-blue-500 px-2.5 py-1.5 text-white shadow"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => deleteService(s?.id)}
                    className="rounded bg-red-400 px-2.5 py-1.5 text-white shadow"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default ManageBlog;
