export default function Navbar() {
  return (
    <nav className="bg-indigo-800 text-white py-4 shadow">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">🔒 Locked Images</h1>
        <a
          href="/"
          className="bg-white text-indigo-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Upload
        </a>
      </div>
    </nav>
  );
}
