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
    <section className="p-5">
      {loading ? (
        <LoaderPage />
      ) : (
        <>
          <h1 className="text-3xl font-bold text-gray-800">Manage Services</h1>
          {services && services.length > 0 ? (
            <div className="mt-4 overflow-x-auto rounded border border-gray-200 p-6">
              <table className="w-full border-collapse">
                <thead className="border-b border-gray-200 text-gray-900">
                  <tr>
                    <th className="px-2.5 py-2 text-left">Title</th>
                    <th className="px-2.5 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, i) => (
                    <ServiceRow
                      key={service.id}
                      index={i}
                      service={service}
                      setServices={setServices}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="px-5 text-xl font-semibold">No Services added yet!</p>
          )}
        </>
      )}
    </section>
  );
};

export default ManageService;
