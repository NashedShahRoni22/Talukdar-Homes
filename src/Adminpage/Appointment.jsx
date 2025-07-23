import { Card, Typography } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { AiFillEye } from "react-icons/ai";
import LoaderPage from "../Adminpage/LoaderPage";
import { AuthContext } from "../Providers/AuthProvider";
import toast from "react-hot-toast";
const Appointment = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [loader, setLoader] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [singleAppointment, setSingleAppointment] = useState({});
  const TABLE_HEAD = ["Loan type", "Name", "Phone number", "Email", "View"];
  const [confirmDeleteChecked, setConfirmDeleteChecked] = useState(false);

  const handleOpen = (data) => {
    setOpen(!open);
    setSingleAppointment(data);
  };

  //get appointment..
  useEffect(() => {
    fetch("https://api.talukderhomes.com.au/api/appointments", {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data.data);
        setLoader(false);
      });
  }, [user]);

  //Delete Appointment
  const handaleDeleteAppointment = (oneAppointment) => {
    if (confirmDeleteChecked) {
      fetch(
        `https://api.talukderhomes.com.au/api/appointments/delete/${oneAppointment.id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )
        .then(async (res) => {
          if (!res.ok) {
            throw new Error("Server error occurred");
          }
          return res.json();
        })
        .then((data) => {
          if (data.status === true) {
            const newQueryData = appointments.filter(
              (appoint) => appoint.id !== oneAppointment.id
            );
            toast.success(data.msg);
            setAppointments(newQueryData);
          } else {
            toast.error(data.msg || "Deletion failed");
          }
        })
        .catch((err) => {
          toast.error("Something went wrong");
          console.error("Delete error:", err);
        });
    }
  };

  // State variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(15);

  // Calculate total number of pages
  const totalPages = Math.ceil(appointments.length / perPage);

  // Calculate index of the first and last appointment on the current page
  const indexOfLastAppointment = currentPage * perPage;
  const indexOfFirstAppointment = indexOfLastAppointment - perPage;

  // Slice the appointments array to get appointments for the current page
  const currentAppointments = appointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  // Function to handle page navigation
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Render pagination buttons
  const renderPaginationButtons = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return (
      <div className="mt-5 flex justify-center gap-2">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`rounded-full border px-4 py-2 ${
              currentPage === number ? "bg-orange-600 text-white" : ""
            }`}
          >
            {number}
          </button>
        ))}
      </div>
    );
  };
  return (
    <div className="p-5">
      <h5 className="font-semibold">Appointments : {appointments.length}</h5>
      <div>
        {loader ? (
          <LoaderPage />
        ) : (
          <Card className="mt-5 h-full overflow-auto">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentAppointments?.map((appointment, i) => (
                  <tr key={i} className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {appointment?.service_name}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {`${appointment?.first_name} ${appointment?.last_name}`}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {appointment?.phone}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {appointment?.email}
                      </Typography>
                    </td>
                    <td className="flex p-4">
                      <button
                        onClick={() => handleOpen(appointment)}
                        className="flex items-center gap-2 rounded  border border-orange-600 px-2 py-1 text-orange-600 shadow"
                      >
                        <AiFillEye className="text-xl" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
        {renderPaginationButtons()}

        <Dialog open={open} handler={handleOpen} size="lg">
          <DialogHeader className="text-orange-600">
            Service type : {singleAppointment?.service_name}
          </DialogHeader>

          <DialogBody className="">
            <p className="">
              <span className="font-semibold text-orange-600"> Name : </span>
              {`${singleAppointment?.first_name} ${singleAppointment?.last_name}`}
            </p>
            <p className="mt-2.5">
              <span className="font-semibold text-orange-600">Phone : </span>
              {singleAppointment?.phone}
            </p>
            <p className="fo mt-2.5">
              <span className="font-semibold text-orange-600">Email : </span>
              {singleAppointment?.email}
            </p>
            <p className="mt-2.5">
              <span className="font-semibold text-orange-600">Address : </span>
              <br />
              {singleAppointment?.location}
            </p>
            <p className="mt-2.5">
              <span className="font-semibold text-orange-600">Message : </span>
              <br />
              {singleAppointment?.message}
            </p>
          </DialogBody>
          <DialogFooter className="flex flex-col items-start gap-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={confirmDeleteChecked}
                onChange={(e) => setConfirmDeleteChecked(e.target.checked)}
              />
              I confirm I want to delete this appointment
            </label>

            <div className="flex w-full justify-end gap-3">
              <Button
                onClick={() => {
                  setConfirmDeleteChecked(false);
                  handleOpen();
                }}
                className="bg-orange-600"
                size="sm"
              >
                <span>Close</span>
              </Button>
              <Button
                onClick={() => {
                  handaleDeleteAppointment(singleAppointment);
                  setConfirmDeleteChecked(false);
                  handleOpen();
                }}
                variant="gradient"
                color="red"
                size="sm"
                disabled={!confirmDeleteChecked}
              >
                <span>Delete</span>
              </Button>
            </div>
          </DialogFooter>
        </Dialog>
      </div>
    </div>
  );
};

export default Appointment;
