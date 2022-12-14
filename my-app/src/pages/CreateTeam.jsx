import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'
import updateUserdata from '../components/Firebase/updateUserdata'
import { getDatabase, ref, child, push, update, set, get } from "firebase/database";
import firebase from 'firebase/app';
import { getAuth } from "firebase/auth";

const CreateTeam = () => {

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [teamSize, setTeamSize] = useState(0)
    const navigate = useNavigate();
    const { currentUser } = useAuth()
    var duplcate = false
    async function checkTeamExist(name, obj) {
        Object.keys(obj).forEach(key => {
            if (obj[key]["team_name"] === teamnameRef.current.value)
            {
                duplcate = true
                return true;
            }
        })
        return false;
    }

    async function createNewTeam() {
        const db = getDatabase();
        const uid = currentUser['uid']
        const teamMemberList = [uid]
        const auth = getAuth()
        const user = auth.currentUser;
        const dbRef = ref(getDatabase());
        var userType = 0;
        const postData = {
            team_name: teamnameRef.current.value,
            team_member: teamMemberList,
            contribution_percentage: 0,
            team_day_step_total: 0,
            team_day_step_lift: 0,
            team_day_rank: 0,
            team_day_goal: dailyGoalRef.current.value
        };
        const updates = {};
        setLoading(true)
        const newPostKey = push(child(ref(db), 'team')).key;
        updates['/team/' + newPostKey] = postData;
        update(ref(db), updates).then(() => {
            get(child(dbRef, `profile/${user['uid']}`)).then((snapshot) => {
                userType = snapshot.val().usertype
                console.log(snapshot.val());
                if (userType === 0)
                {
                    const postData = {
                        age: snapshot.val().age,
                        device: snapshot.val().device,
                        displayname: snapshot.val().displayname,
                        email: snapshot.val().email,
                        fitbitToken: snapshot.val().fitbitToken,
                        foodGoal: snapshot.val().foodGoal,
                        gender: snapshot.val().gender,
                        height: snapshot.val().height,
                        questionnaire: snapshot.val().questionnaire,
                        stepGoal: snapshot.val().stepGoal,
                        team: newPostKey,
                        usertype: 1,
                        weight: snapshot.val().weight,
                    };
                    const updates = {};
                    console.log(postData);
                    updates['/profile/' + user['uid']] = postData;
                    update(ref(getDatabase()), updates).then(
                      navigate('/register3')
                    )
                }
                else{
                    navigate("/register3");
                }
            })
        })

    }

    function launcherror() {
        setError("Name exist")
        setLoading(false)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setTeamSize(0)
        setError("")
        const email = currentUser['email']
   
        console.log(loading)
        const dbRef = ref(getDatabase());
        const proceed = true;
        await get(child(dbRef, `team/`)).then((snapshot) => {
            checkTeamExist(teamnameRef.current.value, snapshot.val()).then(result =>
                duplcate ?
                    launcherror()
                    :
                    createNewTeam()
            )
        }
        )

        
    }

    let mainStyle = {
        'backgroundColor': '#EDE9E9`',
        'position': 'absolute',
        'width': '100%',
    }

    const teamnameRef = useRef()
    const dailyGoalRef = useRef()

    return (
      <>
        <div className="container h-100 bg-light" style={mainStyle}>
          <div className="row h-100">
            <div
              className="col-3 justify-content-center"
              style={{ backgroundColor: "#8AABBD" }}
            >
              <div className="row">
                <div className="col-5">
                  <img
                    src="./logo.png"
                    className="rounded float-left"
                    alt="logo"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 place-content-center h-75">
                <p className="text-center h2 text-white">
                  <u>Welcome to FitEx</u>
                </p>

                <p className="text-center p text-white">
                  <br />
                  FitEx is an evidence-based, 8-week, statewide walking and
                  fruit/vegetable consumption program delivered to teams and
                  individuals across the state.
                </p>

                <p className="text-center p text-white">
                  Nice to meet you! Let's create a team and have fun with
                  friends!
                </p>
              </div>
            </div>
            <div className="col-7 place-content-center bg-light">
              <div className="row h-100 place-content-center">
                <div className="col">
                  <div className="h1 text-center">Create Your Team</div>
                  <Card>
                    <Card.Body>
                      <h2 className="text-center mb-4">Create Your Team</h2>
                      {error && <Alert variant="danger">{error}</Alert>}
                      <Form onSubmit={handleSubmit}>
                        <Form.Group id="Team Name">
                          <Form.Label>Team Name</Form.Label>
                          <Form.Control
                            type="name"
                            ref={teamnameRef}
                            required
                          />
                        </Form.Group>
                        <Form.Group id="WeekGoal">
                          <Form.Label>Weekly Goal</Form.Label>
                          <Form.Control
                            type="number"
                            min="0"
                            ref={dailyGoalRef}
                            required
                          />
                          <Form.Text id="fitbithelp" muted>
                            Please fill your team's weekly step goal.
                          </Form.Text>
                        </Form.Group>

                        <Button
                          disabled={loading}
                          //className="w-100 btn btn-outline-primary"
                          style={{ backgroundColor: "#8AABBD" }}
                          className=" btn btn-secondary border-2 border-slate-500  w-100 text-2xl"
                          type="submit"
                        >
                          Create Team
                        </Button>
                        <Form.Text id="fitbithelp" muted>
                          You will automaticly promote to this team leader
                          when team created
                        </Form.Text>
                      </Form>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default CreateTeam