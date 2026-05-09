"use client";
import React from "react";
import dynamic from "next/dynamic";

const CountdownPage = dynamic(
  () => import("@/app/components/templates/countdown/CountdownPage.js"),
  {
    ssr: false,
  },
);

function Page() {
  return (
    <>
      <CountdownPage />
    </>
  );
}

export default Page;
