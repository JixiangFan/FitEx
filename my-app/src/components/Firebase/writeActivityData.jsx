import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, push, update, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCRkBbA-slUNFaK19Jb830L8Mv9C65cDGI",
  authDomain: "fitex-c73b4.firebaseapp.com",
  databaseURL: "https://fitex-c73b4-default-rtdb.firebaseio.com",
  projectId: "fitex-c73b4",
  storageBucket: "fitex-c73b4.appspot.com",
  messagingSenderId: "908107679620",
  appId: "1:908107679620:web:9c7e3b7553f4dcbc3dbfd1"
};

const app = initializeApp(firebaseConfig);

function setUserData(userId, name, email,  activity_information, device_information){
  const db = getDatabase();
  //console.log(db);
 
  const reference = ref(db, 'users/' + name);
  
  set(reference, {
    sername: name,
    email: email,
    activity: activity_information,
    device: device_information
  });
}

export default setUserData