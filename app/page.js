"use client";
import React from "react";
import dynamic from "next/dynamic";
import AudioPlayer from "./components/audioPlayer/AudioPlayer";

const CountdownAnniversary = dynamic(
  () => import("./pages/CountDownAnniversary/page"),
  {
    ssr: false,
  }
);

function page() {
  return (
    <>
      <AudioPlayer />
      <CountdownAnniversary />
    </>
  );
}

export default page;
