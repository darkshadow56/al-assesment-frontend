import './App.css'
import React, { Component, useState } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route
} from 'react-router-dom'

import FormSignup from './Forms/FormSignup'
import FormLogin from './Forms/FormLogin'
import DisplayOrders from './Display/DisplayOrders'
import CreateOrder from './CreateOrder/CreateOrder'
import UpdateOrder from './UpdateOrder/UpdateOrder'

const Routes=(props) =>{
    const [isSubmitted,setIsSubmitted]=useState(false)
    
    function submitForm() {
        setIsSubmitted(true)
    }

    const authGuard=(Component) => () =>{
        return localStorage.getItem('token') ? 
        (<Component submitForm={submitForm}/>) :
        <Redirect to='/login' />
    }

return (

    <Router {...props}>
        <Switch>
            <Route path='/login'>
                <FormLogin submitForm={submitForm}/>
            </Route>
           
            <Route path='/signup'>
                <FormSignup submitForm={submitForm}/>
            </Route>
            <Route exact path='/'>
                <Redirect to="/dashboard"/>
            </Route>
        
            <Route path='/dashboard' render={authGuard(DisplayOrders)}>
              
            </Route>
            <Route path='/create' render={authGuard(CreateOrder)}>
            </Route>
            <Route path='/update' render={authGuard(UpdateOrder)}>
            </Route>

        </Switch>
    </Router>
)
};

export default Routes