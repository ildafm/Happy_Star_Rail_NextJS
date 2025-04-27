"use client";
import React, { useEffect, useState } from "react";
import { getAllCharacters } from "@/app/libs/starrailapi";
import CharacterCard from "@/app/components/CharacterCard";
import Sidebar from "@/app/components/Sidebar";

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

  // useEffect(() => {
  //   console.log(characters);
  // }, [characters]);

  if (!characters) {
    return "Loading...";
  }

  return (
    <Sidebar>
      <div className="container mx-auto px-4">
        <h1>Characters List</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
          {Object.values(characters).map((character, index) => (
            <div key={index}>
              <CharacterCard character={character} />
              {/* <div>Name: {character.name}</div>
            <div>
              Portrait:{" "}
              <img
                className="object-contain w-24 h-24"
                src={character.portrait}
                alt={character.name}
              />
            </div>
            <div>
              Preview:{" "}
              <img
                className="object-contain w-24 h-24"
                src={character.preview}
                alt={character.name}
              />
            </div>
            <div>
              Icon:{" "}
              <img
                className="object-contain w-24 h-24"
                src={character.icon}
                alt={character.name}
              />
            </div> */}
            </div>
          ))}
        </div>
      </div>
    </Sidebar>
  );
}
