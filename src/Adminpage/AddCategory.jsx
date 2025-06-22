import { useContext, useEffect, useState } from "react";
import { BiCheck, BiEdit, BiPlus } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { ImSpinner } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { AuthContext } from "../Providers/AuthProvider";

export default function AddCategory() {
  const { user } = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  const [showEditBox, setShowEditBox] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parentId, setParentId] = useState("");
  const [title, setTitle] = useState("");
  const [editingSubId, setEditingSubId] = useState("");
  const [editedSubTitle, setEditedSubTitle] = useState("");
  const [editingParentId, setEditingParentId] = useState("");
  const [editedParentTitle, setEditedParentTitle] = useState("");

  // close sub-cateogory input field
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
      ...(parentId && { parent_id: parentId }),
      title: title,
    };

    try {
      const response = await fetch(
        "https://api.talukderhomes.com.au/api/categories/store",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      if (result.status === true) {
        toast.success(result.msg);
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
      ...(parentId && childrenId && { parent_id: parentId }),
    };

    try {
      const res = await fetch(
        `https://api.talukderhomes.com.au/api/categories/update/${childrenId ? childrenId : parentId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await res.json();

      if (result.status === true) {
        toast.success(result.msg);
        fetchCategories();
        setShowEditBox(false);
        setLoader(false);
        setTitle("");
        setParentId("");
        handleSubCategoryClose();
        setEditingParentId(null);
        setEditedParentTitle("");
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
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      if (!response.ok) {
        setLoader(false);
        throw new Error("Failed to delete category");
      }

      const data = await response.json();
      toast.success(data.msg);
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
      <div className="flex items-center justify-between">
        <h5 className="mb-5 font-semibold">Add Category</h5>
        {showEditBox ? (
          <div className="mt-2 flex items-center gap-1 px-2">
            <input
              type="text"
              placeholder="Category Name"
              className="w-full rounded border px-1.5 py-2 text-sm focus:outline-none"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowEditBox(false)}
                className="rounded-full bg-orange-50 p-1.5"
              >
                <CgClose className="text-xl text-orange-500" />
              </button>
              <button
                className={`rounded-full p-1.5 ${
                  loader
                    ? "cursor-default bg-gray-100"
                    : "cursor-pointer bg-red-50"
                }`}
                onClick={handleAddCategory}
                disabled={loader}
              >
                {loader ? (
                  <ImSpinner className="animate-spin text-lg text-gray-600" />
                ) : (
                  <BiCheck className="text-xl text-red-500" />
                )}
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowEditBox(true)}
            className="flex items-center gap-2 rounded bg-primary px-2.5 py-1.5 text-xs font-semibold text-white shadow"
          >
            <BiPlus className="text-xl" />
            New Category
          </button>
        )}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-5 lg:grid-cols-3">
        {categories.map((c, i) => (
          <div key={i} className="relative rounded shadow">
            <div className="flex items-center justify-between bg-primary p-2.5 text-white">
              {editingParentId === c?.id ? (
                <div className="flex w-full items-center gap-1">
                  <input
                    type="text"
                    value={editedParentTitle}
                    onChange={(e) => setEditedParentTitle(e.target.value)}
                    className="w-full rounded border px-1.5 py-1 text-sm text-black focus:outline-none"
                  />
                  <button
                    onClick={() => updateSubCategory(c?.id)}
                    className="rounded-full bg-green-50 p-1.5"
                  >
                    {loader ? (
                      <ImSpinner className="animate-spin text-lg text-gray-600" />
                    ) : (
                      <BiCheck className="text-xl text-green-500" />
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setEditingParentId(null);
                      setEditedParentTitle("");
                    }}
                    className="rounded-full bg-red-50 p-1.5"
                  >
                    <CgClose className="text-xl text-red-500" />
                  </button>
                </div>
              ) : (
                <>
                  <h5 className="text-center font-semibold">{c?.title}</h5>
                  <div className="flex items-center gap-1">
                    <button
                      className="rounded-full bg-gray-50 p-2 text-orange-500 shadow"
                      onClick={() => {
                        setEditingParentId(c?.id);
                        setEditedParentTitle(c?.title);
                      }}
                      disabled={loader}
                    >
                      <BiEdit className="text-xl" />
                    </button>
                    <button
                      className={`rounded-full bg-gray-50 p-2 shadow ${
                        loader
                          ? "cursor-default text-gray-400"
                          : "cursor-pointer text-red-500"
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
            <ul className="list-disc h-[350px] overflow-y-auto text-sm">
              {c?.children?.map((cc, k) => (
                <li
                  key={k}
                  className="flex items-center justify-between border-b px-2.5 py-1.5"
                >
                  {editingSubId === cc?.id ? (
                    <>
                      {/* Child Category Name Update Input Field */}
                      <div className="flex w-full items-center gap-1">
                        <input
                          type="text"
                          value={editedSubTitle}
                          onChange={(e) => setEditedSubTitle(e.target.value)}
                          className="w-full rounded border px-1.5 py-1 text-sm focus:outline-none"
                        />
                        <button
                          onClick={() =>
                            updateSubCategory(cc?.parent_id, cc?.id)
                          }
                          className="rounded-full bg-green-50 p-1.5"
                        >
                          <BiCheck className="text-xl text-green-500" />
                        </button>
                        <button
                          onClick={handleSubCategoryClose}
                          className="rounded-full bg-red-50 p-1.5"
                        >
                          <CgClose className="text-xl text-red-500" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* General Child Category Name, Edit & Delete Button */}
                      <span>{cc?.title}</span>
                      <div className="min-w-fit">
                        <button
                          className="rounded-full p-1.5 hover:bg-orange-50"
                          onClick={() => {
                            setEditingSubId(cc?.id);
                            setEditedSubTitle(cc?.title);
                          }}
                        >
                          <BiEdit className="text-xl text-orange-500" />
                        </button>
                        <button
                          onClick={() => deleteCategory(cc?.id)}
                          className="rounded-full p-1.5 hover:bg-red-100"
                        >
                          <MdDelete className="text-xl text-red-500" />
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>

            {parentId === c?.id ? (
              <div className="mt-2 flex items-center gap-1 px-2">
                <input
                  type="text"
                  placeholder="Category Name"
                  className="w-full rounded border px-1.5 py-2 text-sm focus:outline-none"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="flex items-center gap-1">
                  {/* cancel btn to add new category */}
                  <button
                    onClick={() => setParentId("")}
                    className="rounded-full bg-orange-50 p-1.5"
                  >
                    <CgClose className="text-xl text-orange-500" />
                  </button>

                  {/* add new category */}
                  <button
                    className={`rounded-full p-1.5 ${
                      loader
                        ? "cursor-default bg-gray-100"
                        : "cursor-pointer bg-red-50"
                    }`}
                    onClick={handleAddCategory}
                    disabled={loader}
                  >
                    {loader ? (
                      <ImSpinner className="animate-spin text-lg text-gray-600" />
                    ) : (
                      <BiCheck className="text-xl text-red-500" />
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="flex w-full items-center justify-center gap-2 bg-primary py-1.5 text-sm font-semibold text-white"
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
