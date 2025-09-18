"use client";

import { useRef } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

// components
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "(+91) 9284244459",
    action: () => (window.location.href = "tel:+919284244459"),
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "mandviyabhavya@gmail.com",
    action: () => (window.location.href = "mailto:mandviyabhavya@gmail.com"),
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Location",
    description: "Vadodara, Gujarat, India",
    action: () =>
      window.open(
        "https://www.google.com/maps/search/B60+Mangalam+park+rajeshtower+road+gotri+side+of+Patanjali+store,+D58,+Mangalam+Park,+Gotri,+Vadodara,+Gujarat+-+390021/@22.3156416,73.1476879,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDYxNy4wIKXMDSoASAFQAw%3D%3D",
        "_blank"
      ),
  },
];

const Contact = () => {
  const formRef = useRef(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Validation checks
    if (
      !formData.get("name") ||
      !formData.get("email") ||
      !formData.get("message")
    ) {
      Swal.fire({
        title: "Error!",
        text: "All fields are required.",
        icon: "error",
      });
      return;
    }

    const email = formData.get("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire({
        title: "Error!",
        text: "Invalid email format.",
        icon: "error",
      });
      return;
    }

    const name = formData.get("name");
    const userEmail = formData.get("email");
    const message = formData.get("message");

    try {
      // Send form data to your API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email: userEmail,
          message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        Swal.fire({
          title: "Success!",
          text: "Message sent successfully! Check your email for confirmation.",
          icon: "success",
        });
        formRef.current.reset();
      } else {
        throw new Error(result.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
      });
    }
  }

  return (
    <motion.div
      initial={{ y: "-200vh" }}
      animate={{ y: "0%" }}
      transition={{ duration: 1 }}
      className="min-h-[80vh] flex items-center justify-center py-12"
    >
      <div className="container mx-auto">
        <div className="w-full flex flex-col xl:flex-row justify-center items-center gap-[30px]">
          {/* text */}
          <div className="w-full h-[524px] max-w-[500px] flex flex-col justify-between gap-6">
            {/* message */}
            <div className="flex flex-col justify-center items-center gap-2 rounded-xl p-[30px] bg-black/10 text-white">
              <h3 className="h3 text-center w-full">Let's connect!</h3>
              <p className="p max-w-[336px] mx-auto text-center">
                Reach out to discuss opportunities, projects, or simply to start
                a conversation.
              </p>
            </div>
            {/* info */}
            <div className="h-full flex flex-col items-center justify-center rounded-xl p-8 bg-black/10 text-white">
              <ul className="flex flex-col gap-[30px]">
                {info.map((item, index) => {
                  return (
                    <li key={index} className="flex items-center gap-6">
                      <div
                        className="w-12 h-12 bg-secondary text-[#70757f] rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 hover:text-primary transition-all duration-500"
                        onClick={item.action}
                      >
                        <div className="text-xl">{item.icon}</div>
                      </div>
                      <div className="flex-1">
                        <p className="uppercase text-[#70757f]">{item.title}</p>
                        <h3 className="text-base uppercase text-white/60">
                          {item.description}
                        </h3>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* form */}
          <div className="w-full max-w-[500px]">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 p-8 bg-secondary rounded-xl"
            >
              <p className="text-[16px] uppercase text-white/60">
                Fill out the form below to get in touch:
              </p>
              <Input name="name" type="text" placeholder="Your name" required />
              <Input
                name="email"
                type="email"
                placeholder="Your email"
                required
              />
              <Textarea
                name="message"
                className="h-[200px]"
                placeholder="Type your message here!"
                required
              />
              <Button
                type="submit"
                className="max-w-40 uppercase bg-[#70757f] text-gray-50 hover:text-black hover:bg-white transition-all duration-500"
              >
                Send email
              </Button>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;