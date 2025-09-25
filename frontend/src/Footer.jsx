import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <motion.div
        className="container mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-sm">
          © {new Date().getFullYear()} Locked Images. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Built with ❤️ using React, Tailwind, and Framer Motion.
        </p>
      </motion.div>
    </footer>
  );
}
