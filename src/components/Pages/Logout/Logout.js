import React from "react"
import { Link } from "react-router-dom"

function Logout() {
    return (
      <div>
          <button className="addButton" type="submit">
              <Link to="/login">Logout</Link>
          </button>
      </div>
    )
  }
  export default Logout