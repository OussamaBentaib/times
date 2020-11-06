import React, { useState } from "react";
import { FiAlignJustify, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ReactComponent as Brand } from "./../../assets/svg/times.svg";
export default function Header() {
  const defaultView = window.location.pathname.split("/")[1];
  const [selected, setSelected] = useState(defaultView);
  const [query, setQuery] = useState("");
  return (
    <nav className="navbar navbar-expand-lg navbar-light" id="topnav">
      <div className="container">
        <button
          className="navbar-toggler mr-auto"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="">
            <FiAlignJustify />
          </span>
        </button>
        <Link className="navbar-brand mr-auto" to="/">
          <Brand height="40px" />
        </Link>
        <form className="form-inline mr-4 d-none d-lg-flex">
          <div className="input-group rounded input-group-merge">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="form-control form-control-prepended"
              placeholder="Search for articles"
            />
            <div className="input-group-prepend">
              <div className="input-group-text">
                <FiSearch />
              </div>
            </div>
          </div>
        </form>
        <div className="navbar-user">
          <div className="dropdown">
            <Link to={`/search/?query=${query}`} className="btn btn-dark">
              Search
            </Link>
          </div>
        </div>
        <div
          className="collapse navbar-collapse mr-lg-auto order-lg-first"
          id="navbar"
        >
          <ul className="navbar-nav mr-lg-auto">
            <li className="nav-item">
              <Link
                to="/stories/home/"
                className={`nav-link ${selected === "stories" && "active"}`}
              >
                <span onClick={() => setSelected("stories")}>Top Stories</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/popular/shared/"
                className={`nav-link ${selected === "popular" && "active"}`}
              >
                <span onClick={() => setSelected("popular")}>Most Popular</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
