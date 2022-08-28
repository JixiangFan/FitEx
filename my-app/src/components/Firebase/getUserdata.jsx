import { getDatabase, ref, child, get } from "firebase/database";
export default async function getUserdata(uid) {
    const db = getDatabase();
    const dbRef = ref(getDatabase());
    var reuslt = null;
    get(child(dbRef, `users/${uid}`)).then((snapshot) => {
        if (snapshot.exists())
        {
            reuslt =  snapshot.val();
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });
    
    return reuslt
}



