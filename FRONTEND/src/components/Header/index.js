import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import classes from './index.module.css'
import { FaUserAlt } from 'react-icons/fa';
import { AiFillProfile } from 'react-icons/ai';
import { Dropdown, Menu, Space } from 'antd';

const Header = () => {
  const [token, setToken] = useState('')
  useEffect(() => {
    console.log(token)
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token')
      setToken(token)
    }
  }, [])

  const handlerLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    window.location = '/';
  }

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <NavLink to="/profile">Profile</NavLink>
          ),
        },
        {
          key: '2',
          label: (
            <NavLink to="/my-courses">My courses</NavLink>
          ),
        },
      ]}
    />
  );
  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
        <a className="navbar-brand" href="#">
          <img width="150px" src="https://t3.ftcdn.net/jpg/03/92/80/46/360_F_392804645_tUQxo5EgPXvFGxn5OQguX1BiYlI6lCOV.jpg" />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active" >
              <NavLink className={`nav-link ${classes.menuItem}`} to="/">News <span className="sr-only">(current)</span></NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={`nav-link ${classes.menuItem}`} to="/courses">Course</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={`nav-link ${classes.menuItem}`} to="/teachers">Teacher</NavLink>
            </li>
          </ul>
          <div className={`menu-right ${classes.menuRight}`} style={{ fontSize: "20px", paddingRight: "30px" }}>
            <Dropdown overlay={menu}>
              <p className={token === '' ? `nav-link ${classes.menuItem} ${classes.nonActive}` : `nav-link ${classes.menuItem} ${classes.Active}`}>Account<AiFillProfile /></p>
            </Dropdown>
            {token === '' ?
              <NavLink className={`nav-link ${classes.menuItem}`} to="/login">Login <FaUserAlt /> </NavLink> :
              <span onClick={handlerLogout} className={`nav-link ${classes.menuItem}`}>Logout <FaUserAlt /></span>
            }

          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
