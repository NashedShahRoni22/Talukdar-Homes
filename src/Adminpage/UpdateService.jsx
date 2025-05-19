import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Button, Spinner } from "@material-tailwind/react";
import ReactQuill from "react-quill";
import { IoCloseCircleSharp, IoImagesSharp } from "react-icons/io5";
import InputField from "../components/admin/InputField";
import "react-quill/dist/quill.snow.css";
import toast from "react-hot-toast";
import { AuthContext } from "../Providers/AuthProvider";

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

const UpdateService = () => {
  const { slug, id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  const [content, setContent] = useState(null);
  const [icon, setIcon] = useState(null);
  const [previewIcon, setPreviewIcon] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    slogan: "",
  });

  // Handle input field and chekbox
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetch(`https://api.talukderhomes.com.au/api/services/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          setFormData({
            title: data.data.title,
            slogan: data.data.slogan,
          });
          setContent(data.data.content);
          setPreviewIcon(data.data.icon);
          setPreviewThumbnail(data.data.thumbnail);
        }
      });
  }, [slug]);

  // Function to handle icon and thumbnail image change
  const handleImageChange = (e, icon) => {
    if (icon) {
      return setIcon(e.target.files[0]);
    }
    setThumbnail(e.target.files[0]);
  };

  // Add new sevice submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    const payload = new FormData();
    if (icon) payload.append("icon", icon);
    if (thumbnail) payload.append("thumbnail", thumbnail);
    payload.append("title", formData.title);
    payload.append("slogan", formData.slogan);
    payload.append("content", content);

    try {
      const res = await fetch(
        `https://api.talukderhomes.com.au/api/services/update/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
          body: payload,
        }
      );

      const data = await res.json();
      if (data.status === true) {
        toast.success(data.msg);
        setLoader(false);
        navigate("/admin/manage-service");
      }
    } catch (error) {
      console.error("Error:", error);
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
          Update Service
        </h5>

        <Button
          className="flex items-center gap-2 bg-orange-600"
          type="submit"
          disabled={loader}
        >
          Submit
          {loader && <Spinner className="h-4 w-4" />}
        </Button>
      </div>

      {/* icon image field */}
      <div>
        <label className="font-semibold">
          Select Icon{" "}
          <span className="text-xs font-semibold text-red-500">
            (Maximum Image Size is 2MB)
          </span>
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, true)}
          style={{ display: "none" }}
          id="icon-img"
        />
        <label
          htmlFor="icon-img"
          className="flex w-fit cursor-pointer items-center gap-2 rounded border px-4 py-2 shadow hover:shadow-orange-600"
        >
          <IoImagesSharp className="text-lightColor text-xl text-orange-600" />
          <p className="text-xs font-semibold">Choose Icon</p>
        </label>
      </div>

      {/* icon image preview */}
      {icon ? (
        <div className="aspect-w-1 aspect-h-1 relative">
          <IoCloseCircleSharp
            className="absolute right-2 top-2 cursor-pointer text-xl text-red-500 shadow"
            onClick={() => setIcon(null)}
          />
          <img
            src={URL.createObjectURL(icon)}
            alt="icon image"
            className="h-[200px] w-full rounded object-contain md:h-[250px]"
          />
        </div>
      ) : (
        <div className="aspect-w-1 aspect-h-1 relative">
          <img
            src={`https://api.talukderhomes.com.au/public/${previewIcon}`}
            alt="icon image"
            className="h-[200px] w-full rounded object-contain md:h-[250px]"
          />
        </div>
      )}

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
          onChange={(e) => handleImageChange(e)}
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
      {thumbnail ? (
        <div className="aspect-w-1 aspect-h-1 relative">
          <IoCloseCircleSharp
            className="absolute right-2 top-2 cursor-pointer text-xl text-red-500 shadow"
            onClick={() => setThumbnail(null)}
          />
          <img
            src={URL.createObjectURL(thumbnail)}
            alt="thumbnail image"
            className="h-[200px] w-full rounded object-contain md:h-[250px]"
          />
        </div>
      ) : (
        <div className="aspect-w-1 aspect-h-1 relative">
          <img
            src={`https://api.talukderhomes.com.au/public/${previewThumbnail}`}
            alt="thumbnail image"
            className="h-[200px] w-full rounded object-contain md:h-[250px]"
          />
        </div>
      )}

      {/* title field */}
      <InputField
        label="Title"
        id="title"
        name="title"
        value={formData.title}
        required={true}
        handleInputChange={handleInputChange}
      />

      {/* slogan field */}
      <div className="flex flex-col gap-2.5">
        <label className="font-semibold">Slogan</label>
        <textarea
          className="rounded border border-gray-400 px-4 py-2 outline-none"
          type="text"
          name="slogan"
          value={formData.slogan}
          onChange={handleInputChange}
          required
        />
      </div>

      {/* product content description */}
      <div className="mt-5 flex flex-col gap-2.5">
        <label className="font-semibold">Content</label>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          className="h-[300px] w-full py-2"
        />
      </div>
    </form>
  );
};

export default UpdateService;
