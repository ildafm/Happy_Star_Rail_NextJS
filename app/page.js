"use client";
import React from "react";
import dynamic from "next/dynamic";

const CountdownAnniversary = dynamic(
  () => import("./pages/CountDownAnniversary/page"),
  {
    ssr: false,
  },
);

function Page() {
  return (
    <>
      <CountdownAnniversary />
    </>
  );
}

export default Page;
