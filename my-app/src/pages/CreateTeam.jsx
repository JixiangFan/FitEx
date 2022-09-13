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
        await update(ref(db), updates).then(
            await promoteUser(newPostKey).then(
                setLoading(false)

            )
        ).catch(
            setLoading(false)
        )
        if (!loading)
        {
            navigate("/profile")
        }
       
    }

    function promoteUser(teamID) {
        const auth = getAuth()
        const user = auth.currentUser;
        const dbRef = ref(getDatabase());
        var userType = 0;
        get(child(dbRef, `profile/${user['uid']}`)).then((snapshot) => {
            userType = snapshot.val().usertype
            if (userType === 0)
            {
                const postData = {
                    displayname: snapshot.val().displayname,
                    email: snapshot.val().email,
                    usertype: 1,
                    device: snapshot.val().device,
                    questionnaire: snapshot.val().questionnaire,
                    team: teamID,
                    gender: snapshot.val().gender,
                    age: snapshot.val().age,
                    weight: snapshot.val().weight,
                    fitbitToken: snapshot.val().fitbitToken,
                    exerciseGoal: snapshot.val().exerciseGoal
                };
                const updates = {};
                updates['/profile/' + user['uid']] = postData;
                return update(ref(getDatabase()), updates);
            }
        })

    }

    async function handleSubmit(e) {
        setLoading(true)
        setTeamSize(0)
        setError("")

        const email = currentUser['email']
        e.preventDefault()

        const dbRef = ref(getDatabase());
        const proceed = true;
        await get(child(dbRef, `team/`)).then((snapshot) => {
            checkTeamExist(teamnameRef.current.value, snapshot.val()).then(result =>
                duplcate ? setError("Name exist")
                    : createNewTeam()
            )
        }
        )
        navigate('/register3');
        setLoading(false)
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
                    <div className="col-3 justify-content-center" style={{ 'backgroundColor': '#8AABBD' }}>
                        <div className="row">
                            <div className="col-5">
                                <img src='./logo.png' className="rounded float-left" alt="logo"></img>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 place-content-center h-75">
                            <p className="text-center h2 text-white">
                                <u>Welcome to FitEx</u>
                            </p>

                            <p className="text-center p text-white">
                                In FitEx, You can:
                                <br></br>
                                description put here
                            </p>

                            <p className="text-center p text-white">
                                Nice to meet you! Let's create a team and have fun with friends!
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
                                                <Form.Control type="name" ref={teamnameRef} required />
                                            </Form.Group>
                                            <Form.Group id="WeekGoal">
                                                <Form.Label>Weekly Goal</Form.Label>
                                                <Form.Control type="number" min="0" ref={dailyGoalRef} required />
                                                <Form.Text id="fitbithelp" muted>
                                                    Please fill your team's weekly step goal.
                                                </Form.Text>
                                            </Form.Group>

                                            <Button disabled={loading} className="w-100 btn btn-outline-primary" type="submit">
                                                Create Team
                                            </Button>
                                            <Form.Text id="fitbithelp" muted>
                                                You will automaticly promote to this team leader when team created
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

    )
}

export default CreateTeam