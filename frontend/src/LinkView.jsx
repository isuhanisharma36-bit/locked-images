// frontend/src/LinkView.jsx
import React, { useState } from "react";

export default function LinkView() {
  const [unlocked, setUnlocked] = useState(false);

  const handleUnlock = () => {
    // ⚡ Later, replace this with real API call to check payment
    setUnlocked(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
      {!unlocked ? (
        <>
          <div className="bg-gray-200 h-48 w-full rounded-lg flex items-center justify-center text-gray-500">
            🔒 Locked Image
          </div>
          <p className="mt-4 text-gray-600">
            Pay to unlock this image and view it securely.
          </p>
          <button
            onClick={handleUnlock}
            className="mt-6 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Pay & Unlock
          </button>
        </>
      ) : (
        <>
          <img
            src="https://via.placeholder.com/400x300.png?text=Unlocked+Image"
