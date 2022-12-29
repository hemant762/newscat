import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, Outlet } from "react-router-dom";


export default function Navbar(props) {
  
  const [searchQuery,setSearchQuery] = useState('');

  const searchEvent = (event) => {
    setSearchQuery(event.target.value);
  }

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            {props.title}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sports">
                  Sports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/tech">
                  Tech
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  {props.aboutText}
                </Link>
              </li>
            </ul>
            <div className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={searchEvent}
                value={searchQuery}
              />
              <Link className="btn btn-outline-success" to={`/search/${searchQuery}`}>
                Search
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}

Navbar.propsType = {
  title: PropTypes.string.isRequired,
  aboutText: PropTypes.string,
};

Navbar.defaultProps = {
  aboutText: "About",
};
