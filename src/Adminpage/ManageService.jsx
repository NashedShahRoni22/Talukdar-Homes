import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoaderPage from "../Adminpage/LoaderPage";

const ManageService = () => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  //get services
  useEffect(() => {
    setLoading(true);
    fetch("https://api.talukderhomes.com.au/api/products")
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
        `https://api.talukderhomes.com.au/api/products/delete/${id}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (data.status === true) {
        const updatedServices = services.filter((s) => s.id !== id);
        setServices(updatedServices);
        window.alert("Product deleted successfully!");
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
            Total Products: {services?.length}
          </h5>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-10">
            {services?.map((s, i) => (
              <div
                key={i}
                className="shadow hover:shadow-orange-600  justify-between items-center rounded-xl duration-300 ease-linear"
              >
                <div>
                  <img src={s?.image} alt="" className="h-[250px] w-full" />
                </div>
                <div className="p-2.5">
                  <p className="font-semibold text-center">{s?.title}</p>
                  <div className="flex gap-2 justify-center mt-2.5">
                    <Link
                      to={`/admin/update_service/${s?.slug}`}
                      className="bg-orange-600 text-white px-2 py-1 shadow rounded"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => deleteService(s?.id)}
                      className="bg-red-400 text-white px-2 py-1 shadow rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default ManageService;
