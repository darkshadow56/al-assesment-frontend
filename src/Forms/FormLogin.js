import React from 'react'
import { Link } from 'react-router-dom'
import FormMethods from '../formMethods'
import validateData from '../validation'
import './Form.css'

const FormLogin = ({submitForm}) => {

    const {handleLoginChange, loginValues, handleLogin, errors,}=FormMethods(submitForm,validateData)

    return(
      <>
       <div className="form-container">
        
          {errors.user && <p>{errors.user}</p>}
          <form className="form" onSubmit={handleLogin}>
              <h1 id='login-header'>Login</h1>

              <div className="form-inputs">
                  
                      <input 
                      id="email"
                      type="text"
                       name="email" 
                       value={loginValues.email}
                       onChange={handleLoginChange}
                       className="form-input"
                       placeholder="Enter your email"
                       />
                {errors.email && <p>{errors.email}</p>}
              </div>
              <div className="form-inputs">
                  
                      <input 
                      id="password"
                      type="password"
                       name="password" 
                       value={loginValues.password}
                       onChange={handleLoginChange}
                       className="form-input"
                       placeholder="Enter password"
                       />
                {errors.password && <p>{errors.password}</p>}
              </div>
        
              <button 
              className="form-input-btn" 
              type="submit">
                Login
              </button>

              <span className="form-input-login">
                  New Here ? 
                  <Link id='loginLink' to="/signup">Signup Now</Link>
              </span>
          </form>
      </div>
      
      </>
    )
}

export default FormLogin
