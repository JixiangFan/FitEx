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



      <div className="container gap-8 columns-2 text-2xl flex items-stretch h-screen align-middle">
        <div className="w-1/3 h-full " style={{ 'backgroundColor': '#8AABBD' }}>

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
        <div className="w-2/3 h-full w-full  bg-light p-10">
          <div className="row h-100 place-content-center">
            <div className="col">
              <div className="h1 text-center">Login</div>
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
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    aria-describedby="password"
                    ref={passwordRef}
                    required
                  />
                </div>

                <button
                  disabled={loading}
                  // style={{ backgroundColor: "#8AABBD" }}
                  // className=" btn btn-secondary border-2 border-slate-500  w-100"
                  className="btn btn-outline-primary  w-100"
                  type="submit"
                >
                  Log In
                </button>
              </form>
              <button
                disabled={loading}
                // style={{ backgroundColor: "#8AABBD" }}
                // className=" btn btn-secondary border-2 border-slate-500  w-100"
                className="btn btn-outline-secondary  w-100"
                onClick={() => resetPassword()}
              >
                Forget Passowrd
              </button>
            </div>
          </div>
        </div>
      </div>




  )

}

export default Login