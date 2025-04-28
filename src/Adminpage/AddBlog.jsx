import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import { Button, Spinner } from "@material-tailwind/react";
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

const AddBlog = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  // add a new blog submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoader(true);

    const title = e.target.title.value;
    const slogan = e.target.slogan.value;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("slogan", slogan);
    formData.append("image", thumbnail);
    formData.append("content", content);

    try {
      const response = await fetch(
        "https://api.talukderhomes.com.au/api/blogs/store",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.status === true) {
        window.alert(data.msg);
        setLoader(false);
        navigate("/admin/manage-blog");
      }
      // Handle response data as needed
    } catch (error) {
      console.error("Error:", error);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  return (
    <form className="mt-5 md:mt-0 md:p-5 lg:p-10" onSubmit={handleSubmit}>
      <div className="flex justify-between">
        <h5 className="text-xl md:text-3xl text-orange-600 font-semibold">
          Add Blog
        </h5>
        <Button type="submit" className="bg-orange-600 flex gap-2 items-center">
          Submit
          {loader && <Spinner className="h-4 w-4" />}
        </Button>
      </div>
      <div className="grid md:grid-cols-2 gap-2.5 md:gap-5 mt-5 md:mt-10">
        <div className="flex flex-col gap-2.5">
          <label>Select Image</label>
          <input
            type="file"
            className=""
            onChange={(e) => setThumbnail(e.target.files[0])}
          />
        </div>
        <div className="flex flex-col gap-2.5">
          <label>Enter Name</label>
          <input
            type="text"
            name="title"
            className="px-4 py-2 outline-none border border-gray-400 rounded"
            placeholder="Enter Name"
          />
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-2.5">
        <label>Enter Slogan</label>
        <textarea
          type="text"
          name="slogan"
          className="px-4 py-2 outline-none border border-gray-400 rounded"
          placeholder="Enter Slogan"
          rows={5}
        />
      </div>
      <div className="mt-5 flex flex-col gap-2.5">
        <label className="">Enter Content</label>
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          className="py-2 w-full h-[300px]"
        />
      </div>
    </form>
  );
};

export default AddBlog;
