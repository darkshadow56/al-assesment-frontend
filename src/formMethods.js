import {useState, useEffect} from 'react'
import validateData from './validation'
import Axios from 'axios'
import { Redirect, useHistory } from "react-router-dom"

const FormMethod=(callback,validateData) =>{

    let user={}
    const [orderValues,setOrderValues]=useState({
        orderName:'',
        orderStatus:'',
        orderQuantity:''
    })
   
    const [isCreating,setIsCreating]=useState(false)

    const handleCreating= e =>{
        const {name,value}=e.target
      
        setOrderValues({
            ...orderValues,
            [name]: value
        })
        console.log("values", orderValues)
    }

    const handleSubmit=e =>{
            e.preventDefault()
            console.log(orderValues,isCreating)
        setErrors(validateData(orderValues))
        setIsCreating(true)
        console.log(isCreating)
    }

   const history=useHistory()
    const [values, setValues]=useState({
        email:'',
        password:'',
        confirmPassword:''
    })
    const [loginValues, setLoginValues]=useState({
        email:'', 
        password:'',
    
    })

    const [errors, setErrors]=useState({})
    const [isSignup, setIsSignup]=useState(false)
    const [isLogin, setIsLogin]=useState(false)

    const handleChange= e =>{
        const {name,value}=e.target
      
        setValues({
            ...values,
            [name]: value
        })
        console.log("values", values)
    }
    const handleLoginChange= e =>{
        const {name,value}=e.target
      
        setLoginValues({
            ...loginValues,
            [name]: value
        })
       console.log(loginValues)
    }
    
    const handleLogin = e =>{
        e.preventDefault()

        setErrors(validateData(loginValues))
        setIsLogin(true)
        console.log(loginValues)
    }
    const handleSignup = e =>{
        e.preventDefault()

        setErrors(validateData(values))
        setIsSignup(true)
        console.log(values)
    }

    useEffect(()=>{
        if(Object.keys(errors).length === 0) {
            if(isCreating) {
                console.log("is creating")
                callback()
                Axios.post("https://applore-mern-stack.herokuapp.com/orders",{
                    orderName:orderValues.orderName,
                    orderStatus:orderValues.orderStatus,
                    orderQuantity:orderValues.orderQuantity
                },{
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("token")
                    }
                }).then(res=>{
                    res.status === 201 && <Redirect to="/dashboard"/>
                    console.log(res)
                })
            }

            if(isSignup) {
                callback()
                Axios.post('https://applore-mern-stack.herokuapp.com/users',{
                    email: values.email,
                    password:values.password
                }).then((res)=>{
                    console.log(res)
                })
            }

            if(isLogin) {
                callback()
                console.log(loginValues.email)
                Axios.post('https://applore-mern-stack.herokuapp.com/users/login',
                    
                        {
                        email: loginValues.email,
                        password:loginValues.password             
                
            }).then(res=>{
                    user={...res.data}
                    if(!user.token) {
                        errors.user="User does not Exist"
                    }
                    localStorage.setItem("token", user.token)
                    history.push('/dashboard')
                    console.log("Token",user.token)
                }).catch(err => {
            
                    console.log(err)
                })
            }
        } 
    }, [errors])

    return {setIsCreating,orderValues,handleCreating,handleSubmit,handleChange,values,handleSignup,handleLogin,errors,handleLoginChange,loginValues}
}

export default FormMethod