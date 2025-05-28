"use client";

import React, { useState, useEffect, useRef } from "react";
import AudioSelector from "./AudioSelector";

export default function AudioPlayer() {
  const [selectedAudio, setSelectedAudio] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load(); // Reload audio source
      audioRef.current.play();
    }
  }, [selectedAudio]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <div className="absolute top-0 left-0 m-4 flex items-center gap-2 z-10">
      <button onClick={toggleMute}>{isMuted ? "🔈" : "🔊"}</button>

      <AudioSelector onSelect={setSelectedAudio} />

      <audio ref={audioRef} autoPlay loop>
        {/* <source src={`/bgm/${selectedAudio}.mp3`} type="audio/mp3" /> */}
        <source src={`/bgm/01 Star Rail.mp3`} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
