import React, { useEffect, useState } from "react";
import LoaderPage from "../../../Adminpage/LoaderPage";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";

export default function Material() {
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
  return (
    <section className="mx-5 md:container md:mx-auto my-5 md:my-10">
      {loading ? (
        <LoaderPage />
      ) : (
        <>
          <div className="mt-5 grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-10 min-h-screen">
            {services?.map((s, i) => (
              <Link
                to={`/service_details/${s?.slug}`}
                key={i}
                className="shadow-lg hover:shadow-primary rounded border duration-300 ease-linear h-fit group"
              >
                <div>
                  <img
                    src={s?.product_image[0]?.image}
                    alt=""
                    className="h-[200px] md:h-[250px] w-full rounded-t"
                    loading="lazy"
                  />
                </div>
                <div className="p-4 flex justify-between items-end">
                  <div>
                    <p className="text-lg">{s?.title}</p>
                    <p className="text-xl text-primary">
                      $150 AUD{" "}
                      <span className="text-sm line-through text-gray-600">
                        $100
                      </span>
                    </p>
                  </div>
                  <button className="p-4 shadow rounded flex items-center justify-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white duration-300 ease-linear">
                    <FaCartPlus className="text-xl" />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
