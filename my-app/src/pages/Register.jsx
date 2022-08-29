import React, { useRef, useState } from "react"
import { Form, Card, Alert,Container } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { Button } from '../components';
import { useAuth } from '../contexts/AuthContext'
import { MdOutlineCancel } from 'react-icons/md'
const Register = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup} = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    async function handleSubmit(e) {
      e.preventDefault()

      if (passwordRef.current.value !== passwordConfirmRef.current.value)
      {
        return setError("Passwords do not match")
      }

      try
      {
        setError("")
        setLoading(true)
        await signup(emailRef.current.value, passwordRef.current.value);
        navigate('/registerprofile');
      } catch {
        setError("Failed to create an account")
      }

      setLoading(false)

    }
    return (
      <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg dark:text-gray-200">Register</p>
          <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
        </div>
        
        <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        
        <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
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
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <button disabled={loading} className="btn btn-outline-primary w-100" type="submit">
              Sign Up
            </button>
          </Form>
        </Card.Body>
      </Card>
    </>
        </div>
      </div>
    

    )
}


export default Register

