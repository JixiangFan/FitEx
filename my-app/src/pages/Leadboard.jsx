import React from 'react'
import Leaderboard from './leaderboard';
import Leaderboard2 from './leaderboard2';
import { useRef, useState } from "react"
const LeadBoard = () => {
    const [team, setTeam] = useState(false)
    return (
        <>
            
            <div>
                {team ?
                    <Leaderboard></Leaderboard>
                    :
                    <Leaderboard2></Leaderboard2>
                }
            </div>
            <div className="btn btn-primary" onClick={() => { setTeam(!team) }}>Switch to {team ? "Team" : "Personal"}</div>
        </>
    )
}
export default LeadBoard
