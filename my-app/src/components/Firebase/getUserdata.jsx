import { getDatabase, ref, child, get } from "firebase/database";
export default async function getUserdata(uid) {
  const db = getDatabase();
  const dbRef = ref(getDatabase());
  const result = await get(child(dbRef, `profile/${uid}`))

  return result
}



