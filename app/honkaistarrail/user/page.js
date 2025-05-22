"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [uid, setUid] = useState("800333171");
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCharacters = async () => {
    setLoading(true);
    const res = await fetch(`/api/character?uid=${uid}`);
    const data = await res.json();
    console.log(data);

    setCharacters(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Karakter Kamu</h1>

      <input
        type="text"
        value={uid}
        onChange={(e) => setUid(e.target.value)}
        className="border p-2 mb-4"
        placeholder="Masukkan UID"
      />
      <button
        onClick={fetchCharacters}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Cari Karakter
      </button>

      {loading && <p>Loading...</p>}

      <ul>
        {characters.map((char, index) => (
          <li key={index} className="flex items-center space-x-4 p-2 rounded">
            <img
              src={char.icon}
              alt={char.name}
              width={48}
              height={48}
              className="rounded"
            />
            <div>
              <p>🌟 {char.name}</p>
              <p>Level: {char.level}</p>
              <p>Rarity: {char.rarity}⭐</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
