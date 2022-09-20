import React, { useRef, useState } from "react"
import { Form, Card, Alert, Container } from "react-bootstrap"
import { Button } from '../components';
import { Link, useNavigate } from "react-router-dom"

import { useAuth } from '../contexts/AuthContext'
import { MdOutlineCancel } from 'react-icons/md'
const ChangePassword = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault()
    const result = ""
    try
    {
      setError("")
      if (emailRef.current.value === passwordRef.current.value)
      {
        setLoading(true)
        await resetPassword(emailRef.current.value)
        setError("check your email")
      }
      else
      {
        setError("Email do not match")
      }
      console.log(result)
      // navigate('/');
    } catch {
      setError("error")
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
              <u>Welcome Back!</u>
            </p>
          </div>
        </div>
        <div className="col-7 place-content-center bg-light">
          <div className="row h-100 place-content-center">
            <div className="col">
              <div className="h1 text-center">Change Password</div>
              {error && <Alert variant="danger">{error}</Alert>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    ref={emailRef}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Confirm Email</label>
                  <input
                    type="email2"
                    className="form-control"
                    id="email2"
                    aria-describedby="password"
                    ref={passwordRef}
                    required
                  />
                </div>

                <button
                  disabled={loading}
                  style={{ backgroundColor: "#8AABBD" }}
                  className=" btn btn-secondary border-2 border-slate-500  w-100"
                  //className="btn btn-outline-primary  w-100"
                  type="submit"
                >
                  Reset Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword