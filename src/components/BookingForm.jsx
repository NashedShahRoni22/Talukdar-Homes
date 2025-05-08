import {
  Button,
  Input,
  Option,
  Select,
  Spinner,
  Textarea,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function BookingForm({ handleOpen }) {
  const [loader, setLoader] = useState(false);
  const [firstName, setFirstname] = useState("");
  const [loanType, setLoanType] = useState("");
  const [lastName, setLastname] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const [services, setServices] = useState([]);

  //get services
  useEffect(() => {
    fetch("https://api.talukderhomes.com.au/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === true) {
          setServices(data.data);
        }
      });
  }, []);

  //post appointment
  const addAppointment = async (e) => {
    setLoader(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("service_id", loanType);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("phone", phoneNumber);
    formData.append("email", email);
    formData.append("location", address);
    formData.append("message", message);
    try {
      const response = await fetch(
        "https://api.talukderhomes.com.au/api/appointments/store",
        {
          method: "POST",
          body: formData,
          headers: {
            // Add any necessary headers, such as authorization
          },
        },
      );
      const data = await response.json();
      if (data.status === true) {
        toast.success(data.msg);
        handleOpen();
        setLoader(false);
      }
    } catch (error) {
      console.log("Error:", error);
      setLoader(false);
    }
  };

  return (
    <form className="p-5">
      <h5 className="text-xl font-semibold text-primary lg:text-3xl">
        Book Appointment
      </h5>
      <div className="mt-5 md:mt-10">
        <Select onChange={(value) => setLoanType(value)} label="Select Service">
          {services?.map((s, i) => (
            <Option key={i} value={s?.id}>
              {s?.title}
            </Option>
          ))}
        </Select>
      </div>
      <div className="mt-2.5 grid gap-2.5 md:mt-5 md:grid-cols-2 md:gap-5">
        <Input
          label="First Name"
          required
          type="text"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <Input
          label="Last Name"
          required
          type="text"
          onChange={(e) => setLastname(e.target.value)}
        />
        <Input
          label="Phone Number"
          required
          type="number"
          onChange={(e) => setphoneNumber(e.target.value)}
        />
        <Input
          label="Email"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <Textarea
          label="Enter Address"
          required
          type="text"
          onChange={(e) => setAddress(e.target.value)}
        />
        <Textarea
          label="Enter Message"
          required
          type="text"
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <div className="mt-5 flex gap-2 md:mt-10">
        <button
          onClick={handleOpen}
          className="rounded-full bg-red-500 px-4 py-2 text-white shadow"
        >
          <span>Cancel</span>
        </button>
        <button
          onClick={addAppointment}
          className="ml-2.5 flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-white shadow"
          disabled={
            (firstName === "") |
            (lastName === "") |
            (phoneNumber === "") |
            (email === "") |
            (address === "") |
            (message === "")
          }
        >
          Book Now {loader && <Spinner className="h-4 w-4" />}
        </button>
      </div>
    </form>
  );
}
