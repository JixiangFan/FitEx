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

function writeDeviceData(
  userId,
  name,
  is_fitbit_device,
  activity_information,
  device_information,
  intra_information,
  week_step_information,
  week_distance_information,
  week_calories_information,
) {
  const db = getDatabase();
  const currentTime = new Date().getTime();
  const postData = {
    username: name,
    syncDate: currentTime,
    isFitbitDevice: is_fitbit_device,
    activity: activity_information,
    device: device_information,
    intraday: intra_information,
    week_step: week_step_information,
    week_distance: week_distance_information,
    week_calories: week_calories_information,
  };

  const newPostKey = push(child(ref(db), "posts")).key;

  const updates = {};

  //unix epoch time
  updates["/FitEx/User/" + userId + "/FitData/" + currentTime] = postData;
  return update(ref(db), updates);
}

export default writeDeviceData;
