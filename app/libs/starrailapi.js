// star rail api documentation
// https://www.npmjs.com/package/star-rail-api

import { CharacterIDs, CharacterQuery } from "star-rail-api";

// export function getAllCharacters() {
//   const querry = new CharacterQuery();
//   let characters = [];
//   querry
//     .get()
//     .then((resp) => {
//       console.log(resp);
//       characters = resp;
//     })
//     .catch((error) => {
//       window.console.error(error);
//     });

//   return characters;
// }

export async function getAllCharacters() {
  try {
    const query = new CharacterQuery();
    const resp = await query.get();
    return resp;
  } catch (error) {
    console.error(error);
    return []; // fallback kalau error
  }
}
