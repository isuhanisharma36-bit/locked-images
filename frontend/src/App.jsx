import React from "react";

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-10 shadow-xl max-w-xl text-center">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-md">Hello Tailwind 🚀</h1>
        <p className="mt-4 text-white/90">Your Tailwind setup is working — nice and simple UI.</p>

        <div className="mt-8 flex justify-center gap-3">
          <button className="bg-white/20 hover:bg-white/30 text-white px-5 py-2 rounded-lg transition">
            Primary
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white px-5 py-2 rounded-lg transition">
            Secondary
          </button>
        </div>
      </div>
    </div>
  );
}
