import React, { useState, useEffect } from 'react'
import classes from './index.module.css'
import { createStructuredSelector } from 'reselect'
import {
  createAccStart,
  getUserStart,
  loginStart
}
  from './actions'
import {
  makeSelectComplete
}
  from './selectors'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useInjectReducer, useInjectSaga } from '../../redux/reduxInjectors'
import reducer from './reducer'
import saga from './saga'
const key = "loginRoot"

const stateStructor = createStructuredSelector({
  complete: makeSelectComplete()
})
const Login = () => {
  useInjectReducer(key, reducer)
  useInjectSaga(key, saga)
  const [newAcc, setNewAcc] = useState(true)
  const distpatch = useDispatch();
  const {
    complete
  } = useSelector(stateStructor)
  useEffect(() => {
    distpatch(getUserStart())
  }, [])

  const handlerSubmit = (event) => {
    event.preventDefault()
    const email = event.target.email.value;
    const password = event.target.password.value;
    let newUSer = {
      email: email,
      password: password,
    }
    if (event.target.id === 'signup') {
      distpatch(createAccStart({ ...newUSer, name: event.target.username.value }))
    }
    if (event.target.id === 'login') {
      distpatch(loginStart({ ...newUSer }))
    }
  }
  if(complete){
      window.location = '/'
  }
  return (
    <div className="container">
      {
        newAcc ? (
          <div className={`card ${classes.Card}`}>
            <form id="login" onSubmit={handlerSubmit} className={classes.box}>
              <h1>Login</h1>
              <p className="text-muted"> Please enter your login and password!</p>
              <input type="text" name="email" placeholder="Email" />
              <input type="password" name="password" placeholder="Password" />
              <a className={`text-muted ${classes.forgot}`}>Forgot password?</a>
              <input type="submit" name="submit" placeholder="Create Account" />
              <div className="col-md-12">
                <ul className={`${classes.socialNetwork} ${classes.socialCircle}`}>
                  <li><a className="icoFacebook" title="Facebook"><i className="fab fa-facebook-f" /></a></li>
                  <li><a className="icoTwitter" title="Twitter"><i className="fab fa-twitter" /></a></li>
                  <li><a className="icoGoogle" title="Google +"><i className="fab fa-google-plus" /></a></li>
                </ul>
                <p className="text-muted" onClick={() => setNewAcc(false)}>
                  Sign Up
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className={`card ${classes.Card}`}>
            <form id="signup" onSubmit={handlerSubmit} className={classes.box}>
              <h1>Sign Up</h1>
              <input type="text" name="email" placeholder="Email" />
              <input type="password" name="password" placeholder="Password" />
              <input type="text" name="username" placeholder="User Name" />
              {/* <input type="text" name ="firstname" placeholder="First Name" />
                            <input type="text" name ="lastname" placeholder="Last Name" />
                            <input type="text" name ="city" placeholder="City" />
                            <input type="text" name ="street" placeholder="Street" />
                            <input type="text" name ="number" placeholder="Number" />
                            <input type="text" name ="phone" placeholder="Phone" />     */}

              <input type="submit" name="submit" />
              <div className="col-md-12">
                <ul className={`${classes.socialNetwork} ${classes.socialCircle}`}>
                  <li><a className="icoFacebook" title="Facebook"><i className="fab fa-facebook-f" /></a></li>
                  <li><a className="icoTwitter" title="Twitter"><i className="fab fa-twitter" /></a></li>
                  <li><a className="icoGoogle" title="Google +"><i className="fab fa-google-plus" /></a></li>
                </ul>
                <p className="text-muted" onClick={() => setNewAcc(true)}>
                  Login
                </p>
              </div>
            </form>
          </div>
        )
      }
    </div>
  )
}

export default Login
