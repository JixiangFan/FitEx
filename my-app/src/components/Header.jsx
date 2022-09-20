import React from 'react'

const Header = ({ category, title }) => (
  <div className=" mb-10">
    <p className="text-xl text-gray-400">{category}</p>
    <p className="text-4xl font-extrabold tracking-tight text-slate-900">
      {title}
    </p>
  </div>
);


export default Header