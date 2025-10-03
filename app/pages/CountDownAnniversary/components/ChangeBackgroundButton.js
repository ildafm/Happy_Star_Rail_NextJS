import { getRandomIndex } from "@/app/libs/customHandler";
import { useCallback } from "react";

export default function ChangeBackgroundButton({
  backgroundList,
  setBackgroundList,
  currentSelectedBackground,
  setCurrentSelectedBackground,
  finalBackgroundList,
}) {
  const changeBackground = useCallback(() => {
    let updatedList = backgroundList;

    if (backgroundList.length > 1) {
      updatedList = backgroundList.filter(
        (item) => item.id !== currentSelectedBackground.id
      );
      // console.log("Total list tersisa: ", updatedList.length);
      setBackgroundList(updatedList);
    } else {
      // console.log("List background sudah habis, melakukan reset");
      updatedList = finalBackgroundList;
      setBackgroundList(finalBackgroundList);
    }

    const newIndex = getRandomIndex(updatedList);
    setCurrentSelectedBackground(updatedList[newIndex]);
  }, [
    backgroundList,
    currentSelectedBackground,
    finalBackgroundList,
    setBackgroundList,
    setCurrentSelectedBackground,
  ]);

  return (
    <div className={`absolute top-0 left-0 sm:left-auto sm:right-0 m-4 z-10`}>
      <div className="rounded-md shadow">
        <button
          className="w-full px-2 border border-transparent text-base leading-6 font-light rounded-full text-[#1d212e] bg-[#e1c8be] hover:bg-[#DAB7A9] focus:outline-none transition duration-150 ease-in-out"
          onClick={changeBackground}
        >
          <span className="font-bold">Refresh Background</span>
        </button>
      </div>
    </div>
  );
}
