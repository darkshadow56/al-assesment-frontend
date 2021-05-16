import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import DisplayOrders from '../Display/DisplayOrders'
import validateData from '../validation'

const UpdateOrder=(props)=> {
    console.log(props.order)
    console.log(JSON.stringify(localStorage.getItem('order')))
    const [values,setValues]=useState({
        orderName:'',
        orderStatus:'',
        orderQuantity:''
    })
    const [errors,setErrors]=useState({})
    const [change,setChange]=useState(false)
    const [display,setDisplay]=useState(false)

    const handleChange= e =>{
        const {name,value}=e.target
      setChange(true)
      setValues({...values, [name]: value})
        console.log("values", values)
    }

    const handleSubmit=e =>{
            e.preventDefault()
        setErrors(validateData(values))
    }

    useEffect(()=>{ 
        if(Object.keys(errors).length === 0) {
            axios.put(`https://applore-mern-stack.herokuapp.com/orders/update/${props.order._id}`,{
                orderName:values.orderName,
                orderStatus:values.orderStatus,
                orderQuantity:values.orderQuantity
            },{
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+localStorage.getItem("token")
                }
            }).then(res=>{
                if(res.status === 200) {
                <Redirect to="/dashboard"/>
            }
                console.log(res)
            })
        }
    })

    return (<>
        {
        !display ?    <>
        <div className="container">
        <h1>Update Order</h1>
         
     <form className="form" onSubmit={handleSubmit}>

<div className="form-inputs">
    <label htmlFor="orderName" >
   Order Name
    </label>
        <input 
        id="orderName"
        type="text"
         name="orderName" 
         value={change ? values.orderName :props.order.orderName}
         onChange={handleChange}
        
         className="form-control"
         placeholder="Enter order name"
         />
  {errors.orderName && <p>{errors.orderName}</p>}
</div>
<div className="form-inputs">
    <label htmlFor="orderQuantity" >
   Order Quantity
    </label>
        <input 
        id="orderQuantity"
        type="text"
         name="orderQuantity" 
         value={change ? values.orderQuantity :props.order.orderQuantity}
         onChange={handleChange}
        
         className="form-control"
         placeholder="Enter order quantity"
         />
  {errors.orderQuantity && <p>{errors.orderQuantity}</p>}
</div>
<div className="form-inputs">
    <label htmlFor="orderStatus">
   Order Status
    </label>
        <input 
        id="orderStatus"
        type="text"
         name="orderStatus" 
         value={change ? values.orderStatus :props.order.orderStatus}
         onChange={handleChange}
        
         className="form-control"
         placeholder="Enter order status"
         />
  {errors.orderStatus && <p>{errors.orderStatus}</p>}
</div>

<button type='submit' className="btn btn-primary">
        Update Order
</button><br/>
<button onClick={()=> setDisplay(true)} className="btn btn-outline-primary">Display Order</button>
</form>
</div>
      </> 
      :
      <DisplayOrders />
      }
        </>
    )
}

export default UpdateOrder
