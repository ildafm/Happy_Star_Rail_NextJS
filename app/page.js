"use client";
import React from "react";
import dynamic from "next/dynamic";

const CountdownAnniversary = dynamic(
  () => import("./pages/CountDownAnniversary"),
  {
    ssr: false,
  }
);

function page() {
  return <CountdownAnniversary />;
}

export default page;
