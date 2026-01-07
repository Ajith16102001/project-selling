import { useEffect, useState } from "react";

import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";

const slides = [
  {
    image: hero1,
    title: "Build & Sell",
    highlight: "Real-World Projects",
    subtitle: "Startup-ready applications & industry-level systems",
  },
  {
    image: hero2,
    title: "Modern",
    highlight: "Admin Dashboards",
    subtitle: "Secure, scalable & real-time management systems",
  },
  {
    image: hero3,
    title: "Production-Grade",
    highlight: "Full-Stack Apps",
    subtitle: "React, Node, MySQL & clean architecture",
  },
];

const HeroSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000); // change every 4 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      {/* Background Image */}
      <div
        key={index}
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{ backgroundImage: `url(${slides[index].image})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <div className="max-w-4xl text-white animate-fade">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {slides[index].title}{" "}
            <span className="text-blue-500">
              {slides[index].highlight}
            </span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl mb-8">
            {slides[index].subtitle}
          </p>

          <div className="flex gap-4 justify-center">
            <a
              href="/projects"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold"
            >
              View Projects
            </a>

            <a
              href="#contact"
              className="border border-white/40 px-6 py-3 rounded hover:bg-white/10"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
