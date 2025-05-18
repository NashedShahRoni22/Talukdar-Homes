import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import { Button, Spinner } from "@material-tailwind/react";
import { IoCloseCircleSharp, IoImagesSharp } from "react-icons/io5";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import InputField from "../components/admin/InputField";
import CheckBoxFeat from "../components/admin/CheckBoxFeat";
import { AuthContext } from "../Providers/AuthProvider";
import "react-quill/dist/quill.snow.css";

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
  const { user } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);
  const [attributeInput, setAttributeInput] = useState({ name: "", price: "" });
  const [attributes, setAttributes] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category_id: "",
    price: "",
    description: "",
    discount: "",
    quantity: "",
    is_featured: "0",
    is_best_selling: "0",
    on_flash_sale: "0",
    shipping_charge: "",
  });
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState("");

  useEffect(() => {
    const foundCategory = categories.find(
      (category) => category.id == formData.category_id,
    );

    if (foundCategory) {
      setSubCategories(foundCategory.children);
    }
  }, [categories, formData.category_id]);

  // Check whether all the form fields are filled or not
  const isDisabled = false;

  // add new attribute
  const addAttribute = () => {
    if (!attributeInput.name || !attributeInput.price) return;

    setAttributes((prev) => [...prev, attributeInput]);
    setAttributeInput({ name: "", price: "" });
  };

  // remove attribute from local attributes array
  const removeAttribute = (index) => {
    setAttributes((prev) => prev.filter((_, i) => i !== index));
  };

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

  // Handle input field and chekbox
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Function to handle thumbnail and gallery images
  const handleImageChange = (e, thumbnail) => {
    if (thumbnail) {
      return setThumbnail(e.target.files[0]);
    }

    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  // Function to remove an image from the state
  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Add new product
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoader(true);

    if (!thumbnail) {
      return toast.error("Please upload a thumbnail image");
    }

    if (!images || images.length === 0) {
      return toast.error("Please upload one or more product images");
    }

    if (formData.discount) {
      const originalPrice = Number(formData.price);
      const discountPrice = Number(formData.discount);

      // Check if discount is valid (positive and less than original price)
      if (discountPrice <= 0) {
        toast.error("Discount must be greater than 0");
        setLoader(false);
        return;
      }

      if (discountPrice >= originalPrice) {
        toast.error("Discount price must be less than the original price");
        setLoader(false);
        return;
      }
    }

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append(
      "category_id",
      subCategory ? subCategory : formData.category_id,
    );
    payload.append("price", formData.price);
    payload.append("description", value);
    // payload.append("discount", formData.discount);
    payload.append("quantity", formData.quantity);
    payload.append("is_featured", formData.is_featured);
    payload.append("is_best_selling", formData.is_best_selling);
    payload.append("on_flash_sale", formData.on_flash_sale);
    // payload.append("shipping_charge", formData.shipping_charge);
    payload.append("thumbnail", thumbnail);

    images.forEach((img) => {
      payload.append("gallery[]", img);
    });

    if (attributes && attributes.length > 0) {
      attributes.forEach((attribute, i) => {
        payload.append(`attributes[${i}][name]`, attribute.name);
        payload.append(`attributes[${i}][price]`, attribute.price);
      });
    }

    try {
      const res = await fetch(
        "https://api.talukderhomes.com.au/api/products/store",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: payload,
        },
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.msg || "Failed to create product");
      }

      if (data.status === true) {
        toast.success(data.msg);
        navigate("/admin/manage-products");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <form
        className="mt-5 flex flex-col gap-2.5 md:mt-0 md:p-5 lg:p-10"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-between">
          <h5 className="text-xl font-semibold text-orange-600 md:text-3xl">
            Add Product
          </h5>

          <Button
            className="flex items-center gap-2 bg-orange-600"
            type="submit"
            disabled={isDisabled || loader}
          >
            Submit
            {loader && <Spinner className="h-4 w-4" />}
          </Button>
        </div>

        {/* thumbnail image field */}
        <div>
          <label className="font-semibold">
            Select Thumbnail{" "}
            <span className="text-xs font-semibold text-red-500">
              (Maximum Image Size is 2MB) *
            </span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, true)}
            style={{ display: "none" }}
            id="thumbnail-img"
          />
          <label
            htmlFor="thumbnail-img"
            className="flex w-fit cursor-pointer items-center gap-2 rounded border px-4 py-2 shadow hover:shadow-orange-600"
          >
            <IoImagesSharp className="text-lightColor text-xl text-orange-600" />
            <p className="text-xs font-semibold">Choose Thumbnail</p>
          </label>
        </div>

        {/* thumbnail image preview */}
        {thumbnail && (
          <div className="aspect-w-1 aspect-h-1 relative">
            <IoCloseCircleSharp
              className="absolute right-2 top-2 cursor-pointer text-xl text-red-500 shadow"
              onClick={() => setThumbnail(null)}
            />
            <img
              src={URL.createObjectURL(thumbnail)}
              alt="thumbnail image"
              className="h-[200px] w-full rounded border object-contain md:h-[250px]"
            />
          </div>
        )}

        {/* images gallery field */}
        <div className="flex flex-col gap-2.5">
          <label className="font-semibold">
            Select Image{" "}
            <span className="text-xs font-semibold text-red-500">
              (Maximum Image Size is 2MB) *
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
            className="flex w-fit cursor-pointer items-center gap-2 rounded border px-4 py-2 shadow hover:shadow-orange-600"
          >
            <IoImagesSharp className="text-lightColor text-xl text-orange-600" />
            <p className="text-xs font-semibold">Choose Images</p>
          </label>
        </div>

        {/* Render preview of uploaded images */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
          {images?.map((image, index) => (
            <div key={index} className="aspect-w-1 aspect-h-1 relative">
              <IoCloseCircleSharp
                className="absolute right-2 top-2 cursor-pointer text-xl text-red-500 shadow"
                onClick={() => removeImage(index)}
              />
              <img
                src={URL.createObjectURL(image)}
                alt={`Uploaded Image ${index + 1}`}
                className="h-[200px] w-full rounded border object-contain md:h-[250px]"
              />
            </div>
          ))}
        </div>

        {/* name field */}
        <InputField
          label="Name"
          id="name"
          name="title"
          value={formData.title}
          required={true}
          handleInputChange={handleInputChange}
        />

        <div className="grid grid-cols-1 gap-x-5 gap-y-2.5 md:grid-cols-2">
          {/* category select dropdown */}
          <div className="flex flex-col gap-2.5">
            <label className="font-semibold">
              Category <span className="text-red-600">*</span>
            </label>
            <select
              className="rounded border border-gray-400 px-4 py-2 outline-none"
              value={formData.category_id}
              required
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  category_id: e.target.value,
                }))
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

          {/* sub-category select dropdown */}
          <div className="flex flex-col gap-2.5">
            <label className="font-semibold">Sub-Category</label>
            <select
              className="rounded border border-gray-400 px-4 py-2 outline-none"
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            >
              <option value="" disabled>
                --- Please select a sub-category ---
              </option>
              {subCategories?.map((subCategory) => (
                <option key={subCategory?.id} value={subCategory?.id}>
                  {subCategory?.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-2.5 md:grid-cols-2">
          {/* price */}
          <InputField
            label="Price"
            id="price"
            name="price"
            value={formData.price}
            required={true}
            handleInputChange={handleInputChange}
          />

          {/* discount price */}
          {/*  <InputField
            label="Discount Price"
            id="discount_price"
            name="discount"
            value={formData.discount}
            handleInputChange={handleInputChange}
          /> */}

          {/* shipping charge */}
          {/* <InputField
            label="Shipping Charge"
            id="shipping_charge"
            name="shipping_charge"
            value={formData.shipping_charge}
            handleInputChange={handleInputChange}
          /> */}

          {/* quantity */}
          <InputField
            label="Quantity"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            required={true}
            handleInputChange={handleInputChange}
          />
        </div>

        {/* attributes container */}
        <div className="col-span-full">
          <p className="mb-2 font-semibold">
            Attributes{" "}
            <span className="text-xs font-normal text-gray-500">
              (e.g. 8ft x 4ft - $30)
            </span>
          </p>

          <div className="grid grid-cols-12 gap-x-5 gap-y-2.5 rounded border border-gray-400 bg-gray-50 px-2 py-3">
            {/* attribute name input field */}
            <div className="col-span-12 flex flex-col gap-2.5 md:col-span-6">
              <label htmlFor="attributeName" className="text-sm font-semibold">
                Attribute Name
              </label>

              <div className="overflow-hidden rounded border border-gray-400">
                <input
                  type="text"
                  id="attributeName"
                  name="attributeName"
                  value={attributeInput.name}
                  placeholder="e.g. 6ft x 4ft"
                  onChange={(e) =>
                    setAttributeInput({
                      ...attributeInput,
                      name: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 outline-none"
                />
              </div>
            </div>

            {/* attribute price input field */}
            <div className="col-span-12 flex flex-col gap-2.5 md:col-span-6">
              <label htmlFor="attributePrice" className="text-sm font-semibold">
                Attribute Price
              </label>

              <div className="flex items-center justify-between overflow-hidden rounded border border-gray-400">
                <input
                  type="text"
                  id="attributePrice"
                  name="attributePrice"
                  value={attributeInput.price}
                  placeholder="e.g. 45"
                  onChange={(e) =>
                    setAttributeInput({
                      ...attributeInput,
                      price: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 outline-none"
                />
                <button
                  onClick={addAttribute}
                  disabled={!attributeInput.name || !attributeInput.price}
                  className={`inline-flex items-center rounded-r px-4 py-2 text-white ${attributeInput.name && attributeInput.price ? "cursor-pointer bg-primary hover:bg-primary-hover" : "bg-primary/50"}`}
                >
                  <FiPlus /> Add
                </button>
              </div>
            </div>

            {/* attributes */}
            {attributes && attributes?.length > 0 && (
              <div className="col-span-12 flex items-center gap-2 py-2 text-sm">
                <p className="font-semibold">Added Attributes:</p>

                <div className="flex flex-wrap gap-2">
                  {attributes.map((attribute, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-2 rounded-lg bg-gray-50 px-3 py-2 transition-all hover:bg-gray-100"
                    >
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-sm font-medium text-gray-800">
                          {attribute.name} -
                        </span>
                        <span className="text-emerald-600 text-sm">
                          ${attribute.price}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeAttribute(i)}
                        className="text-gray-400 transition-colors hover:text-red-500 focus:outline-none"
                      >
                        <FiTrash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* checkboxes container */}
        <div className="grid grid-cols-1 gap-x-5 gap-y-2.5 md:grid-cols-3">
          {/* featured */}
          <CheckBoxFeat
            label="Featured"
            name="is_featured"
            id1="featuredYes"
            id2="featuredNo"
            value={formData.is_featured}
            handleInputChange={handleInputChange}
          />

          {/* best selling */}
          <CheckBoxFeat
            label="Best Selling"
            name="is_best_selling"
            id1="bestSellingYes"
            id2="bestSellingNo"
            value={formData.is_best_selling}
            handleInputChange={handleInputChange}
          />

          {/* flash sell */}
          <CheckBoxFeat
            label="Flash Sell"
            name="on_flash_sale"
            id1="flashSaleYes"
            id2="flashSaleNo"
            value={formData.on_flash_sale}
            handleInputChange={handleInputChange}
          />
        </div>

        {/* meta description field */}
        {/* <div className="flex flex-col gap-2.5">
        <label className="font-semibold">Meta Description</label>
        <textarea
          className="rounded border border-gray-400 px-4 py-2 outline-none"
          type="text"
          name="description"
          onChange={handleInputChange}
          required
        />
      </div> */}

        {/* product content description */}
        <div className="mt-5 flex flex-col gap-2.5">
          <label className="font-semibold">Enter Content</label>
          <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
            className="h-[300px] w-full py-2"
          />
        </div>
      </form>
    </>
  );
};

export default AddProduct;
