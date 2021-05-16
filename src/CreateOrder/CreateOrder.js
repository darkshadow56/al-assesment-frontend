
import { Link } from 'react-router-dom'
import FormMethod from '../formMethods'
import validateData from '../validation'
import '../Forms/Form.css'

const CreateOrder=({submitForm})=> {
   const {handleSubmit,orderValues,handleCreating,errors}=FormMethod(submitForm,validateData)
    return (
        <>
        <div className="container">
            <h1 id='createOrderHeader'>Create Order</h1>
     <form className="form createOrderForm" onSubmit={handleSubmit}>

<div className="form-inputs">
   
        <input 
        id="orderName"
        type="text"
         name="orderName" 
         value={orderValues.orderName}
         onChange={handleCreating}
         className="form-control createOrderIp"
         placeholder="Enter order name"
         />
  {errors.orderName && <p>{errors.orderName}</p>}
</div>
<div className="form-inputs">
   
        <input 
        id="orderQuantity"
        type="text"
         name="orderQuantity" 
         value={orderValues.orderQuantity}
         onChange={handleCreating}
         className="form-control createOrderIp"
         placeholder="Enter order quantity"
         />
  {errors.orderQuantity && <p>{errors.orderQuantity}</p>}
</div>
<div className="form-inputs">
    
        <input 
        id="orderStatus"
        type="text"
         name="orderStatus" 
         value={orderValues.orderStatus}
         onChange={handleCreating}
         className="form-control createOrderIp"
         placeholder="Enter order status"
         />
  {errors.orderStatus && <p>{errors.orderStatus}</p>}
</div>

<button type="submit" className="btn btn-primary">
        Create Order
</button>
<br />
<Link to="/dashboard" className="btn btn-outline-primary">
    Display orders
</Link>

</form>
</div>
        </>
    )
}

export default CreateOrder
