"use client";
import React, { useEffect, useState } from "react";
import { getAllCharacters } from "@/app/libs/starrailapi";

export default function page() {
  const [characters, setCharacters] = useState(false);

  useEffect(() => {
    async function fetchCharacters() {
      const data = await getAllCharacters();
      console.log(data);

      setCharacters(data);
    }

    fetchCharacters();
  }, []);

  useEffect(() => {
    console.log(characters);
  }, [characters]);

  if (!characters) {
    return "Loading...";
  }

  return (
    <div>
      <h1>Characters List</h1>
      {Object.values(characters).map((character, index) => (
        <div key={index}>
          <div>Name: {character.name}</div>
          <div>
            Icon: <img src={character.icon} alt={character.name} />
          </div>
        </div>
      ))}
    </div>
  );
}
