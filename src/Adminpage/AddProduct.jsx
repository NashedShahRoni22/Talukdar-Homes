import { Button, Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { IoCloseCircleSharp, IoImagesSharp } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video", "code-block"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const AddProduct = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState(null);
  const [title, setTitle] = useState(null);
  const [metaDesc, setMetaDesc] = useState(null);
  const [images, setImages] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category_id: "",
    price: "",
    description: "",
    discount: "",
    quantity: "",
    is_featured: "",
    is_best_selling: "",
    on_flash_sale: "",
    shipping_charge: "",
    attributesSize: "",
  });

  // Fetch all categories
  const fetchCategories = () => {
    setLoader(true);
    fetch("https://api.talukderhomes.com.au/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setLoader(false);
        setCategories(data.data);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Function to handle file input change
  const handleImageChange = (e) => {
    const fileList = e.target.files;
    const imageList = Array.from(fileList);
    setImages(imageList);
  };

  // Function to remove an image from the state
  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Add new product
  const addService = async (e) => {
    e.preventDefault();

    /* setLoader(true);
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append(`image[${index}]`, image);
    });
    formData.append("title", title);
    formData.append("content", value);
    formData.append("meta_description", metaDesc);
    try {
      const response = await fetch(
        "https://api.talukderhomes.com.au/api/products/store",
        {
          method: "POST",
          body: formData,
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
        }
      );
      const data = await response.json();
      if (data.status === true) {
        window.alert(data.msg);
        setLoader(false);
        navigate("/admin/manageService");
      }
      // Handle response data as needed
    } catch (error) {
      console.error("Error:", error);
      setLoader(false);
    } */
  };

  return (
    <form
      className="mt-5 md:mt-0 md:p-5 lg:p-10 flex flex-col gap-2.5"
      onSubmit={addService}
    >
      <div className="flex justify-between">
        <h5 className="text-xl md:text-3xl text-orange-600 font-semibold">
          Add Product
        </h5>

        <Button
          disabled={
            images === null ||
            value === null ||
            title === null ||
            metaDesc === null
          }
          type="submit"
          className="bg-orange-600 flex gap-2 items-center"
        >
          Submit
          {loader && <Spinner className="h-4 w-4" />}
        </Button>
      </div>

      {/* image field */}
      <div className="flex flex-col gap-2.5">
        <label className="font-semibold">
          Select Image{" "}
          <span className="text-xs font-semibold text-red-500">
            (Maximum Image Size is 2MB)
          </span>{" "}
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          style={{ display: "none" }}
          id="image-upload-input"
        />
        <label
          htmlFor="image-upload-input"
          className="flex items-center gap-2 px-4 py-2 border shadow rounded hover:shadow-orange-600 w-fit cursor-pointer"
        >
          <IoImagesSharp className="text-xl text-lightColor text-orange-600" />
          <p className="text-xs font-semibold">Choose Images</p>
        </label>
      </div>

      {/* Render preview of uploaded images */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {images?.map((image, index) => (
          <div key={index} className="relative aspect-w-1 aspect-h-1">
            <IoCloseCircleSharp
              className="absolute top-2 right-2 text-red-500 shadow cursor-pointer text-xl"
              onClick={() => removeImage(index)}
            />
            <img
              src={URL.createObjectURL(image)}
              alt={`Uploaded Image ${index + 1}`}
              className="object-cover rounded h-[200px] md:h-[250px] w-full"
            />
          </div>
        ))}
      </div>

      {/* name field */}
      <div className="flex flex-col gap-2.5">
        <label className="font-semibold">Enter Name</label>
        <input
          type="text"
          name="title"
          className="px-4 py-2 outline-none border border-gray-400 rounded"
          placeholder="Enter Name"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          required
        />
      </div>

      {/* category select dropdown */}
      <div className="flex flex-col gap-2.5">
        <label className="font-semibold">Category</label>
        <select
          className="px-4 py-2 outline-none border border-gray-400 rounded"
          value={formData.category_id}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category_id: e.target.value }))
          }
        >
          <option value="" disabled>
            --- Please select a category ---
          </option>
          {categories?.map((category) => (
            <option key={category?.id} value={category?.id}>
              {category?.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2.5 gap-x-5">
        {/* price */}
        <div className="flex flex-col gap-2.5">
          <label className="font-semibold">Price</label>
          <input
            type="text"
            name="price"
            className="px-4 py-2 outline-none border border-gray-400 rounded"
            placeholder="Enter Price"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, price: e.target.value }))
            }
            required
          />
        </div>

        {/* discount price */}
        <div className="flex flex-col gap-2.5">
          <label className="font-semibold">Discount Price</label>
          <input
            type="text"
            name="discount"
            className="px-4 py-2 outline-none border border-gray-400 rounded"
            placeholder="Enter Discount Price"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, discount: e.target.value }))
            }
            required
          />
        </div>

        {/* shipping charge */}
        <div className="flex flex-col gap-2.5">
          <label className="font-semibold">Shipping Charge</label>
          <input
            type="text"
            name="shipping"
            className="px-4 py-2 outline-none border border-gray-400 rounded"
            placeholder="Enter Shipping Charge"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                shipping_charge: e.target.value,
              }))
            }
            required
          />
        </div>

        {/* quantity */}
        <div className="flex flex-col gap-2.5">
          <label className="font-semibold">Quantity</label>
          <input
            type="text"
            name="quantity"
            className="px-4 py-2 outline-none border border-gray-400 rounded"
            placeholder="Enter Quantity"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                quantity: e.target.value,
              }))
            }
            required
          />
        </div>
      </div>

      {/* featured */}
      <div className="flex flex-col gap-2.5">
        <label>Featured</label>
        <div className="flex items-center gap-2">
          <input type="checkbox" name="featured" id="featuredYes" />{" "}
          <label htmlFor="featuredYes">Yes</label>
          <input type="checkbox" name="featured" id="featuredNo" />{" "}
          <label htmlFor="featuredNo">No</label>
        </div>
      </div>

      {/* meta description field */}
      <div className="flex flex-col gap-2.5">
        <label className="font-semibold">Enter Meta Description</label>
        <textarea
          type="text"
          name="description"
          className="px-4 py-2 outline-none border border-gray-400 rounded"
          placeholder="Enter Meta Description"
          onChange={(e) => setMetaDesc(e.target.value)}
          required
        />
      </div>
      <div className="mt-5 flex flex-col gap-2.5">
        <label className="font-semibold">Enter Content</label>
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
          formats={formats}
          className="py-2 w-full h-[300px]"
        />
      </div>
    </form>
  );
};

export default AddProduct;
