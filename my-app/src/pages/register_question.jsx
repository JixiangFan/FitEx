import React, { useRef, useState } from "react"
import { Form, Card, Alert, Container } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'
import { getDatabase, ref, child, get } from "firebase/database";
import updateUserdata from '../components/Firebase/updateUserdata'
const RegisterQuestion = () => {
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
            await updateUserdata(uid, nameRef.current.value, email, 0, false, deviceRef.current.value, teamRef.current.value, genderRef.current.value, ageRef.current.value, weightRef.current.value, heightRef.current.value, fitbitTokenRef.current.value, stepRef.current.value, foodRef.current.value)
            navigate('/register3');

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
                                <div className="mb-3">
                                    <label className="form-label">Age</label>
                                    <input type="number" className="form-control" id="age" aria-describedby="age" min="12" ref={ageRef} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Do you own a smartphone?</label>
                                    <select ref={genderRef} className="form-select" aria-label="Default select example" required>
                                        <option>Select smartphone:</option>
                                        <option value="0">I own an Android</option>
                                        <option value="1">I own an iPhone</option>
                                        <option value="2">No smartphone</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Do you consider yourself to be Hispanic or Latino?</label>
                                    <select ref={genderRef} className="form-select" aria-label="Default select example" required>
                                        <option>Select smartphone:</option>
                                        <option value="0">Yes</option>
                                        <option value="1">No</option>
                                        <option value="2">Prefer not to answer</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Do you consider yourself to be Hispanic or Latino?</label>
                                    <select ref={genderRef} className="form-select" aria-label="Default select example" required>
                                        <option>Select smartphone:</option>
                                        <option value="0">Yes</option>
                                        <option value="1">No</option>
                                        <option value="2">Prefer not to answer</option>
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

export default RegisterQuestion