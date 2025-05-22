export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("uid");

  if (!uid) {
    return new Response(JSON.stringify({ error: "Missing uid" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const res = await fetch(
    `https://api.mihomo.me/sr_info_parsed/${uid}?lang=en`,
    {
      cache: "no-store",
    }
  );
  const data = await res.json();

  // Replace icon path with full URL
  const charactersWithFullIconUrl = replaceIconNameWithUrl(data.characters);

  return new Response(JSON.stringify(charactersWithFullIconUrl), {
    headers: { "Content-Type": "application/json" },
  });
}

/**
 * Ganti semua properti yang berisi path icon relatif
 * jadi URL lengkap dengan base URL StarRailRes (GitHub CDN).
 *
 * Contoh:
 * "icon/avatar/1201.png" ->
 * "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/avatar/1201.png"
 *
 * @param {object|array} data - Data karakter / objek kompleks dari API Mihomo
 * @returns {object|array} data yang sudah diganti icon path-nya dengan URL lengkap
 */
function replaceIconNameWithUrl(data) {
  const baseUrl =
    "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master";

  function recursiveReplace(obj) {
    if (Array.isArray(obj)) {
      return obj.map(recursiveReplace);
    } else if (obj !== null && typeof obj === "object") {
      const newObj = {};
      for (const key in obj) {
        const val = obj[key];
        if (
          typeof val === "string" &&
          (val.startsWith("icon/") || val.startsWith("image/"))
        ) {
          newObj[key] = `${baseUrl}/${val}`;
        } else {
          newObj[key] = recursiveReplace(val);
        }
      }
      return newObj;
    }
    // Kalau ini string dan memenuhi kondisi, replace
    if (
      typeof obj === "string" &&
      (obj.startsWith("icon/") || obj.startsWith("image/"))
    ) {
      return `${baseUrl}/${obj}`;
    }
    return obj;
  }

  return recursiveReplace(data);
}

// function replaceIconNameWithUrl(data) {
//   const baseUrl =
//     "https://raw.githubusercontent.com/Mar-7th/StarRailRes/master";

//   function recursiveReplace(obj) {
//     if (Array.isArray(obj)) {
//       return obj.map(recursiveReplace);
//     } else if (obj !== null && typeof obj === "object") {
//       const newObj = {};
//       for (const key in obj) {
//         if (typeof obj[key] === "string" && obj[key].startsWith("icon/")) {
//           newObj[key] = `${baseUrl}/${obj[key]}`;
//         } else {
//           newObj[key] = recursiveReplace(obj[key]);
//         }
//       }
//       return newObj;
//     }
//     return obj;
//   }

//   return recursiveReplace(data);
// }
