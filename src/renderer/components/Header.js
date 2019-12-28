import React from 'react'
import { Link } from 'react-router-dom'

export default props => {
  return (
    <nav className="h-full border-r border-solid border-white pl-3 pr-3 flex flex-col justify-start items-start">
      <div className="text-center w-full mb-10">
        <h4 className="text-red-2 font-head font-thin">CryptoDock</h4>
      </div>
      <ul className="w-full flex flex-wrap justify-start items-start">
        {props.routes.map((item, i) => (
          <li className="w-full mt-2 mb-2" key={i}>
            <Link
              to={item.link}
              className={`w-full inline-block text-center font-head pt-2 pb-2 border border-solid rounded-lg transition transition-200 ${
                props.location.pathname === item.link
                  ? 'text-red-2 border-red-2'
                  : 'border-white hover:text-red-2 hover:border-red-2 active:text-white active:border-white'
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
