import React, { useRef, useState } from "react"
import { Form, Card, Alert, Container } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { Button } from '../components';
import { useAuth } from '../contexts/AuthContext'
import { MdOutlineCancel } from 'react-icons/md'

const Register1 = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordRef2 = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordRef2.current.value)
    {
      return setError("Passwords do not match")
    }

    try
    {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/register2');
    } catch (e)
    {
      console.log(e)
      setError("Failed to create an account, email may exist")
    }

    setLoading(false)
  }

  let mainStyle = {
    'backgroundColor': '#EDE9E9`',
    'position': 'absolute',
    'width': '100%',
  }



  return (

    <div className="container lg:gap-8 lg:columns-2 text-2xl flex items-stretch align-middle h-screen">
      <div className="absolute lg:relative sm:h-1/5 sm:w-full lg:w-1/3 lg:h-full " style={{ backgroundColor: "#8AABBD" }}>
        <div className="row">
          <div className="col-5">
            <img
              src="./logo.png"
              className="rounded float-left"
              alt="logo"
            />

          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 place-content-center lg:h-75">
          <p className="text-center h2 text-white sm:pt-10">
            <u>Welcome to FitEx</u>
          </p>

          <p className="text-center p text-white">
            <br />
            FitEx is an evidence-based, 8-week, statewide walking and
            fruit/vegetable consumption program delivered to teams and
            individuals across the state.
          </p>

          <p className="text-center p text-white">
            Please register to start!, let's finish setup your account first.
          </p>
        </div>
      </div>
      <div className="relative sm:w-full lg:w-2/3 lg:h-full">
        <div className="row h-100 place-content-center">
          <div className="col">
            <div className="h1 text-center">Register</div>
            {error && <Alert variant="danger">{error}</Alert>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  aria-describedby="emailHelp"
                  ref={emailRef}
                  required
                />
                <div id="emailHelp" className="form-text">
                  Enter your email here.
                </div>
              </div>


              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password1"
                  aria-describedby="password"
                  ref={passwordRef}
                  required
                />
                <div id="emailHelp" className="form-text">
                  Password need to be 6 character and more.
                </div>

              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password2"
                  aria-describedby="password"
                  ref={passwordRef2}
                  required
                />
                <div id="emailHelp" className="form-text">
                  Confirm your passowrd here.
                </div>
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
  );
}

export default Register1