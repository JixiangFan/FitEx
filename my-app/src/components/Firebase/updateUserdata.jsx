import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getDatabase, ref, child, push, update, set } from "firebase/database";

export default function updateUserdata(uid, displayname, email, usertype, questionnaire, device, team, gender, age, weight, fitbitToken, exerciseGoal) {
  const db = getDatabase();
  const postData = {
    displayname: displayname,
    email: email,
    usertype: usertype,
    device: device,
    questionnaire: questionnaire,
    team: team,
    gender: gender,
    age: age,
    weight: weight,
    fitbitToken: fitbitToken,
    exerciseGoal: exerciseGoal
  };
  const updates = {};
  //updates['/users/' + userId] = postData1;
  updates['/profile/' + uid] = postData;
  return update(ref(db), updates);
}



