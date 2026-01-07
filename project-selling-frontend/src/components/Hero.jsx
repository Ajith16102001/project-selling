export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[80vh] px-6">
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
        Build & Sell <br />
        <span className="text-purple-500">Real-World Projects</span>
      </h1>

      <p className="mt-6 max-w-2xl text-gray-300">
        Startup-ready applications, real-time projects, and practical learning
        solutions for students & businesses.
      </p>

      <div className="mt-10 flex gap-4">
        <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition">
          View Projects
        </button>

        <button className="px-6 py-3 border border-gray-600 hover:border-purple-500 rounded-lg transition">
          Contact Us
        </button>
      </div>
    </section>
  );
}
