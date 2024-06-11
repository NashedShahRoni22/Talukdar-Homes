import React, { useEffect, useState } from "react";
import LoaderPage from "../../../Adminpage/LoaderPage";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

export default function Material() {
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState({});
  const handleOpen = (data) => {
    setOpen(!open);
    setModalData(data);
  };
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
          <h5 className="p-5 text-xl md:text-3xl font-semibold text-blue">
            Material Products: {services?.length}
          </h5>
          <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-10 min-h-screen">
            {services?.map((s, i) => (
              <div
                key={i}
                className="shadow hover:shadow-orange-600  justify-between items-center rounded duration-300 ease-linear h-fit"
              >
                <div>
                  <img
                    src={s?.image}
                    alt=""
                    className="h-[150px] md:h-[250px] w-full"
                  />
                </div>
                <div className="p-2.5 flex flex-col gap-2.5">
                  <p className="font-semibold text-center">{s?.title}</p>
                  <button
                    onClick={() => handleOpen(s)}
                    className="bg-primary text-white w-full py-2 shadow rounded text-center"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Product details:</DialogHeader>
        <DialogBody className="h-[60vh] overflow-y-auto flex flex-col gap-2.5">
          <div className="flex justify-center">
            <img
              src={modalData?.image}
              alt=""
              className="h-[150px] md:h-[250px] shadow"
            />
          </div>
          <h5 className="font-semibold text-black text-xl">{modalData?.title}</h5>
          <div dangerouslySetInnerHTML={{ __html: modalData?.content }} className="text-black" />
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
            size="sm"
          >
            <span>Close</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </section>
  );
}
