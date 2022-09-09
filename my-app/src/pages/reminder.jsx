import React, { useRef, useState } from "react"
import { Form, Card, Alert, Container } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { Button } from '../components';
import { useAuth } from '../contexts/AuthContext'
import { MdOutlineCancel } from 'react-icons/md'
import { Navigate, Outlet } from 'react-router-dom';
const Reminder = () => {
    const navigate = useNavigate();
    let mainStyle = {
        'backgroundColor': '#EDE9E9`',
        'position': 'absolute',
        'width': '100%',
    }


    return (
        <div className="container h-100 bg-light ml-10" style={mainStyle}>
            <div className="row pt-10 mt-10"> 
                <div className="col-7 place-content-center bg-light">
                    <div className="row h-100 place-content-center">
                        <div className="col">
                            <div className="h1 text-center">Reminder</div>
                            <h1 className="text-center mt-9">Nice to see you back again! Have you updated all your fitness information today yet?  </h1>
                            <button className="mt-10 btn btn-primary  w-76 w-100" onClick={()=>navigate('/dashboard')}>
                            Yes, I’ve already uploaded it. 
                            </button>
                            <button className="mt-10 btn btn-primary  w-100" onClick={()=>navigate('/dashboard')}>
                            Not yet. If you are a Fitbit user. Please open Fitbit Mobile App to sync data. 
                            </button>
                            <button className="mt-10 btn btn-primary  w-100"onClick={()=>navigate('/MET')}>
                            Not yet. I prefer to self-report my fitness data. 
                            </button>

                            <button className="mt-10 btn btn-primary  w-100"onClick={()=>navigate('/nutrition')}>
                            I just need to report my nutrition updates
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default Reminder