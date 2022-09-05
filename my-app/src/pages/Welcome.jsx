import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";


const Welcome = () => {
  let mainStyle = {
    'height': '100%',
    'backgroundImage': `url(./background.jpg)`,
    'position': 'absolute',
    'left': '0px',
    'width': '100%',
    'backgroundSize': 'cover',
  }

  let navigate = useNavigate(); 
  const login = () =>{ 
    navigate('/login');
  }
  const register = () =>{ 
    navigate('/register');
  }

  return (

    <div style={mainStyle}>
      <div className='container-lg'>
        <Row className = 'h-50'></Row>
        <Row className="mt-5">
          <Col></Col>
          <div className="col-md-4 text-center">
            <img src='./logo.png' className="rounded float-center" alt="logo"></img>
            <h2 className="text-center"><strong>An evidence-based, 8-week online program to promote physical activity and fruit & vegetable tracking.</strong></h2>
          </div>
         
        </Row>
        <Row className="mt-5">
          <Col></Col>
          <div className="col-md-4 text-center">
          <button className="btn btn-primary btn-lg w-75" onClick={register}>Join Now</button>          
          </div>
        </Row>
        <Row className="mt-5">
          <Col></Col>
          <div className="col-md-4 text-center">
          <button className="btn btn-primary btn-lg w-75" onClick={login}>Login</button>          
          </div>
        </Row>
      </div>

    </div>

  )
}

export default Welcome