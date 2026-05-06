import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast.error("Email service is not configured properly.", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
      setLoading(false);
      return;
    }

    emailjs
      .sendForm(
        serviceId,
        templateId,
        form.current,
        publicKey
      )
      .then(() => {
        form.current.reset();
        toast.success("Message sent successfully ✅!  Check your inbox.", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to send message. Try again.", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <section
      id="contact"
      className="relative py-24 px-5 sm:px-[7vw] lg:px-[20vw] flex flex-col items-center"
    >
      <ToastContainer />

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-pink-900/20 blur-3xl pointer-events-none"></div>

      {/* Title */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl sm:text-5xl font-bold text-white">
          Get In Touch
        </h2>
        <div className="w-28 h-[3px] bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-4"></div>
        <p className="text-gray-400 mt-4 text-base sm:text-lg max-w-xl mx-auto">
          Have a project in mind or just want to connect? I’d love to hear from you.
        </p>
      </div>

      {/* Form Card */}
      <div
        className="relative z-10 w-full max-w-lg p-8 rounded-2xl 
        bg-white/5 backdrop-blur-lg border border-white/10 
        shadow-xl hover:shadow-purple-500/20 transition duration-300"
      >
        <h3 className="text-xl font-semibold text-white text-center mb-6">
          Let’s Connect 🚀
        </h3>

        <form ref={form} onSubmit={sendEmail} className="flex flex-col gap-4">
          
          {/* Input Field */}
          <input
            type="email"
            name="user_email"
            placeholder="Your Email"
            required
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white 
            focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
          />

          <input
            type="text"
            name="user_name"
            placeholder="Your Name"
            required
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white 
            focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            required
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white 
            focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition"
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            required
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white 
            focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition resize-none"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full py-3 rounded-lg font-semibold text-white 
            bg-gradient-to-r from-purple-600 to-pink-500 
            hover:opacity-90 hover:scale-[1.02] transition duration-300 
            disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;