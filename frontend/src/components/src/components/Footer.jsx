export default function Footer() {
  return (
    <footer className="bg-indigo-900 text-gray-300 py-4 mt-10">
      <div className="max-w-6xl mx-auto px-4 text-center text-sm">
        © {new Date().getFullYear()} Locked Images. All rights reserved.
      </div>
    </footer>
  );
}
