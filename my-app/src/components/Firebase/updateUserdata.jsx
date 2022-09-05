import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDatabase, ref, child, push, update, set } from "firebase/database";

export default function updateUserdata(uid, displayname, email, usertype, questionnaire, device, team, gender, age, weight,height, fitbitToken,step,food) {
  const db = getDatabase();
  const postData = {
    displayname: displayname,
    gender: gender,
    age: age,
    weight: weight,
    height: height,
    device: device,
    email: email,
    fitbitToken: fitbitToken,
    stepGoal: step,
    foodGoal: food,
    team: team,
    usertype: usertype,
    questionnaire: questionnaire,
  };
  const updates = {};
  //updates['/users/' + userId] = postData1;
  updates['/profile/' + uid] = postData;
  return update(ref(db), updates);
}



