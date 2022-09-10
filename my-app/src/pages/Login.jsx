import React, { useRef, useState } from "react"
import { Form, Card, Alert, Container } from "react-bootstrap"
import { Button } from '../components';
import { Link, useNavigate } from "react-router-dom"

import { useAuth } from '../contexts/AuthContext'
import { MdOutlineCancel } from 'react-icons/md'
import { useStateContext } from '../contexts/ContextProvider';

const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();

  async function handleSubmit(e) {
    e.preventDefault()

    try
    {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate('/dashboard');
      window.location.reload();
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  function resetPassword() {

    navigate('/forgetpassword')

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
              <u>Welcome Back!</u>
            </p>
          </div>
        </div>
        <div className="col-7 place-content-center bg-light">
          <div className="row h-100 place-content-center">
            <div className="col">
              <div className="h1 text-center">Login</div>
              {error && <Alert variant="danger">{error}</Alert>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" ref={emailRef} required />
                  <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" aria-describedby="password" ref={passwordRef} required />
                </div>

                <button disabled={loading} className="btn btn-outline-primary  w-100" type="submit">
                  Log In
                </button>
              </form>
              <button disabled={loading} className="btn btn-outline-secondary  w-100" onClick={() => resetPassword()}>
                Forget Passowrd
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>



  )
}

export default Login