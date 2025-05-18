import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { MdEmail, MdPhone } from "react-icons/md";
import { AiOutlineThunderbolt } from "react-icons/ai";
import LoaderPage from "../../../Adminpage/LoaderPage";
import { CartContext } from "../../../Providers/CartProvider";
import { AuthContext } from "../../../Providers/AuthProvider";

const MaterialDetails = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { user } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const [service, setService] = useState({});
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [focusImage, setFocusImage] = useState();
  const [selectedAttribute, setSelectedAttribute] = useState("");

  // destructure product info
  const { id, title, thumbnail, price, attributes } = service;

  // newly updated product info to save in cart
  const productCartInfo = {
    id,
    title,
    thumbnail,
    price: selectedAttribute ? selectedAttribute.price : price,
    slug,
    ...(attributes?.length > 0 && { attribute: selectedAttribute }),
  };

  const handleOpen = () => setOpen(!open);

  //get service
  useEffect(() => {
    setLoader(true);
    fetch(`https://api.talukderhomes.com.au/api/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          setService(data?.data);
          setFocusImage(data?.data?.thumbnail);

          // Automatically select the lowest priced attribute (if any)
          if (data?.data?.attributes?.length > 0) {
            const lowestPriceAttr = [...data.data.attributes].sort(
              (a, b) => parseFloat(a.price) - parseFloat(b.price)
            )[0];
            setSelectedAttribute(lowestPriceAttr);
          }

          setLoader(false);
        }
      });
  }, [slug]);

  // handle add to cart
  const handleAddtoCart = () => {
    if (attributes?.length > 0 && !selectedAttribute) {
      return toast.error("Please choose a product variant!");
    }

    addToCart(productCartInfo);
  };

  // handle buy now
  const handleBuy = () => {
    if (attributes?.length > 0 && !selectedAttribute) {
      return toast.error("Please choose a product variant!");
    }

    if (user) {
      addToCart(productCartInfo, true);
      navigate("/checkout");
      return;
    }

    addToCart(productCartInfo);
  };

  if (loader) {
    return <LoaderPage />;
  }

  return (
    <section className="mx-5 py-10 md:container md:mx-auto md:py-20">
      <div className="flex flex-col gap-8 md:flex-row md:gap-16">
        {/* left side images */}
        <div className="w-full md:w-1/3">
          <div className="relative flex justify-center rounded border border-gray-200 p-1">
            <img
              className="h-72 max-h-72 object-cover"
              src={focusImage}
              alt=""
              loading="lazy"
            />
            {/* Top-right corner badge */}
            {service?.is_featured && (
              <span className="absolute left-2 top-2 rounded bg-primary/90 px-2 py-1 text-xs font-bold text-white">
                Featured
              </span>
            )}
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2.5">
            {service?.gallery?.map((spi, index) => (
              <div key={index} className="relative">
                <img
                  src={spi?.image}
                  className={`size-16 cursor-pointer ${
                    focusImage === spi?.image && "border border-primary"
                  }`}
                  alt=""
                  onClick={() => setFocusImage(spi?.image)}
                  loading="lazy"
                />
                {focusImage === spi?.image && (
                  <div className="absolute top-0 h-full w-full bg-primary/50"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* right side product info text */}
        <div className="w-full md:w-2/3">
          {service?.on_flash_sale && (
            <div className="flex w-fit items-center gap-0.5 rounded bg-primary/90 px-2 py-1 text-xs font-bold text-white">
              <AiOutlineThunderbolt className="min-w-fit text-base" /> FLASH
              SALE: Limited Time!
            </div>
          )}
          <h1 className="mt-2 text-xl font-semibold md:text-3xl">
            {service?.title}
          </h1>

          {/* price and discount price */}
          <div className="flex items-center gap-2">
            {/* <p className="mt-2 text-lg font-medium text-primary md:text-2xl">
              ${discount}
            </p>
            <p className="text-sm font-medium text-gray-500 line-through">
              ${price}
            </p> */}
            <p className="mt-2 text-lg font-medium text-primary md:text-2xl">
              ${selectedAttribute ? selectedAttribute.price : price}
            </p>
          </div>

          <div className="mt-4 flex items-center gap-6">
            <p className="w-fit rounded bg-gray-100 p-1.5 text-sm font-medium">
              Category:{" "}
              <span className="text-primary">{service?.category?.title}</span>
            </p>
            <p className="w-fit rounded bg-gray-100 p-1.5 text-sm font-medium">
              Stock:{" "}
              <span className="text-primary">
                {parseInt(service?.quantity) > 0 ? "Available" : "Unavailable"}
              </span>
            </p>
          </div>

          {service.attributes && service.attributes.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <p className="min-w-fit font-medium">Choose Variant:</p>
              <div className="flex flex-wrap items-center gap-1.5">
                {service?.attributes?.length > 0 &&
                  service?.attributes?.map((attribute, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedAttribute(attribute)}
                      className={`rounded border border-gray-300 px-2 py-1 ${attribute === selectedAttribute && "bg-gray-100"}`}
                    >
                      {attribute.name}
                    </button>
                  ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center gap-4">
            <Button
              onClick={handleAddtoCart}
              className="border border-primary bg-primary text-sm capitalize hover:bg-primary-hover"
            >
              Add to cart
            </Button>
            <Button
              onClick={handleBuy}
              className="border border-primary bg-transparent text-sm capitalize text-primary hover:bg-primary-hover hover:text-white"
            >
              Buy Now
            </Button>
          </div>

          <div className="mt-16">
            <h2 className="border-l-4 border-primary bg-gray-100 py-2 pl-2 text-xl font-semibold">
              Description
            </h2>

            <div
              className="mt-4 text-gray-700"
              dangerouslySetInnerHTML={{ __html: service?.description }}
            ></div>
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        handler={handleOpen}
        size="xs"
        className="border-4 border-primary"
      >
        <DialogHeader className="text-primary">Connect us</DialogHeader>
        <DialogBody>
          <a
            href="mailto:info@talukderhomes.com.au?subject=Want%20some%20information%20about%20material%20supply"
            className="flex items-center gap-2 rounded p-4 text-primary duration-300 ease-linear hover:bg-black"
          >
            <MdEmail className="text-4xl md:text-6xl" />
            <span className="font-semibold">info@talukderhomes.com.au</span>
          </a>
          <a
            href="tel:0452246490"
            className="flex items-center gap-2 rounded p-4 text-primary duration-300 ease-linear hover:bg-black"
          >
            <MdPhone className="text-4xl md:text-6xl" />
            <span className="font-semibold">0452 246 490</span>
          </a>
        </DialogBody>
        <DialogFooter>
          <Button className="bg-primary" onClick={handleOpen} size="sm">
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </section>
  );
};

export default MaterialDetails;
