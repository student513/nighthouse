import React from "react"
import { Link } from "react-router-dom"

const Links = () => {
  return (
    <>
      <Link to="/" className="navbar-brand">
        Night House
      </Link>
      <div className="collpase navbar-collapse">
        <div className="navbar-nav mr-auto">
          <div className="collpase navbar-collapse">
            <Link to="/url/create" className="nav-link">
              Create Real Device{" "}
            </Link>
          </div>
          <div className="collpase navbar-collapse">
            <Link to="/url/list" className="nav-link">
              Real Device List
            </Link>
          </div>

          {/* <div className="collpase navbar-collapse">
            <Link to="/url/headless/create" className="nav-link">
              Create Headless
            </Link>
          </div>
          <div className="collpase navbar-collapse">
            <Link to="/url/headless/list" className="nav-link">
              Headless List
            </Link>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default Links
