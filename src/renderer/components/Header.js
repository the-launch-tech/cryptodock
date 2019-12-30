import React from 'react'
import { Link } from 'react-router-dom'

export default props => {
  return (
    <nav className="h-full border-r-1 border-solid border-white-400 pl-3 pr-3 flex flex-col justify-start items-start">
      <div className="text-center w-full mb-5">
        <h4 className="text-red-2 font-display font-thin text-tiny cursor-default">CryptoDock</h4>
      </div>
      <ul className="w-full flex flex-wrap justify-start items-start">
        {props.routes.map((item, i) => (
          <li className="w-full mt-2 mb-2" key={i}>
            <Link
              to={item.link}
              className={`w-full inline-block text-center font-head pt-2 pb-2 border-1 border-solid rounded-lg transition transition-200 ${
                props.location.pathname === item.link
                  ? 'text-green-1 border-green-2 bg-white-100'
                  : 'border-white-400 hover:text-green-2 hover:border-green-2-400 active:text-white active:border-white-400'
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
