"use client";

import React, { useState, useEffect, useRef } from "react";
import AudioSelector from "./AudioSelector";

export default function AudioPlayer() {
  const [selectedAudio, setSelectedAudio] = useState("01 Star Rail"); // default music
  // const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const audioRef = useRef(null);

  //   const toggleMute = () => {
  //     setIsMuted((prev) => !prev);
  //   };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load(); // Reload audio source
      audioRef.current.play();
    }
  }, [selectedAudio]);

  // pause setting
  useEffect(() => {
    if (audioRef.current) {
      if (isPaused) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  }, [isPaused]);

  return (
    <div className="absolute top-0 left-0 m-4 z-10">
      <div className="group relative flex items-center gap-2">
        {/* button pause/unpause */}
        <div>
          {/* <button onClick={toggleMute}>{isMuted ? "🔈" : "🔊"}</button> */}
          <button onClick={togglePause}>{isPaused ? "🔈" : "🔊"}</button>
        </div>

        {/* audio selector */}
        {/* wrapper untuk hover */}
        <div className="relative">
          {/* Selector muncul saat hover tombol atau area selector */}
          {/* <div className="hidden group-hover:block group-focus-within:block"> */}
          <div className="">
            <AudioSelector onSelect={setSelectedAudio} isPaused={isPaused} />
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
