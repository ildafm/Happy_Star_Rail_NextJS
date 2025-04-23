"use client";
import React from "react";
import dynamic from "next/dynamic";
// import CountDownAnniversary from "./components/CountDownAnniversary";

const CountdownAnniversary = dynamic(
  () => import("./components/CountDownAnniversary2"),
  {
    ssr: false,
  }
);

function page() {
  return <CountdownAnniversary />;
}

export default page;
