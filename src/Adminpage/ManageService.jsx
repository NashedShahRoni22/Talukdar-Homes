import { useEffect, useState } from "react";
import LoaderPage from "../Adminpage/LoaderPage";
import ServiceRow from "../components/admin/ServiceRow";

const ManageService = () => {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);

  //get services
  useEffect(() => {
    setLoading(true);
    fetch("https://api.talukderhomes.com.au/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          setServices(data.data);
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
            Total Services: {services?.length || 0}
          </h5>
          {services && services.length > 0 ? (
            <table className="w-full overflow-x-auto">
              <thead className="bg-orange-50">
                <tr>
                  <th className="px-2.5 py-2">Title</th>
                  <th className="px-2.5 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <ServiceRow
                    key={service.id}
                    service={service}
                    setServices={setServices}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <p className="px-5 text-xl font-semibold">No Services added yet!</p>
          )}
        </>
      )}
    </section>
  );
};

export default ManageService;
