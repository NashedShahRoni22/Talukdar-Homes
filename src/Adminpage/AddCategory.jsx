import { useEffect, useState } from "react";
import { BiCheck, BiEdit, BiPlus } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { ImSpinner } from "react-icons/im";
import { MdDelete } from "react-icons/md";

export default function AddCategory() {
  const [loader, setLoader] = useState(false);
  const [showEditBox, setShowEditBox] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parentId, setParentId] = useState("");
  const [title, setTitle] = useState("");
  const [editingSubId, setEditingSubId] = useState("");
  const [editedSubTitle, setEditedSubTitle] = useState("");
  const [editingParentId, setEditingParentId] = useState(null);
  const [editedParentTitle, setEditedParentTitle] = useState("");

  const handleSubCategoryClose = () => {
    setEditingSubId(null);
    setEditedSubTitle("");
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

  // Add new category
  const handleAddCategory = async () => {
    setLoader(true);

    const data = {
      parent_id: parentId,
      title: title,
    };

    try {
      const response = await fetch(
        "https://api.talukderhomes.com.au/api/categories/store",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (result.status === true) {
        window.alert(result.msg);
        fetchCategories();
        setShowEditBox(false);
        setLoader(false);
        setTitle("");
        setParentId("");
      }
    } catch (error) {
      console.log("Error:", error);
      setLoader(false);
    }
  };

  // Update Sub-category
  const updateSubCategory = async (parentId, childrenId) => {
    setLoader(true);

    const payload = {
      title: editedSubTitle ? editedSubTitle : editedParentTitle,
      parent_id: parentId,
    };

    try {
      const res = await fetch(
        `https://api.talukderhomes.com.au/api/categories/update/${childrenId ? childrenId : parentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (result.status === true) {
        window.alert(result.msg);
        fetchCategories();
        setShowEditBox(false);
        setLoader(false);
        setTitle("");
        setParentId("");
        handleSubCategoryClose();
      }
    } catch (err) {
      console.log("Error:", err);
      setLoader(false);
    }
  };

  // Delete category
  const deleteCategory = async (categoryId) => {
    setLoader(true);

    try {
      const response = await fetch(
        `https://api.talukderhomes.com.au/api/categories/delete/${categoryId}`,
        {
          method: "GET", // Using GET (again, not recommended for deletion)
        }
      );

      if (!response.ok) {
        setLoader(false);
        throw new Error("Failed to delete category");
      }

      const data = await response.json();
      window.alert(data.msg);
      setLoader(false);
      fetchCategories();
    } catch (error) {
      setLoader(false);
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <h5 className="font-semibold mb-5">Add Category</h5>
        {showEditBox ? (
          <div className="px-2 mt-2 flex gap-1 items-center">
            <input
              type="text"
              placeholder="Category Name"
              className="px-1.5 py-2 border text-sm rounded w-full  focus:outline-none"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowEditBox(false)}
                className="p-1.5 rounded-full bg-orange-50"
              >
                <CgClose className="text-orange-500 text-xl" />
              </button>
              <button
                className={`p-1.5 rounded-full  ${
                  loader
                    ? "cursor-default bg-gray-100"
                    : "cursor-pointer bg-red-50"
                }`}
                onClick={handleAddCategory}
                disabled={loader}
              >
                {loader ? (
                  <ImSpinner className="text-lg text-gray-600 animate-spin" />
                ) : (
                  <BiCheck className="text-red-500 text-xl" />
                )}
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowEditBox(true)}
            className="px-2.5 py-1.5 flex gap-2 items-center bg-primary text-white shadow rounded text-xs font-semibold"
          >
            <BiPlus className="text-xl" />
            New Category
          </button>
        )}
      </div>
      <div className="mt-5 grid grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((c, i) => (
          <div
            key={i}
            className="shadow rounded h-[350px] overflow-y-auto relative"
          >
            <div className="bg-primary text-white p-2.5 flex justify-between items-center">
              {editingParentId === c?.id ? (
                <div className="flex items-center gap-1 w-full">
                  <input
                    type="text"
                    value={editedParentTitle}
                    onChange={(e) => setEditedParentTitle(e.target.value)}
                    className="px-1.5 py-1 border text-sm rounded w-full focus:outline-none text-black"
                  />
                  <button
                    onClick={() => updateSubCategory(c?.id)}
                    className="p-1.5 rounded-full bg-green-50"
                  >
                    <BiCheck className="text-green-500 text-xl" />
                  </button>
                  <button
                    onClick={() => {
                      setEditingParentId(null);
                      setEditedParentTitle("");
                    }}
                    className="p-1.5 rounded-full bg-red-50"
                  >
                    <CgClose className="text-red-500 text-xl" />
                  </button>
                </div>
              ) : (
                <>
                  <h5 className="text-center font-semibold">{c?.title}</h5>
                  <div className="flex items-center gap-1">
                    <button
                      className="p-2 shadow rounded-full bg-gray-50 text-orange-500"
                      onClick={() => {
                        setEditingParentId(c?.id);
                        setEditedParentTitle(c?.title);
                      }}
                      disabled={loader}
                    >
                      <BiEdit className="text-xl" />
                    </button>
                    <button
                      className={`p-2 shadow rounded-full bg-gray-50 ${
                        loader
                          ? "text-gray-400 cursor-default"
                          : "text-red-500 cursor-pointer"
                      }`}
                      onClick={() => deleteCategory(c?.id)}
                      disabled={loader}
                    >
                      <MdDelete className="text-xl" />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Child Categories List */}
            <ul className="list-disc text-sm">
              {c?.children?.map((cc, k) => (
                <li
                  key={k}
                  className="border-b py-1.5 px-2.5 flex items-center justify-between"
                >
                  {editingSubId === cc?.id ? (
                    <>
                      {/* Child Category Name Update Input Field */}
                      <div className="flex items-center gap-1 w-full">
                        <input
                          type="text"
                          value={editedSubTitle}
                          onChange={(e) => setEditedSubTitle(e.target.value)}
                          className="px-1.5 py-1 border text-sm rounded w-full focus:outline-none"
                        />
                        <button
                          onClick={() =>
                            updateSubCategory(cc?.parent_id, cc?.id)
                          }
                          className="p-1.5 rounded-full bg-green-50"
                        >
                          <BiCheck className="text-green-500 text-xl" />
                        </button>
                        <button
                          onClick={handleSubCategoryClose}
                          className="p-1.5 rounded-full bg-red-50"
                        >
                          <CgClose className="text-red-500 text-xl" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* General Child Category Name, Edit & Delete Button */}
                      <span>{cc?.title}</span>
                      <div>
                        <button
                          className="p-1.5 rounded-full hover:bg-orange-50"
                          onClick={() => {
                            setEditingSubId(cc?.id);
                            setEditedSubTitle(cc?.title);
                          }}
                        >
                          <BiEdit className="text-orange-500 text-xl" />
                        </button>
                        <button
                          onClick={() => deleteCategory(cc?.id)}
                          className="p-1.5 rounded-full hover:bg-red-100"
                        >
                          <MdDelete className="text-red-500 text-xl" />
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>

            {parentId === c?.id ? (
              <div className="px-2 mt-2 flex gap-1 items-center">
                <input
                  type="text"
                  placeholder="Category Name"
                  className="px-1.5 py-2 border text-sm rounded w-full  focus:outline-none"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="flex items-center gap-1">
                  {/* cancel btn to add new category */}
                  <button
                    onClick={() => setParentId("")}
                    className="p-1.5 rounded-full bg-orange-50"
                  >
                    <CgClose className="text-orange-500 text-xl" />
                  </button>

                  {/* add new category */}
                  <button
                    className={`p-1.5 rounded-full  ${
                      loader
                        ? "cursor-default bg-gray-100"
                        : "cursor-pointer bg-red-50"
                    }`}
                    onClick={handleAddCategory}
                    disabled={loader}
                  >
                    {loader ? (
                      <ImSpinner className="text-lg text-gray-600 animate-spin" />
                    ) : (
                      <BiCheck className="text-red-500 text-xl" />
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="bg-primary flex gap-2 items-center justify-center absolute bottom-0 left-0 w-full py-1.5 text-sm font-semibold text-white"
                onClick={() => setParentId(c?.id)}
              >
                <BiPlus className="text-2xl" />
                Add New
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
