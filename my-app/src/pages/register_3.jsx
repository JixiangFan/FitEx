import React, { useRef, useState } from "react"
import { Form, Card, Alert, Container } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { Button } from '../components';
import { useAuth } from '../contexts/AuthContext'
import { MdOutlineCancel } from 'react-icons/md'

const Register1 = () => {
   
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const { currentUser } = useAuth()
    const uid = currentUser.uid
    const email = currentUser.email
    async function handleSubmit(e) {
        e.preventDefault()
        navigate('/dashboard');
        window.location.reload()
        window.open("https://docs.google.com/forms/d/e/1FAIpQLSfOXgkheNu29BvKhbCdtm57Zy0veN9FhCQP96h7V4JOwuWU0Q/viewform?usp=pp_url&entry.1038252029=" + uid); 
        setLoading(false)
    }

    let mainStyle = {
        'backgroundColor': '#EDE9E9`',
        'position': 'absolute',
        'width': '100%',
    }


    return (
      <div className="container h-100 bg-light text-2xl" style={mainStyle}>
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
                One last step. Please tell us more about your personal
                fitness information!
              </p>
            </div>
          </div>
          <div className="col-7 place-content-center bg-light">
            <div className="row h-100 place-content-center">
              <div className="col">
                <div className="h1 text-center">Register</div>
                {error && <Alert variant="danger">{error}</Alert>}
                <form onSubmit={handleSubmit}>
                  <h1 className="text-center mt-9">
                    You are almost finish!
                  </h1>
                  <p>
                    Please complete the questionnaire, it will take you 5-10
                    minutes. The questionnaire helps us to understand your
                    needs and goals. Thank you for your patient!
                  </p>
                  <button
                    disabled={loading}
                    style={{ backgroundColor: "#8AABBD" }}
                    className=" btn btn-secondary border-2 border-slate-500  w-100 text-2xl"
                    //className="mt-10 btn btn-outline-primary  w-100"
                    type="submit"
                  >
                    Great, Entering FitEx!
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Register1