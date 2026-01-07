const features = [
  {
    title: "Industry-Level Projects",
    desc: "Real-world applications designed using modern tech stacks.",
    icon: "🚀",
  },
  {
    title: "Admin Dashboards",
    desc: "Secure dashboards with full project & user control.",
    icon: "📊",
  },
  {
    title: "Clean Architecture",
    desc: "Well-structured, scalable & production-ready code.",
    icon: "🧠",
  },
  {
    title: "Secure Backend",
    desc: "JWT authentication, role-based access & MySQL security.",
    icon: "🔐",
  },
  {
    title: "Student Friendly",
    desc: "Easy to understand code with real learning value.",
    icon: "🎓",
  },
  {
    title: "Business Ready",
    desc: "Perfect for startups, freelancers & IT solutions.",
    icon: "💼",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-950 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-3">
            Why <span className="text-blue-500">Choose Us</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We build powerful, real-world projects that help students & businesses
            grow faster with modern technology.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="group bg-gray-900 rounded-xl p-6 border border-gray-800
              hover:border-blue-500 transition-all duration-300
              hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
