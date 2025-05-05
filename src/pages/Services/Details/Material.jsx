import { useEffect, useState, useContext } from "react";
import LoaderPage from "../../../Adminpage/LoaderPage";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { CartContext } from "../../../Providers/CartProvider.jsx";

export default function Material() {
  const { addToCart } = useContext(CartContext);
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
    <section className="mx-5 py-5 md:container md:mx-auto md:py-10">
      {loading ? (
        <LoaderPage />
      ) : (
        <>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-10 lg:grid-cols-4">
            {services?.map((s, i) => (
              <div
                key={i}
                className="group flex flex-col rounded border border-gray-200 bg-gray-50 duration-300 ease-linear hover:shadow-primary"
              >
                <Link to={`/service-details/${s?.slug}`} className="p-2.5">
                  <div className="h-[200px] w-full overflow-hidden rounded-md border border-gray-200 bg-white md:h-[250px]">
                    <img
                      src={s?.thumbnail}
                      alt=""
                      className="h-full w-full object-cover transition-all duration-300 ease-linear group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </Link>

                <div className="flex-1 px-4">
                  <Link
                    to={`/service-details/${s?.slug}`}
                    className="text-lg transition-all duration-200 ease-in-out hover:text-primary"
                  >
                    {s?.title}
                  </Link>
                </div>

                <div className="flex w-full items-center justify-between p-4">
                  <div>
                    <p className="text-lg font-medium text-primary">
                      ${s.price} <span className="text-sm">AUD</span>
                    </p>
                    <p className="mt-0.5 text-sm text-gray-500 line-through">
                      $
                      {(parseFloat(s?.price) + parseFloat(s?.discount)).toFixed(
                        2,
                      )}
                    </p>
                  </div>
                  <button
                    className="flex items-center justify-center gap-2 rounded border border-primary p-2.5 text-primary shadow duration-300 ease-linear hover:bg-primary hover:text-white"
                    onClick={() => addToCart(s)}
                  >
                    <FaCartPlus className="text-lg" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
