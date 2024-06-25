import React, { useEffect, useState } from "react";
import LoaderPage from "../../../Adminpage/LoaderPage";
import { Link } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";

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
          <h5 className="text-xl md:text-3xl font-semibold text-blue">
            Material Products: {services?.length}
          </h5>
          <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-10 min-h-screen">
            {services?.map((s, i) => (
              <div
                key={i}
                className="shadow hover:shadow-orange-600  justify-between items-center rounded duration-300 ease-linear h-fit group"
              >
                <div>
                  <img
                    src={s?.product_image[0]?.image}
                    alt=""
                    className="h-[150px] md:h-[250px] w-full"
                    loading="lazy"
                  />
                </div>
                <div className="p-2.5 flex flex-col gap-2.5">
                  <p className="font-semibold text-center">{s?.title}</p>
                  <Link
                    to={`/service_details/${s?.slug}`}
                    className="w-full py-1.5 shadow rounded flex items-center justify-center gap-2 border border-primary text-primary group-hover:bg-primary group-hover:text-white duration-300 ease-linear"
                  >
                    <BsEyeFill className="text-xl"/> View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
