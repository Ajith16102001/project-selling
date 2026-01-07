import { motion } from "framer-motion";

export default function HeroContent() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-5xl font-extrabold leading-tight"
      >
        Build & Sell{" "}
        <span className="text-blue-500">Real-World Projects</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-gray-300 text-lg"
      >
        Startup-ready applications, real-time systems, and production-grade
        projects for students & businesses.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-2 gap-4 text-sm text-gray-300"
      >
        <p>🚀 Industry-level projects</p>
        <p>🧠 Clean architecture</p>
        <p>📊 Admin dashboards</p>
        <p>🔐 Secure backend</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="pt-4 text-sm"
      >
        <p>📧 admin@aktechsolution.com</p>
        <p>📞 +91 6374383135</p>
      </motion.div>
    </motion.div>
  );
}
