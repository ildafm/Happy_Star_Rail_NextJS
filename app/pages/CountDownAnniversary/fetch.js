import { isMobile } from "react-device-detect";

export const getBackgroundList = async () => {
  const background_list_json_path = "/json/background_list.json";

  try {
    const res = await fetch(background_list_json_path);

    if (!res.ok) throw new Error("Gagal fetch JSON");

    const json = await res.json();
    // console.log("Isi JSON:", json);
    // console.log("Panjang JSON:", json.length);
    // console.log("Complete fetching");

    const filtered = isMobile
      ? json.filter((json) => json.portrait_suitable === "TRUE") // jika mobile filter portrait_suitable TRUE
      : json.filter((json) => json.portrait_suitable === "FALSE");

    // const filtered = json.filter((json) => json.portrait_suitable === "FALSE");
    return filtered;
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
};
