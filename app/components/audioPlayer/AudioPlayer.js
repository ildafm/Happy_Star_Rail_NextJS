"use client";

import React, { useState, useEffect, useRef } from "react";
import AudioSelector from "./AudioSelector";

export default function AudioPlayer() {
  const [selectedAudio, setSelectedAudio] = useState("01 Star Rail.mp3"); // default music
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
    // console.log(selectedAudio);
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
    <div className="absolute top-0 left-0 m-4 z-10">
      <div className="group relative flex items-center gap-2">
        {/* button mute/unmute */}
        <div>
          <button onClick={toggleMute}>{isMuted ? "🔈" : "🔊"}</button>
        </div>

        {/* audio selector */}
        {/* <div className="hidden group-hover:block">
          <AudioSelector onSelect={setSelectedAudio} />
        </div> */}

        {/* audio selector */}
        {/* wrapper untuk hover */}
        <div className="relative">
          {/* Selector muncul saat hover tombol atau area selector */}
          <div className="hidden group-hover:block group-focus-within:block">
            <AudioSelector onSelect={setSelectedAudio} />
          </div>
        </div>

        <audio ref={audioRef} autoPlay loop>
          <source src={`/bgm/${selectedAudio}.mp3`} type="audio/mp3" />
          {/* <source src={`/bgm/01 Star Rail.mp3`} type="audio/mp3" /> */}
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  );
}

/* 
  return (
    <div className="absolute top-0 left-0 m-4 z-10">
    //   group + flex
      <div className="flex items-center gap-2 group relative">
        <button onClick={toggleMute}>
          {isMuted ? "🔈" : "🔊"}
        </button>

        Select muncul saat hover tombol
        <div className="hidden group-hover:block absolute top-full left-0 mt-1">
          <AudioSelector onSelect={setSelectedAudio} />
        </div>
      </div>

      <audio ref={audioRef} autoPlay loop>
        <source src={`/bgm/${selectedAudio}.mp3`} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

*/
