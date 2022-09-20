import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'

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
      <div className="row mt-64" />
      <div className="row ml-48">
        <div className="col">
          <div className="container-lg mt-5">
            <Container>
              <div class="ratio ratio-16x9 ">
                <iframe
                  src="https://www.youtube.com/embed/SmSoZvSmHeU"
                  title="Welcome Video"
                  allowFullScreen
                />
              </div>
            </Container>
          </div>
        </div>

        <div className="col mt-40">
          <div className="col-md-4 text-center ml-52">
            <img
              src="./logo.png"
              className="rounded float-center"
              alt="logo"
            />
            <h2 className="text-center">
              <strong>
                An evidence-based, 8-week online program to promote physical
                activity and fruit & vegetable tracking.
              </strong>
            </h2>
          </div>

          <div className="col mt-8">
            <div className="col-md-4 text-center ml-52">
              <button
                className="btn btn-primary btn-lg w-75"
                onClick={register}
              >
                Join Now
              </button>
            </div>
          </div>

          <div className="col-md-4 text-center mt-8 ml-52">
            <button className="btn btn-primary btn-lg w-75" onClick={login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome