import React, { useRef, useState } from "react"
import { Form, Card, Alert, Container } from "react-bootstrap"
import { Button } from '../components';
import { Link, useNavigate } from "react-router-dom"

import { useAuth } from '../contexts/AuthContext'
import { MdOutlineCancel } from 'react-icons/md'
const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate('/');
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
        <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">Sign in</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
        </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
     
      </div>
      
    <>
      <Card>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <button disabled={loading} className="w-100" type="submit">
              Log In
            </button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/register">Sign Up</Link>
      </div>
      </>
      </div>
  )
}

export default Login