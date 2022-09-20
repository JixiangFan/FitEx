import React from 'react'
import Leaderboard from './leaderboard';
import Leaderboard2 from './leaderboard2';
import { useRef, useState } from "react"
const LeadBoard = () => {
    const [team, setTeam] = useState(false)
    return (
      <>
        <div>{team ? <Leaderboard /> : <Leaderboard2 />}</div>
        <div
          style={{ backgroundColor: "#8AABBD" }}
          className=" btn btn-secondary border-2 border-slate-500 text-2xl"
          onClick={() => {
            setTeam(!team);
          }}
        >
          Switch to {team ? "Team" : "Personal"}
        </div>
      </>
    );
}
export default LeadBoard
