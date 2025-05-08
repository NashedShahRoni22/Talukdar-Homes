import { Input, Textarea } from "@material-tailwind/react";
import { useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import toast from "react-hot-toast";

export default function Contact() {
  const [loader, setLoader] = useState(false);
  const handleContact = async (e) => {
    setLoader(true);
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const message = form.message.value;
    const postData = {
      name,
      email,
      phone,
      address,
      message,
    };
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("message", message);
    try {
      const response = await fetch(
        "https://api.talukderhomes.com.au/api/contacts/store",
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
        form.reset();
        setLoader(false);
      }
    } catch (error) {
      console.log("Error:", error);
      setLoader(false);
    }
  };
  return (
    <section className="mx-5 my-5 flex flex-col gap-5 md:container md:mx-auto md:my-10 md:gap-10">
      <h5 className="text-end text-3xl font-extrabold uppercase md:text-6xl lg:text-8xl">
        Contact
      </h5>
      <div className="mt-10 flex flex-col gap-5 md:mt-20 md:flex-row md:items-center md:gap-10">
        <div className="h-1 w-[50px] bg-primary"></div>
        <p className="text-primary">get in touch</p>
        <p className="text-2xl font-extrabold uppercase md:text-4xl lg:text-6xl">
          WE’D LOVE TO <br /> HEAR FROM YOU
        </p>
      </div>
      <div>
        <form
          onSubmit={handleContact}
          className="flex flex-col gap-8 md:gap-16"
        >
          <p className="text-xl font-extrabold capitalize md:text-2xl lg:text-4xl">
            Information Request
          </p>
          <p className="text-gray-500">
            For more information and how we can meet your needs, please fill out
            the form <br /> below and someone from our team will be in touch.
          </p>
          <div className="flex flex-col gap-5 md:gap-10 lg:flex-row">
            <div
              className="bg-gray-100 p-8 shadow md:p-16 lg:w-1/2"
              data-aos="fade-right"
              data-aos-easing="linear"
              data-aos-duration="1500"
            >
              <div className="grid gap-10 md:grid-cols-2">
                <Input
                  required
                  variant="static"
                  label="Name"
                  name="name"
                  placeholder="Name"
                />
                <Input
                  required
                  variant="static"
                  label="Phone Number"
                  name="phone"
                  placeholder="Phone Number"
                />
                <Input
                  required
                  variant="static"
                  label="Email"
                  name="email"
                  placeholder="Email"
                />
                <Input
                  required
                  variant="static"
                  label="Email"
                  name="address"
                  placeholder="Email"
                />
              </div>
              <div className="mt-10">
                <Textarea
                  required
                  variant="static"
                  label="Message"
                  name="message"
                  placeholder="Say something..."
                />
              </div>
              <button className="group mt-10 flex w-fit items-center gap-2 rounded-full border bg-black px-5 py-2 text-white shadow duration-300 ease-linear hover:border-primary hover:bg-white hover:text-black hover:shadow-xl">
                Submit{" "}
                <span
                  className={`rounded-full bg-primary p-2.5 text-white duration-300 ease-linear group-hover:bg-black ${loader && "animate-spin"}`}
                >
                  <MdOutlineArrowOutward />
                </span>
              </button>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.100741363432!2d150.81423279999998!3d-34.0669317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ee56212a5ca7%3A0x4582dc036b180230!2ssuit%2015%2F186%20Queen%20St%2C%20Campbelltown%20NSW%202560%2C%20Australia!5e0!3m2!1sen!2sbd!4v1717400130764!5m2!1sen!2sbd"
              width="100%"
              height="500"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="lg:w-1/2"
              data-aos="fade-left"
              data-aos-easing="linear"
              data-aos-duration="1500"
            ></iframe>
          </div>
        </form>
      </div>
    </section>
  );
}
