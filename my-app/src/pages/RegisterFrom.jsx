import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'
import { getDatabase, ref, child, get } from "firebase/database";
import updateUserdata from '../components/Firebase/updateUserdata'
const RegisterProfile = () => {
    const { currentUser } = useAuth()
    const uid = currentUser['uid']
    const email = currentUser['email']
    async function handleSubmit(e) {
        e.preventDefault()
        try
        {
            setError("")
            setLoading(true)
            await updateUserdata(uid, nameRef.current.value, email, 0, false, deviceRef.current.value, teamRef.current.value, genderRef.current.value, ageRef.current.value, weightRef.current.value, fitbitTokenRef.current.value, exercisgoalRef.current.value)
            navigate('/profile');
        } catch {
            setError("Server error, try again")
        }
        setLoading(false)

    }

    const nameRef = useRef()
    const genderRef = useRef()
    const ageRef = useRef()
    const weightRef = useRef()
    const deviceRef = useRef()
    const fitbitTokenRef = useRef()
    const exercisgoalRef = useRef()
    const teamRef = useRef()


    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const [teamData, setTeamData] = useState([]);
    const dbRef = ref(getDatabase());
    get(child(dbRef, `team/`)).then((snapshot) => {
        if (snapshot.exists())
        {
            setTeamData(snapshot.val())
        } else
        {
            setTeamData("No profile data")
        }
    }).catch((error) => {
        setTeamData(error)
    });


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Card>
                            <Card.Body>
                                <h2 className="text-center mb-4">Finish Your Profile</h2>
                                {error && <Alert variant="danger">{error}</Alert>}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group id="Name">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="name" ref={nameRef} required />
                                    </Form.Group>
                                    <Form.Group id="Gender">
                                        <Form.Label>Gender</Form.Label>
                                        <Form.Select aria-label="Gender" ref={genderRef}>
                                            <option>Select your Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="not">Prefer not tell</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group id="age">
                                        <Form.Label>Age</Form.Label>
                                        <Form.Control type="number" min="18" ref={ageRef} required />
                                    </Form.Group>
                                    <Form.Group id="weight">
                                        <Form.Label>Weight</Form.Label>
                                        <Form.Control type="weight" min="0" ref={weightRef} required />
                                    </Form.Group>
                                    <br></br>
                                    <h2 className="text-center mb-4">Fitness info</h2>
                                    <Form.Group id="device">
                                        <Form.Label>Device</Form.Label>
                                        <Form.Select aria-label="Report Device" ref={deviceRef}>
                                            <option>select your report device</option>
                                            <option value="fitbit">Fitbit</option>
                                            <option value="selfReport">selfReport</option>
                                            <option value="mix">Mix both</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group id="fitbitToken">
                                        <Form.Label>Fitbit access token</Form.Label>
                                        <Form.Control type="text" ref={fitbitTokenRef} />
                                        <Form.Text id="fitbithelp" muted>
                                            Please fill your fitbit access token if you choose fitbit as your report source.
                                        </Form.Text>
                                    </Form.Group>


                                    <Form.Group id="Goals">
                                        <Form.Label>Exercise goal</Form.Label>
                                        <Form.Control type="number" min="0" ref={exercisgoalRef} />
                                        <Form.Text id="goalhelp" muted>
                                            Fill your personal goal for daily steps
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group id="Team">
                                        <Form.Label>Team</Form.Label>
                                        <Form.Select aria-label="Team" ref={teamRef}>
                                            {Object.keys(teamData).map(function (item) {
                                                return <option value={item}>{teamData[item]['team_name']}</option>
                                            })}
                                            <option>select your exercise team</option>
                                            <option value="0">I will create my own team</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Button disabled={loading} className="w-100 btn btn-outline-primary" type="submit">
                                    submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>


    )

}

export default RegisterProfile