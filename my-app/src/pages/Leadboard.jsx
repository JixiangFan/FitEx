import React from 'react'
import leaderboard from './leaderboard';
import leaderboard2 from './leaderboard2';
import { useRef, useState } from "react"
const LeadBoard = () => {
    const [team, setTeam] = useState(false)
    return (
        <>
            <div className="btn btn-primary" onClick={() => { setTeam(!team) }}>Switch {team ? "Team" : "Personal"}</div>
            <div>
            {team ? <leaderboard></leaderboard> : <leaderboard2></leaderboard2>}
            </div>
           
        </>
    )
}
export default LeadBoard
