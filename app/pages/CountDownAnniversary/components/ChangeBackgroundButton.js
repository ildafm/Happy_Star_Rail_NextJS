import { getRandomIndex } from "@/app/libs/customHandler";
import { isMobile } from "react-device-detect";

export default function ChangeBackgroundButton({
  backgroundList,
  currentSelectedBackground,
  setCurrentSelectedBackground,
}) {
  return (
    <div
      className={`absolute ${
        !isMobile ? "top-0 right-0" : "bottom-0 right-0"
      } m-4 z-10`}
    >
      <div className="rounded-md shadow">
        <button
          className="w-full px-2 border border-transparent text-base leading-6 font-light rounded-full text-[#1d212e] bg-[#e1c8be] hover:bg-[#DAB7A9] focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out"
          onClick={() =>
            changeBackground(
              backgroundList,
              currentSelectedBackground,
              setCurrentSelectedBackground
            )
          }
        >
          <span className="font-bold">Refresh Background</span>
        </button>
      </div>
    </div>
  );
}

function changeBackground(
  backgroundList,
  currentSelectedBackground,
  setCurrentSelectedBackground
) {
  alert("Work In Progress");
  return;
  if (backgroundList.length > 1) {
    removeBackgroundFromList(backgroundList, currentSelectedBackground);
  }
  const newBackgroundIndexSelected = getRandomIndex(backgroundList);
  setBabc;
  setCurrentSelectedBackground(newBackgroundIndexSelected);
}

function removeBackgroundFromList(backgroundList, currentSelectedBackground) {
  console.log("before filter", backgroundList);
  console.log("remove", currentSelectedBackground);
  const filteredBackgroundList = backgroundList.filter(
    (json) => json.id !== currentSelectedBackground.id
  );
  console.log("after filter", filteredBackgroundList);
}
