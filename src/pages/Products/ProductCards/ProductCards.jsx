import { useContext } from "react";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../../../Providers/CartProvider";

export default function ProductCards({ products }) {
  const { addToCart } = useContext(CartContext);

  const handleAddtoCart = (item) => {
    const { id, title, thumbnail, discount, slug, attributes } = item;

    const productCartInfo = {
      id,
      title,
      thumbnail,
      price: discount,
      slug,
      ...(attributes?.length > 0 && { attribute: attributes[0] }),
    };

    addToCart(productCartInfo);
  };

  return (
    <>
      {products?.map((product) => (
        <div
          key={product?.id}
          className="group flex flex-col rounded border border-gray-200 bg-gray-50 duration-300 ease-linear hover:shadow-primary"
        >
          <Link to={`/service-details/${product?.slug}`} className="p-2.5">
            <div className="h-[200px] w-full overflow-hidden rounded-md border border-gray-200 bg-white md:h-[250px]">
              <img
                src={product?.thumbnail}
                alt=""
                className="h-full w-full object-contain transition-all duration-300 ease-linear group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </Link>

          <div className="flex-1 px-4">
            <Link
              to={`/service-details/${product?.slug}`}
              className="text-lg transition-all duration-200 ease-in-out hover:text-primary"
            >
              {product?.title}
            </Link>
          </div>

          <div className="flex w-full items-center justify-between p-4">
            <div>
              <p className="text-lg font-medium text-primary">
                ${product?.discount} <span className="text-sm">AUD</span>
              </p>
              <p className="mt-0.5 text-sm text-gray-500 line-through">
                ${product?.price} AUD
              </p>
            </div>
            <button
              className="flex items-center justify-center gap-2 rounded border border-primary p-2.5 text-primary shadow duration-300 ease-linear hover:bg-primary hover:text-white"
              onClick={() => handleAddtoCart(product)}
            >
              <FaCartPlus className="text-lg" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
