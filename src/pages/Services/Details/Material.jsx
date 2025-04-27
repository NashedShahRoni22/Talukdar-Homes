import { useEffect, useState, useContext } from "react";
import LoaderPage from "../../../Adminpage/LoaderPage";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { CartContext } from "../../../Providers/CartProvider.jsx";

export default function Material() {
  const { carts, addToCart } = useContext(CartContext);
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
    <section className="mx-5 my-5 md:container md:mx-auto md:my-10">
      {loading ? (
        <LoaderPage />
      ) : (
        <>
          <div className="mt-5 grid min-h-screen grid-cols-2 gap-5 md:gap-10 lg:grid-cols-4">
            {services?.map((s, i) => (
              <div
                key={i}
                className="group h-fit rounded border shadow-lg duration-300 ease-linear hover:shadow-primary"
              >
                <Link to={`/service-details/${s?.slug}`}>
                  <img
                    src={s?.thumbnail}
                    alt=""
                    className="h-[200px] w-full rounded-t md:h-[250px]"
                    loading="lazy"
                  />
                </Link>
                <div className="flex items-end justify-between p-4">
                  <div>
                    <Link
                      to={`/service-details/${s?.slug}`}
                      className="text-lg"
                    >
                      {s?.title}
                    </Link>
                    <p className="text-xl text-primary">
                      $150 AUD{" "}
                      <span className="text-sm text-gray-600 line-through">
                        $100
                      </span>
                    </p>
                  </div>
                  <button
                    className="flex items-center justify-center gap-2 rounded border border-primary p-4 text-primary shadow duration-300 ease-linear hover:bg-primary hover:text-white"
                    onClick={() => addToCart(s)}
                  >
                    <FaCartPlus className="text-xl" />
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
