import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'

const Welcome = () => {
  let mainStyle = {
    'backgroundImage': `url(./background2.jpg)`,
    'backgroundRepeat': 'no-repeat',
  'backgroundSize': '100%',
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
      <div className="columns-2 h-screen">
     
            <Container className="pt-48 pl-20">
              <div class="ratio ratio-16x9 ">
                <iframe
                  src="https://www.youtube.com/embed/SmSoZvSmHeU"
                  title="Welcome Video"
                  allowFullScreen
                />
              </div>
            </Container>
  
        <div className="col pt-48">
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
                style={{ backgroundColor: "#8AABBD" }}
                className=" btn btn-secondary border-2 border-slate-500 btn-lg w-75 text-2xl"
                onClick={register}
              >
                Join Now
              </button>
            </div>
          </div>

          <div className="col-md-4 text-center mt-8 ml-52">
            <button
              style={{ backgroundColor: "#8AABBD" }}
              className=" btn btn-secondary border-2 border-slate-500 btn-lg w-75 text-2xl"
              onClick={login}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome