import { Link } from "react-router-dom";
import { GoSignOut } from "react-icons/go";
import { BiChevronRightCircle } from "react-icons/bi";

const Leftbar = ({setShow}) => {
  const menus = [
    {
      name: "Appointment",
      link: "/admin",
    },
    {
      name: "Contact Message",
      link: "/admin/contact",
    },
    {
      name: "Add Product",
      link: "/admin/addService",
    },
    {
      name: "Manage Product",
      link: "/admin/manageService",
    },
    {
      name: "Add Blog",
      link: "/admin/add_blog",
    },
    {
      name: "Manage Blog",
      link: "/admin/manage_blog",
    },
  ];
  return (
    <div className="flex flex-col p-5 shadow-xl min-h-screen sticky top-0">
      <p className="text-xl font-semibold text-primary mb-5 text-center">Talukdar Homes</p>
      {menus.map((m, i) => (
        <Link
          key={i}
          to={m.link}
          onClick={()=> setShow(false)}
          className="shadow p-2.5 min-w-full text-center md:text-left flex justify-between items-center"
        >
          {m.name}
          <BiChevronRightCircle className="text-primary text-xl" />
        </Link>
      ))}
      <div className="flex justify-center absolute bottom-4 min-w-full">
        <Link
          className="px-4 py-2 text-sm bg-red-500 text-white w-fit rounded shadow flex gap-2 items-center"
          to="/"
          onClick={() => localStorage.removeItem("thAccessToken")}
        >
          {" "}
          <GoSignOut className="text-xl" /> Log Out
        </Link>
      </div>
    </div>
  );
};

export default Leftbar;
