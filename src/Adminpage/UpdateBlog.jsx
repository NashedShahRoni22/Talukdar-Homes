import { Button, Spinner } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { IoCloseCircleSharp, IoImagesSharp } from "react-icons/io5";
import ReactQuill from "react-quill";
import { useNavigate, useParams } from "react-router-dom";

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

export default function UpdateBlog() {
  const { slug, id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [uploadedPreviewImg, setUploadedPreviewImg] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    slogan: "",
  });

  useEffect(() => {
    fetch(`https://api.talukderhomes.com.au/api/blogs/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          setFormData({
            title: data.data.title,
            slogan: data.data.slogan,
          });
          setContent(data.data.content);
          setUploadedPreviewImg(data.data.image);
        }
      });
  }, [slug]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // update blog info
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("slogan", formData.slogan);
    if (thumbnail) payload.append("image", thumbnail);
    payload.append("content", content);

    try {
      const response = await fetch(
        `https://api.talukderhomes.com.au/api/blogs/update/${id}`,
        {
          method: "POST",
          body: payload,
        },
      );
      const data = await response.json();
      if (data.status === true) {
        window.alert(data.msg);
        setLoader(false);
        navigate("/admin/manage-blog");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <form className="mt-5 md:mt-0 md:p-5 lg:p-10" onSubmit={handleSubmit}>
      <div className="flex justify-between">
        <h5 className="text-xl font-semibold text-orange-600 md:text-3xl">
          Update Blog
        </h5>
        <Button type="submit" className="flex items-center gap-2 bg-orange-600">
          Submit
          {loader && <Spinner className="h-4 w-4" />}
        </Button>
      </div>

      <div className="mt-5 grid gap-2.5 md:mt-10 md:grid-cols-2 md:gap-5">
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
            onChange={(e) => setThumbnail(e.target.files[0])}
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
      </div>

      {/* thumbnail image preview */}
      {thumbnail ? (
        <div className="aspect-w-1 aspect-h-1 relative mt-4 border">
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
        <div className="aspect-w-1 aspect-h-1 relative mt-4 border">
          <img
            src={uploadedPreviewImg}
            alt="thumbnail image"
            className="h-[200px] w-full rounded object-contain md:h-[250px]"
          />
        </div>
      )}

      <div className="mt-4 flex flex-col gap-2.5">
        <label className="font-semibold">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter Title"
          className="rounded border border-gray-400 px-4 py-2 outline-none"
        />
      </div>

      <div className="mt-5 flex flex-col gap-2.5">
        <label className="font-semibold">Slogan</label>
        <textarea
          rows={5}
          type="text"
          name="slogan"
          value={formData.slogan}
          onChange={handleInputChange}
          placeholder="Enter Slogan"
          className="rounded border border-gray-400 px-4 py-2 outline-none"
        />
      </div>

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
}
