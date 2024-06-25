import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoaderPage from "../../../Adminpage/LoaderPage";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { MdEmail, MdPhone } from "react-icons/md";

const MaterialDetails = () => {
  const { slug } = useParams();
  const [service, setService] = useState({});
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [focusImage, setFocusImage] = useState();

  const handleOpen = () => setOpen(!open);

  //get service
  useEffect(() => {
    setLoader(true);
    fetch(`https://api.talukderhomes.com.au/api/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          setService(data?.data);
          setFocusImage(data?.data?.product_image[0]?.image);
          setLoader(false);
        }
      });
  }, []);
  return (
    <section className="mx-5 md:w-[50%] md:mx-auto py-5 md:py-10">
      {loader ? (
        <LoaderPage />
      ) : (
        <div className="flex flex-col gap-2.5 md:gap-5">
          <div className="flex justify-center">
            <img
              className="h-[40vh] w-fit"
              src={focusImage}
              alt=""
              loading="lazy"
            />
          </div>
          <div className="flex gap-2.5 flex-wrap">
            {service?.product_image?.map((spi, index) => (
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
                  <div className="absolute h-full w-full bg-primary/50 top-0"></div>
                )}
              </div>
            ))}
          </div>
          <p className="font-semibold md:text-xl">{service?.title}</p>
          <Button size="sm" onClick={handleOpen} className="bg-primary w-fit">
            Order Now
          </Button>
          <div
            className="text-justify"
            dangerouslySetInnerHTML={{ __html: service?.content }}
          />
        </div>
      )}
      <Dialog open={open} handler={handleOpen} size="xs" className="border-4 border-primary">
        <DialogHeader className="text-primary">Connect us</DialogHeader>
        <DialogBody>
            <a
              href="mailto:info@talukderhomes.com.au?subject=Want%20some%20information%20about%20material%20supply"
              className="flex gap-2 items-center text-primary hover:bg-black duration-300 ease-linear p-4 rounded"
            >
              <MdEmail className="text-4xl md:text-6xl" />
              <span className="font-semibold">info@talukderhomes.com.au</span>
            </a>
            <a
              href="tel:0452246490"
              className="flex gap-2 items-center text-primary hover:bg-black duration-300 ease-linear p-4 rounded"
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
