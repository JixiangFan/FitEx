import React, { useRef, useState } from "react"
import { Form, Card, Alert, Container } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'
import { getDatabase, ref, child, get } from "firebase/database";
import updateUserdata from '../components/Firebase/updateUserdata'
const Register2 = () => {
    const nameRef = useRef()
    const genderRef = useRef()
    const ageRef = useRef()
    const weightRef = useRef()
    const heightRef = useRef()
    const deviceRef = useRef()
    const fitbitTokenRef = useRef()
    const stepRef = useRef()
    const foodRef = useRef()
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


    const { currentUser } = useAuth()
    const uid = currentUser.uid
    const email = currentUser.email

    async function handleSubmit(e) {
        e.preventDefault()
     
        try
        {
            setError("")
            setLoading(true)
            await updateUserdata(uid, nameRef.current.value, email, 0, false, deviceRef.current.value, teamRef.current.value,genderRef.current.value, ageRef.current.value, weightRef.current.value,heightRef.current.value, fitbitTokenRef.current.value, stepRef.current.value, foodRef.current.value)
            if (teamRef.current.value == 0)
            {
                navigate('/createTeam');
            }
            else
            {
                navigate('/profile');
                }
        } catch {
            setError("Server error, try again")
        }
        setLoading(false)
    }

    let mainStyle = {
        'backgroundColor': '#EDE9E9`',
        'position': 'absolute',
        'width': '100%',
    }


    return (
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
                            Awesome! Then, tell us more about your personal information.
                        </p>


                    </div>
                </div>
                <div className="col-7 place-content-center bg-light">
                    <div className="row h-100 place-content-center">
                        <div className="col">
                            <div className="h1 text-center">Register</div>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <form onSubmit={handleSubmit}>
                                <label className="h3">Personal Info</label>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" id="nameInput" aria-describedby="emailHelp" ref={nameRef} required />
                                    <div id="emailHelp" className="form-text">Enter your name here.</div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Gender</label>
                                    <select ref={genderRef} className="form-select" aria-label="Default select example" required>
                                        <option>Select gender:</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">prefer not to enter</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Age</label>
                                    <input type="number" className="form-control" id="age" aria-describedby="age" min="12" ref={ageRef} required />
                                </div>

                                <div className="row">
                                    <div className="col mb-3 w-25">
                                        <label className="form-label">Height</label>
                                        <div className="input-group mb-3">
                                            <input type="number" className="form-control" min="0" placeholder="Height" aria-label="height" aria-describedby="basic-addon2" ref={heightRef} required></input>
                                            <span className="input-group-text" id="basic-addon2">ft</span>
                                        </div>
                                    </div>
                                    <div className="col mb-3 w-25">
                                        <label className="form-label">Weight</label>
                                        <div className="input-group mb-3">
                                            <input type="number" className="form-control" min="0" placeholder="Weight" aria-label="weight" aria-describedby="basic-addon2" ref={weightRef} required></input>
                                            <span className="input-group-text" id="basic-addon2">lb</span>
                                        </div>
                                    </div>
                                </div>
                                <label className="h3">Report</label>
                                <div className="mb-3">
                                    <label className="form-label">Device</label>
                                    <select ref={deviceRef} className="form-select" aria-label="Default select example" required>
                                        <option>select your report device</option>
                                        <option value="fitbit">Fitbit</option>
                                        <option value="selfReport">selfReport</option>
                                        <option value="mix">Mix both</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Fit Bit Access Token</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control"  aria-label="weight" aria-describedby="basic-addon2" ref={fitbitTokenRef} required></input>
                                        <span className="input-group-text" id="basic-addon2">?</span>
                                    </div>
                                </div>

                                <div className="row">
                                    <label className="h3">Goal</label>
                                    <div className="col mb-3 w-25">
                                        <label className="form-label">Daliy Steps Goal</label>
                                        <div className="input-group mb-3">
                                            <input type="number" className="form-control" min="0" aria-label="height" aria-describedby="basic-addon2" ref={stepRef} required></input>
                                            <span className="input-group-text" id="basic-addon2">ft</span>
                                        </div>
                                    </div>
                                    <div className="col mb-3 w-25">
                                        <label className="form-label">Nutrition Goals</label>
                                        <div className="input-group mb-3">
                                            <input type="number" className="form-control" min="0" aria-label="weight" aria-describedby="basic-addon2" ref={foodRef}  required></input>
                                            <span className="input-group-text" id="basic-addon2">cup</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Team</label>
                                    <select ref={teamRef} className="form-select" aria-label="Default select example" required>
                                        <option>select your exercise team</option>
                                        {Object.keys(teamData).map(function (item) {
                                            return <option value={item}>{teamData[item]['team_name']}</option>
                                        })}
                                        <option value="0">I will create my own team</option>
                                    </select>
                                </div>



                                <button disabled={loading} className="btn btn-outline-primary  w-100" type="submit">
                                    Register
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default Register2