import React from "react";
const audioList = {
  1: "Star Rail",
  2: "Faded Sun",
  3: "Hope Is the Thing With Feather",
  4: "Wildfire",
};

export default function AudioSelector({ onSelect }) {
  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      className="p-1 border rounded dark:text-white dark:bg-black"
      style={{ width: "100px" }}
    >
      {Object.entries(audioList).map(([key, label]) => (
        <option key={key} value={key}>
          {label}
        </option>
      ))}
    </select>
  );
}
