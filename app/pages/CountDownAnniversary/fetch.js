export const getBackgroundList = async () => {
  const background_list_json_path = "/json/background_list.json";

  try {
    const res = await fetch(background_list_json_path);

    if (!res.ok) throw new Error("Gagal fetch JSON");

    const json = await res.json();
    // console.log("Isi JSON:", json);
    // console.log("Panjang JSON:", json.length);
    // console.log("Complete fetching");

    // filter agar tidak ada "portrait" (sementara)
    const filtered = json.filter((json) => json.size !== "portrait");

    return filtered;
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
};
