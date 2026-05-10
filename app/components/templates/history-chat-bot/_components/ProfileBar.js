import React from "react";

export default function ProfileBar() {
  return (
    <aside className="w-64 bg-gray-800 border-l p-4 hidden md:block">
      <div className="flex flex-col items-center text-center">
        <img
          src="/img/herta_profile.jpg"
          alt="Herta"
          className="w-32 h-32 rounded-full mb-4 object-cover"
        />
        <h3 className="font-bold">Herta</h3>
        <p className="text-sm text-gray-500">Genius Society #83</p>
      </div>
    </aside>
  );
}
