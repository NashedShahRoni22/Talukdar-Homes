import { Button, Input, Option, Select } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { BiCheck, BiEdit, BiPlus } from "react-icons/bi";
import { BsPlusCircle } from "react-icons/bs";
import { CgAdd, CgClose } from "react-icons/cg";
import { MdDelete } from "react-icons/md";

export default function AddCategory() {
  const [loader, setLoader] = useState(false);
  const [category, setCategory] = useState([]);
  const [children, setChildren] = useState([]);
  const [parentId, setParentId] = useState("");
  const [showEditBox, setShowEditBox] = useState(false);

  useEffect(() => {
    fetch("https://api.talukderhomes.com.au/api/categories")
      .then((res) => res.json())
      .then((data) => setCategory(data.data));
  }, []);

  const handleCategory = async (e) => {
    setLoader(true);
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const message = form.message.value;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("message", message);

    try {
      const response = await fetch(
        "https://api.talukderhomes.com.au/api/contacts/store",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.status === true) {
        window.alert(data.msg);
        form.reset();
        setLoader(false);
      }
    } catch (error) {
      console.log("Error:", error);
      setLoader(false);
    }
  };

  return (
    // <div className="p-5 flex flex-col gap-5 md:flex-row">
    //   <div className="md:w-1/4">
    //     <h5 className="font-semibold mb-5">Add Category</h5>
    //     <form className="p-5 shadow rounded flex flex-col gap-1.5">
    //       <Select
    //         label="Select Parent"
    //         onChange={(value) => {
    //           setParentId(value);
    //           const selected = category.find((c) => c.id.toString() === value);
    //           if (selected?.children) {
    //             setChildren(selected.children);
    //           } else {
    //             setChildren([]);
    //           }
    //         }}
    //       >
    //         {category.map((c) => (
    //           <Option key={c.id} value={c.id.toString()}>
    //             {c.title}
    //           </Option>
    //         ))}
    //       </Select>
    //       <Input label="Enter Category Name" name="name" />
    //       <Button className="bg-primary" type="submit">
    //         Submit
    //       </Button>
    //     </form>
    //   </div>

    //   <div className="">
    //     <h5 className="font-semibold">Sub Category</h5>
    //     {children.length > 0 ? (
    //       <ul className="list-disc ml-8 mt-4">
    //         {children.map((child) => (
    //           <li key={child.id}>{child.title}</li>
    //         ))}
    //       </ul>
    //     ) : (
    //       <p className="text-sm text-red-500 ml-8 mt-4">No children found.</p>
    //     )}
    //   </div>
    // </div>
    <div className="p-5">
      <div className="flex justify-between items-center">
        <h5 className="font-semibold mb-5">Add Category</h5>
        {showEditBox ? (
          <div className="px-2 mt-2 flex gap-1 items-center">
            <input
              type="text"
              placeholder="Category Name"
              className="px-1.5 py-2 border text-sm rounded w-full  focus:outline-none"
            />
            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowEditBox(false)}
                className="p-1.5 rounded-full bg-orange-50"
              >
                <CgClose className="text-orange-500 text-xl" />
              </button>
              <button className="p-1.5 rounded-full bg-red-100">
                <BiCheck className="text-red-500 text-xl" />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowEditBox(true)}
            className="px-4 py-2 flex gap-2 items-center bg-primary text-white shadow rounded text-sm font-semibold"
          >
            <BiPlus className="text-2xl" />
            New Category
          </button>
        )}
      </div>
      <div className="mt-5 grid grid-cols-2 lg:grid-cols-3 gap-5">
        {category.map((c, i) => (
          <div
            key={i}
            className="shadow rounded h-[350px] overflow-y-auto relative"
          >
            <h5 className="bg-primary text-white p-2.5 text-center">
              {c?.title}
            </h5>
            <ul className="list-disc text-sm">
              {c?.children?.map((cc, k) => (
                <li
                  key={k}
                  className="border-b py-1.5 px-2.5 flex items-center justify-between"
                >
                  <span>{cc?.title}</span>
                  <div>
                    <button className="p-1.5 rounded-full hover:bg-orange-50">
                      <BiEdit className="text-orange-500 text-xl" />
                    </button>
                    <button className="p-1.5 rounded-full hover:bg-red-100">
                      <MdDelete className="text-red-500 text-xl" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {parentId === c?.parent_id ? (
              <div className="px-2 mt-2 flex gap-1 items-center">
                <input
                  type="text"
                  placeholder="Category Name"
                  className="px-1.5 py-2 border text-sm rounded w-full  focus:outline-none"
                />
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setParentId("")}
                    className="p-1.5 rounded-full bg-orange-50"
                  >
                    <CgClose className="text-orange-500 text-xl" />
                  </button>
                  <button className="p-1.5 rounded-full bg-red-100">
                    <BiCheck className="text-red-500 text-xl" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                className="bg-primary flex gap-2 items-center justify-center absolute bottom-0 left-0 w-full py-1.5 text-sm font-semibold text-white"
                onClick={() => setParentId(c?.parent_id)}
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
