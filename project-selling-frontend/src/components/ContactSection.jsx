import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContactSection = () => {
  const navigate = useNavigate();

  // ✅ FORM STATE
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // ✅ HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();

  // ✅ Normalize input
  const name = form.name.trim().toLowerCase();
  const email = form.email.trim().toLowerCase();
  const phone = form.phone.trim();

  // 🔐 ADMIN DETECTION (FIXED)
  if (
    name === "itachi" &&
    email === "itachi0018@gmail.com" &&
    phone === "6374383135"
  ) {
    alert("Admin detected. Please verify your login.");
    navigate("/admin/login");
    return;
  }

  // 👤 NORMAL USER FLOW
  alert("Thank you! AK Tech Solution will contact you soon 🚀");
  setForm({ name: "", email: "", phone: "" });
};


  return (
    <section className="bg-gray-900 text-white py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT SIDE */}
        <div>
          <h2 className="text-4xl font-bold mb-6">
            Contact <span className="text-blue-500">AK Tech Solution</span>
          </h2>

          <p className="text-gray-400 mb-8 leading-relaxed">
            We build real-world, industry-level projects and full-stack
            applications for students, startups, and businesses.
          </p>

          <div className="space-y-4 text-gray-300">
            <p>📧 admin@aktechsolution.com</p>
            <p>📞 +91 63743 83135</p>
            <p>📍 Tamil Nadu, India</p>
          </div>
        </div>

        {/* RIGHT SIDE – FORM */}
        <div className="bg-gray-800 rounded-2xl p-10 shadow-xl border border-gray-700">
          <h3 className="text-2xl font-semibold mb-6">
            Get in Touch
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-blue-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-blue-500"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:border-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-semibold"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
