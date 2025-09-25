import { motion } from "framer-motion";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
      <motion.div
        className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-10 max-w-lg text-center"
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl font-bold text-white mb-4"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          🚀 Hello Tailwind + Animations
        </motion.h1>

        <motion.p
          className="text-white/80 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Your Tailwind + Framer Motion setup is live.  
          Smooth animations and clean UI 🎨
        </motion.p>

        <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-6 py-2 rounded-xl bg-indigo-500 text-white font-medium shadow-lg hover:bg-indigo-600 transition"
          >
            Primary
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-6 py-2 rounded-xl bg-pink-500 text-white font-medium shadow-lg hover:bg-pink-600 transition"
          >
            Secondary
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
