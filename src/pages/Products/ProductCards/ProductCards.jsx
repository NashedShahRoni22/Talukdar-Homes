import { useContext } from "react";
import { FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../../../Providers/CartProvider";
import getPriceRange from "../../../utils/getPriceRange";

export default function ProductCards({ products }) {
  const { addToCart } = useContext(CartContext);

  // add item to cart
  const handleAddtoCart = (item) => {
    const { id, title, thumbnail, price, slug } = item;

    const productCartInfo = {
      id,
      title,
      thumbnail,
      price,
      slug,
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
          <Link to={`/products/${product?.slug}`} className="p-2.5">
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
              to={`/products/${product?.slug}`}
              className="text-lg transition-all duration-200 ease-in-out hover:text-primary"
            >
              {product?.title}
            </Link>
          </div>

          <div className="flex w-full items-center justify-between p-4">
            <div>
              {/* <p className="text-lg font-medium text-primary">
                ${product?.discount ? product?.discount : product?.price}{" "}
                <span className="text-sm">AUD</span>
              </p> */}

              {product?.attributes?.length > 0 ? (
                (() => {
                  const { minPrice, maxPrice } = getPriceRange(
                    product.attributes,
                  );
                  return (
                    <p className="text-lg font-medium text-primary">
                      {minPrice === maxPrice
                        ? minPrice
                        : `$${minPrice} - $${maxPrice}`}{" "}
                      <span className="text-sm">AUD</span>
                    </p>
                  );
                })()
              ) : (
                <p className="text-lg font-medium text-primary">
                  ${product?.price} <span className="text-sm">AUD</span>
                </p>
              )}

              {/* {product?.discount && (
                <p className="mt-0.5 text-sm text-gray-500 line-through">
                  ${product?.price} AUD
                </p>
              )} */}
            </div>

            {product?.attributes?.length > 0 ? (
              <Link
                to={`/products/${product?.slug}`}
                className="flex items-center justify-center gap-2 rounded border border-primary p-2.5 text-primary shadow duration-300 ease-linear hover:bg-primary hover:text-white"
              >
                <FaCartPlus className="text-lg" />
              </Link>
            ) : (
              <button
                className="flex items-center justify-center gap-2 rounded border border-primary p-2.5 text-primary shadow duration-300 ease-linear hover:bg-primary hover:text-white"
                onClick={() => handleAddtoCart(product)}
              >
                <FaCartPlus className="text-lg" />
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
