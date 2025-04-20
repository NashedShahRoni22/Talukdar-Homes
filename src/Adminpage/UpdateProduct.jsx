import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Spinner } from "@material-tailwind/react";

import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import LoaderPage from "./LoaderPage";

const UpdateProduct = () => {
  const { slug } = useParams();
  const [service, setService] = useState({});
  // console.log(service);
  const [focusImage, setFocusImage] = useState();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [updateLoader, setUpdateLoader] = useState(false);
  //manage data
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState(null);

  //get service
  useEffect(() => {
    setLoader(true);
    fetch(`https://api.talukderhomes.com.au/api/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          setService(data.data);
          setValue(data.data.content);
          setFocusImage(data?.data?.product_image[0]?.image);
          setTitle(data.data.title);
          setMetaDesc(data.data.meta_description);
          setLoader(false);
        }
      });
  }, []);

  // update service
  const updateService = async (id) => {
    setUpdateLoader(true);
    const formData = new FormData();
   
    formData.append("title", title);
    formData.append("content", value);
    formData.append("meta_description", metaDesc);

    try {
      const response = await fetch(
        `https://api.talukderhomes.com.au/api/products/update/${id}`,
        {
          method: "POST",
          body: formData,
          headers: {
            // Add any necessary headers, such as authorization
          },
        }
      );
      const data = await response.json();
      if (data.status === true) {
        window.alert(data.msg);
        setUpdateLoader(false);
        navigate("/admin/manageService");
      }
      // Handle response data as needed
    } catch (error) {
      console.error("Error:", error);
      setUpdateLoader(false);
    }
  };
  return (
    <section className="mt-5 md:mt-0 md:p-5 lg:p-10 flex flex-col gap-2.5">
      {loader ? (
        <LoaderPage />
      ) : (
        <div className="flex flex-col gap-5">
          <label className="font-semibold">Update Images</label>
          <img
            className="h-[40vh] w-fit"
            src={focusImage}
            alt=""
            loading="lazy"
          />
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
          <label className="font-semibold">Update Name</label>
          <input
            className="px-4 py-2 border w-full"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
          <label className="font-semibold">Enter Meta Description</label>
          <textarea
            className="px-4 py-2 border w-full"
            defaultValue={metaDesc}
            onChange={(e) => setMetaDesc(e.target.value)}
            type="text"
          />
          <label className="font-semibold">Update Content</label>
          <ReactQuill theme="snow" value={value} onChange={setValue} />
          <Button
            onClick={() => updateService(service?.id)}
            className="bg-primary mt-2.5 flex gap-2 items-center w-fit"
          >
            Update
            {updateLoader && <Spinner className="h-4 w-4" />}
          </Button>
        </div>
      )}
    </section>
  );
};

export default UpdateProduct;
