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
  console.log(service);
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
          setFocusImage(data?.data?.thumbnail);
          setLoader(false);
        }
      });
  }, [slug]);

  return (
    <section className="mx-5 py-10 md:container md:mx-auto md:py-20">
      {loader ? (
        <LoaderPage />
      ) : (
        <div className="flex flex-col gap-8 md:flex-row md:gap-16">
          {/* left side images */}
          <div className="w-full md:w-1/3">
            <div className="flex justify-center rounded border border-gray-200 p-1">
              <img
                className="h-full object-cover"
                src={focusImage}
                alt=""
                loading="lazy"
              />
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
            <p className="font-semibold md:text-xl">{service?.title}</p>
            <Button size="sm" onClick={handleOpen} className="w-fit bg-primary">
              Order Now
            </Button>
            <div
              className="text-justify"
              dangerouslySetInnerHTML={{ __html: service?.content }}
            />
          </div>
        </div>
      )}

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
