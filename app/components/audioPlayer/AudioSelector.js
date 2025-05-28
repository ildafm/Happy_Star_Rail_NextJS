import React from "react";

const audioList = {
  1: "Star Rail",
  2: "Faded Sun",
  3: "Hope Is the Thing With Feather",
  4: "Wildfire",
};

export default function AudioSelector({ onSelect }) {
  const setAudioSelected = (e) => {
    let audioSrc = "";
    e < 10 ? (audioSrc = `0${e}`) : (audioSrc = e);
    audioSrc = `${audioSrc} ${audioList[e]}`;
    // console.log(audioSrc);

    return audioSrc;
  };

  return (
    <select
      onChange={(e) => onSelect(setAudioSelected(e.target.value))}
      className="p-1 rounded bg-transparent border border-transparent"
      style={{ width: "100px" }}
    >
      {Object.entries(audioList).map(([key, label]) => (
        <option key={key} value={key} className="bg-black text-white">
          {label}
        </option>
      ))}
    </select>
  );
}
