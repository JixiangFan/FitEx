import React, { useRef, useState } from "react"
import { Form, Card, Alert, Container } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'
import { getDatabase, ref, child, get } from "firebase/database";
import updateUserdata from '../components/Firebase/updateUserdata'
import { getAuth, updateProfile } from "firebase/auth";

const UpdateProfileLocal = () => {
  const nameRef = useRef()
  const genderRef = useRef()
  const ageRef = useRef()
  const weightRef = useRef()
  const heightRef = useRef()
  const height2Ref = useRef()
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
  const auth = getAuth();


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
          await updateProfile(auth.currentUser, {
              displayName: nameRef.current.value
          })
          var height = heightRef.current.value * 12 + height2Ref.current.value
          await updateUserdata(uid, nameRef.current.value, email, 0, false, deviceRef.current.value, teamRef.current.value, "", ageRef.current.value, weightRef.current.value, height, fitbitTokenRef.current.value, stepRef.current.value, foodRef.current.value)
          if (teamRef.current.value == 0)
          {
              navigate('/createTeam');
          }
          else
          {
              navigate('/');
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
        <>
        <div className="sm:hidden container lg:gap-8 lg:columns-2 text-2xl flex items-stretch align-middle h-screen pt-10 mt-5">
            <div className="relative w-2/3 h-full pt-10 mt-10">
                <div className="row h-100 place-content-center">
                    <div className="col">
                        <div className="h1 text-center">Update Profile</div>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <form onSubmit={handleSubmit}>
                            <label className="h3">Personal Info</label>
                            <div className="mb-3">
                                <label className="text-dark">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nameInput"
                                    placeholder="First Last"
                                    aria-describedby="emailHelp"
                                    ref={nameRef}
                                    required
                                />
                                <div id="emailHelp" className="form-text">
                                    Enter your name here.
                                </div>
                            </div>

                            {/* <div className="mb-3">
                                <label className="form-label">Gender</label>
                                <select
                                    ref={genderRef}
                                    className="form-select"
                                    aria-label="Default select example"
                                    required
                                >
                                    <option>Select gender:</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">prefer not to enter</option>
                                </select>
                            </div> */}

                            <div className="mb-3">
                                <label className="form-label">Age</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="age"
                                    placeholder="Numbers Only"
                                    aria-describedby="age"
                                    min="12"
                                    ref={ageRef}
                                    required
                                />
                            </div>

                            <div className="row">
                                <div className="col mb-3 w-25">
                                    <label className="form-label">Height</label>
                                    <div className="input-group mb-3">
                                        <input
                                            type="number"
                                            className="form-control"
                                            min="0"
                                            placeholder="Height"
                                            aria-label="height"
                                            aria-describedby="basic-addon2"
                                            ref={heightRef}
                                            required
                                        />
                                        <span
                                            className="input-group-text"
                                            id="basic-addon2"
                                        >
                                            ft
                                        </span>
                                        <input
                                            type="number"
                                            className="form-control"
                                            min="0"
                                            aria-label="height"
                                            aria-describedby="basic-addon2"
                                            ref={height2Ref}
                                            required
                                        />
                                        <span
                                            className="input-group-text"
                                            id="basic-addon2"
                                        >
                                            inches
                                        </span>
                                    </div>
                                </div>
                                <div className="col mb-3 w-25">
                                    <label className="form-label">Weight</label>
                                    <div className="input-group mb-3">
                                        <input
                                            type="number"
                                            className="form-control"
                                            min="0"
                                            placeholder="Weight"
                                            aria-label="weight"
                                            aria-describedby="basic-addon2"
                                            ref={weightRef}
                                            required
                                        />
                                        <span
                                            className="input-group-text"
                                            id="basic-addon2"
                                        >
                                            lb
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <label className="h3">Report</label>
                            <div className="mb-3">
                                <label className="form-label">Device</label>
                                <select
                                    ref={deviceRef}
                                    className="form-select"
                                    aria-label="Default select example"
                                    required
                                >
                                    <option>select your report device</option>
                                    <option value="fitbit">Fitbit</option>
                                    <option value="selfReport">selfReport</option>
                                    <option value="mix">Mix both</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">
                                    FitBit Access Token
                                </label>
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        aria-label="weight"
                                        aria-describedby="basic-addon2"
                                        ref={fitbitTokenRef}
                                    />
                                    <span className="input-group-text" id="basic-addon2">
                                        <Link to="/knowledgeBase3" target="_blank">
                                            ?
                                        </Link>
                                    </span>
                                </div>
                            </div>

                            <div className="row">
                                <label className="h3">Goal</label>
                                <div className="col w-25">
                                    <label className="form-label">Daliy Steps Goal</label>
                                    <div className="input-group mb-3">
                                        <input
                                            type="number"
                                            className="form-control"
                                            min="0"
                                            aria-label="height"
                                            aria-describedby="basic-addon2"
                                            ref={stepRef}
                                            required
                                        />
                                        <span
                                            className="input-group-text"
                                            id="basic-addon2"
                                        >
                                            step
                                        </span>

                                    </div>
                                </div>
                                <div className="col w-25">
                                    <label className="form-label">
                                        Daily Vegetable and Fruit Cups
                                    </label>
                                    <div className="input-group mb-3">
                                        <input
                                            type="number"
                                            className="form-control"
                                            min="0"
                                            aria-label="weight"
                                            aria-describedby="basic-addon2"
                                            ref={foodRef}
                                            required
                                        />
                                        <span
                                            className="input-group-text"
                                            id="basic-addon2"
                                        >
                                            cup
                                        </span>
                                    </div>
                                </div>
                                <div className="text-primary pb-10">
                                    <ins>
                                        <Link to="/knowledgeBase2" target="_blank">
                                            How to set my Goal?
                                        </Link>
                                    </ins>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Team</label>
                                <select
                                    ref={teamRef}
                                    className="form-select"
                                    aria-label="Default select example"
                                    required
                                >
                                    <option>select your exercise team</option>
                                    {Object.keys(teamData).map(function (item) {
                                        return (
                                            <option value={item}>
                                                {teamData[item]["team_name"]}
                                            </option>
                                        );
                                    })}
                                    <option value="0">I will create my own team</option>
                                </select>
                            </div>

                            <button
                                disabled={loading}
                                className="btn btn-outline-primary  w-100"
                                type="submit"
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
       
    </>
    );
}

export default UpdateProfileLocal


