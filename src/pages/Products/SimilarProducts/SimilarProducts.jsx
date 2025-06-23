import { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { CartContext } from "../../../Providers/CartProvider";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import getPriceRange from "../../../utils/getPriceRange";

export default function SimilarProducts({ categorySlug }) {
  const { addToCart } = useContext(CartContext);
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchSimilarCategoryProducts = async () => {
      try {
        const res = await fetch(
          `https://api.talukderhomes.com.au/api/products?category=${categorySlug}`
        );
        const data = await res.json();
        if (data?.status === true) {
          setSimilarProducts(data?.data?.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSimilarCategoryProducts();
  }, [categorySlug]);

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

  if (!similarProducts) {
    return null;
  }

  return (
    <div className="mt-10 md:mt-20">
      <h3 className="text-2xl font-semibold">You might also like</h3>

      <div className="relative">
        <button className="custom-prev absolute p-1.5 flex items-center justify-center -left-5 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full cursor-pointer shadow-custom">
          <IoIosArrowBack className="size-7 ml-0.5 text-primary hover:text-primary-hover transition-all duration-200 ease-in-out" />
        </button>
        <button className="custom-next absolute p-1.5 flex items-center justify-center -right-5 z-10 top-1/2 -translate-y-1/2 bg-white rounded-full cursor-pointer shadow-custom">
          <IoIosArrowForward className="size-7 ml-0.5 text-primary hover:text-primary-hover transition-all duration-200 ease-in-out" />
        </button>

        <Swiper
          slidesPerView={1}
          spaceBetween={16}
          loop={similarProducts?.length > 5}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          modules={[Navigation]}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
          className="mySwiper mt-4"
        >
          {similarProducts?.slice(0, 8)?.map((product) => (
            <SwiperSlide key={product?.id}>
              <div className="group flex flex-col min-h-96 md:min-h-[428px] rounded border border-gray-200 bg-gray-50 duration-300 ease-linear hover:shadow-primary">
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
                    {product?.title?.length > 70
                      ? `${product?.title?.slice(0, 73)}...`
                      : product?.title}
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
                          product.attributes
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
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
