import React from "react";

export default function PastelButton({ buttonText, navLink, targetBlank }) {
  return (
    <div className="rounded-md shadow">
      <a
        href={navLink}
        className="w-full px-8 py-3 border border-transparent text-base leading-6 font-light rounded-full text-[#1d212e] bg-[#e1c8be] hover:bg-[#DAB7A9] focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-md md:px-16"
        target={targetBlank ? "_blank" : "_self"}
      >
        <span className="font-bold">{buttonText}</span>
      </a>
    </div>
  );
}
