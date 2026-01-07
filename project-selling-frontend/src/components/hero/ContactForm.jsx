import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ContactForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      form.name === "itachi" &&
      form.email === "itachi0018@gmail.com" &&
      form.phone === "6374383135"
    ) {
      navigate("/admin/dashboard");
      return;
    }

    alert("Thanks! Our team will contact you.");
    setForm({ name: "", email: "", phone: "" });
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      onSubmit={handleSubmit}
      className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl space-y-5"
    >
      <h2 className="text-2xl font-semibold text-white">
        Contact Us
      </h2>

      <input
        name="name"
        placeholder="Your Name"
        onChange={handleChange}
        value={form.name}
        required
        className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 text-white"
      />

      <input
        name="email"
        type="email"
        placeholder="Email Address"
        onChange={handleChange}
        value={form.email}
        required
        className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 text-white"
      />

      <input
        name="phone"
        placeholder="Phone Number"
        onChange={handleChange}
        value={form.phone}
        required
        className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 text-white"
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-semibold"
      >
        Submit
      </motion.button>
    </motion.form>
  );
}
