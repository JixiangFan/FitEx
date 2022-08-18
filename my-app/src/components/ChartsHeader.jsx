import React from 'react'

const ChartsHeader = ({ category, title }) => (
  <div className=" mb-10">
    <div>
      <p className="text-3xl font-extrabold tracking-tight dark:text-gray-200 text-slate-900">Team Contributions</p>
    </div>
    <p className="text-center dark:text-gray-200 text-xl mb-2 mt-3">{title}</p>
  </div>
);

export default ChartsHeader