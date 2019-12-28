import React from 'react'
import { Link } from 'react-router-dom'

export default props => {
  return (
    <nav>
      <div>
        <h2>CryptoDock</h2>
      </div>
      <ul>
        <li>
          <Link to="/">Overview</Link>
        </li>
        <li>
          <Link to="/builders">Data Builders</Link>
        </li>
        <li>
          <Link to="/dbmanager">DB Manager</Link>
        </li>
      </ul>
    </nav>
  )
}
