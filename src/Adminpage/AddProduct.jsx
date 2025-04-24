import { Button, Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { IoCloseCircleSharp, IoImagesSharp } from "react-icons/io5";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import InputField from "../components/admin/InputField";
import CheckBoxFeat from "../components/admin/CheckBoxFeat";
import { MdOutlineClose } from "react-icons/md";

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
  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState(null);
  const [attributeInput, setAttributeInput] = useState("");
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
      (category) => category.id == formData.category_id
    );

    if (foundCategory) {
      setSubCategories(foundCategory.children);
    }
  }, [categories, formData.category_id]);

  // Check whether all the form fields are filled or not
  const isDisabled =
    !formData.title.trim() ||
    !formData.category_id.trim() ||
    !formData.price.trim() ||
    !formData.description.trim() ||
    !formData.discount.trim() ||
    !formData.quantity.trim() ||
    !formData.shipping_charge.trim() ||
    !thumbnail ||
    !images?.length ||
    !attributes.length ||
    !value ||
    value.replace(/<[^>]*>/g, "").trim() === "";

  // handle add sub-categories array in local state
  const handleAttributes = (e) => {
    if (!attributeInput) {
      return;
    }

    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      setAttributes([...attributes, attributeInput]);
      setAttributeInput("");
    }
  };

  // remove attribute from local attributes array
  const removeAttribute = (indexToRemove) => {
    const filteredAttributes = attributes.filter(
      (_, index) => index !== indexToRemove
    );
    setAttributes(filteredAttributes);
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

    const fileList = e.target.files;
    const imageList = Array.from(fileList);
    setImages(imageList);
  };

  // Function to remove an image from the state
  const removeImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Add new product
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoader(true);

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append(
      "category_id",
      subCategory ? subCategory : formData.category_id
    );
    payload.append("price", formData.price);
    payload.append("description", formData.description);
    payload.append("discount", formData.discount);
    payload.append("quantity", formData.quantity);
    payload.append("is_featured", formData.is_featured);
    payload.append("is_best_selling", formData.is_best_selling);
    payload.append("on_flash_sal", formData.on_flash_sale);
    payload.append("shipping_charge", formData.shipping_charge);
    // payload.append("content", value); // TODO: not mentioned in the api
    if (thumbnail) {
      payload.append("thumbnail", thumbnail);
    }

    attributes.forEach((attribute) => {
      payload.append(`attributes[size]`, attribute);
    });

    if (images?.length) {
      images.forEach((img) => {
        payload.append("gallery[]", img);
      });
    }

    try {
      const res = await fetch(
        "https://api.talukderhomes.com.au/api/products/store",
        {
          method: "POST",
          body: payload,
        }
      );

      const data = await res.json();
      if (data.status === true) {
        window.alert(data.msg);
        setLoader(false);
        navigate("/admin/manage-products");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  return (
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
            (Maximum Image Size is 2MB)
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
            className="h-[200px] w-full rounded object-cover md:h-[250px]"
          />
        </div>
      )}

      {/* images gallery field */}
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
              className="h-[200px] w-full rounded object-cover md:h-[250px]"
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
          <label className="font-semibold">Category</label>
          <select
            className="rounded border border-gray-400 px-4 py-2 outline-none"
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

        {/* sub-category select dropdown */}
        <div className="flex flex-col gap-2.5">
          <label className="font-semibold">Sub-Category</label>
          <select
            className="rounded border border-gray-400 px-4 py-2 outline-none"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            required={subCategory ? true : false}
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

        {/* attribute input field */}
        <div className="flex flex-col gap-2.5 col-span-full">
          <label htmlFor="attributeName" className="font-semibold">
            Attribute Name
          </label>

          <div className="flex items-center px-4 justify-between border border-gray-400 rounded pr-1">
            <input
              type="text"
              id="attributeName"
              name="attributeName"
              value={attributeInput}
              onChange={(e) => setAttributeInput(e.target.value)}
              onKeyDown={handleAttributes}
              className="w-full outline-none py-2"
            />
            {attributeInput && (
              <button
                className="bg-orange-500 min-w-fit cursor-pointer rounded px-4 py-1 text-white"
                onClick={handleAttributes}
              >
                Add
              </button>
            )}
          </div>

          {/* attributes */}
          <div className="flex flex-wrap gap-1.5">
            {attributes.map((attribute, i) => (
              <div
                key={i}
                className="bg-orange-50 inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-sm text-orange-500"
              >
                <p>{attribute}</p>
                <button
                  className="cursor-pointer"
                  onClick={() => removeAttribute(i)}
                >
                  <MdOutlineClose className="text-lg" />
                </button>
              </div>
            ))}
          </div>
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
        <InputField
          label="Discount Percentage(%)"
          id="discount_price"
          name="discount"
          value={formData.discount}
          required={true}
          handleInputChange={handleInputChange}
        />

        {/* shipping charge */}
        <InputField
          label="Shipping Charge"
          id="shipping_charge"
          name="shipping_charge"
          value={formData.shipping_charge}
          required={true}
          handleInputChange={handleInputChange}
        />

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
      <div className="flex flex-col gap-2.5">
        <label className="font-semibold">Meta Description</label>
        <textarea
          className="rounded border border-gray-400 px-4 py-2 outline-none"
          type="text"
          name="description"
          onChange={handleInputChange}
          required
        />
      </div>

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
  );
};

export default AddProduct;
