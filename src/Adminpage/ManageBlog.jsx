import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoaderPage from "../Adminpage/LoaderPage";

const ManageBlog = () => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  //get services
  useEffect(() => {
    setLoading(true);
    fetch("https://api.smartmovefinancial.com.au/api/services")
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
        }
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
      setLoader(false);
    }
  };
  return (
    <section className="mt-5 md:mt-0 md:p-5 lg:p-10">
      {loading ? (
        <LoaderPage />
      ) : (
        <>
          <h5 className="p-5 text-xl font-semibold text-blue">
            Total Blogs: {services?.length}
          </h5>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
            {services?.map((s, i) => (
              <div
                key={i}
                className="shadow hover:shadow-blue-500  flex  flex-col gap-5  justify-between items-center p-10 rounded-3xl duration-300 ease-linear"
              >
                <div>
                  <img src={s?.icon} alt="" className="size-12 md:size-18" />
                </div>
                <p className="text-xl md:text-2xl font-bold text-center">
                  {s?.title}
                </p>
                <p className="md:text-xl text-center">{s?.slogan}</p>
                <div className="flex gap-2">
                  <Link
                    to={`/admin/update_service/${s?.slug}/${s?.id}`}
                    className="bg-blue-500 text-white px-2.5 py-1.5 shadow rounded"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => deleteService(s?.id)}
                    className="bg-red-400 text-white px-2.5 py-1.5 shadow rounded"
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
