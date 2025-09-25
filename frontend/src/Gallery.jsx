import { motion } from "framer-motion";

const images = [
  "https://source.unsplash.com/random/400x400?sig=1",
  "https://source.unsplash.com/random/400x400?sig=2",
  "https://source.unsplash.com/random/400x400?sig=3",
  "https://source.unsplash.com/random/400x400?sig=4",
  "https://source.unsplash.com/random/400x400?sig=5",
  "https://source.unsplash.com/random/400x400?sig=6",
];

export default function Gallery() {
  return (
    <div className="py-16 px-8 text-center">
      <h2 className="text-4xl font-bold text-white mb-12 drop-shadow-lg">
        ✨ Our Gallery
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="overflow-hidden rounded-2xl shadow-lg"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <img
              src={img}
              alt={`Gallery ${index}`}
              className="w-full h-64 object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
