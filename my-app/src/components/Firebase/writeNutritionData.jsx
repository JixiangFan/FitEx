import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, push, update } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCRkBbA-slUNFaK19Jb830L8Mv9C65cDGI",
  authDomain: "fitex-c73b4.firebaseapp.com",
  databaseURL: "https://fitex-c73b4-default-rtdb.firebaseio.com",
  projectId: "fitex-c73b4",
  storageBucket: "fitex-c73b4.appspot.com",
  messagingSenderId: "908107679620",
  appId: "1:908107679620:web:9c7e3b7553f4dcbc3dbfd1",
};

const app = initializeApp(firebaseConfig);

function writeNutritionData(userId, name, nutrition_information) {
  const db = getDatabase();
  const currentTime = new Date().getTime();
  const postData = {
    username: name,
    syncDate: currentTime,
    nutrition: nutrition_information,
  };

  const newPostKey = push(child(ref(db), "posts")).key;

  const updates = {};

  //unix epoch time
  updates["/FitEx/User/" + userId + "/NutritionData/" + currentTime] = postData;
  update(ref(db), updates)
    .then(() => {
      // Data saved successfully!
      alert("Data submitted successfully");
      window.location.reload(false);
    })
    .catch((error) => {
      // The write failed...
      alert("Error occurred. Data has not been submitted.");
    });
}

export default writeNutritionData;
