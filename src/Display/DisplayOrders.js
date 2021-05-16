import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import UpdateOrder from '../UpdateOrder/UpdateOrder'
import '../Forms/Form.css'


export default class DisplayOrders extends React.Component {

constructor(props) {
    super(props)
        this.state= {
            orders: [],
            updateComponent: false,
            component: null
        }
}

 LoadComponent(value){
    this.setState({
        updateComponent: true,
        component: <UpdateOrder order={value}/>
    })

    console.log(this.state.updateComponent)
}

 delete(item)  {
       
         axios.delete(`https://applore-mern-stack.herokuapp.com/orders/${item._id}`,{
            headers:{
                "Content-Type":"application/josn",
                "Authorization":"Bearer "+localStorage.getItem("token")
            }
        })
        .then(res=> {
            console.log(res,item)
            if(res.status === 200) 
            {
                console.log(res.status)
                const orders=this.state.orders.filter(i=>{
                    console.log("delete",i)
                   return i._id !== item._id
                    })
                 this.setState({orders})
            }
        })
    
     console.log(item)
     
    console.log(this.state.orders)
 }


 componentDidMount() {

    axios.get('https://applore-mern-stack.herokuapp.com/orders/display',{
        headers: {
            "Content-Type":"application/json",
            "Authorization": "Bearer "+localStorage.getItem('token')
        }
    }).then(res=>{
        const orders=res.data
        this.setState({orders})
        console.log("inside display orders")
        console.log(res.data)
    })
 }

 render () { 

    const newOrders= this.state.orders.map((val)=>{
        return (
            
          <div key={val._id} className="card-body">
              <h5 className="card-title">
                  {val.orderName}
              </h5>
              <p className="card-text">   
              <strong>  Qunatity: </strong> {val.orderQuantity}
              </p>
              <p className="card-text">
                <strong> Order status: </strong> {val.orderStatus}
              </p>
              <p className="card-text">
              <strong> Date created:</strong> {val.createdAt.toString().split('T')[0]}
              </p>

             <button className="btn btn-danger" type="button" onClick={this.delete.bind(this,val)}>Delete</button>
            
                <button className="btn btn-primary" onClick={()=> this.LoadComponent(val)}>
                Update
                </button>
          </div>
      
        ) 
     })
 
    return (
        <>
     { 
     !this.state.updateComponent ?
     <>
     <div className='containerDashboard'>
          <div className="container">
          <Link to='/create' className="btn createOrderBtn btn-success">Create Order</Link>
      </div>
          <div className="container">
          <button className="btn logoutBtn btn-danger" onClick={async () => {
                await axios.post('https://applore-mern-stack.herokuapp.com/users/logout',{
              headers:{
                  'Content-Type':'application/json',
                  'Authorization':'Bearer '+localStorage.getItem('token')
              }
          })
         
}
    }>Logout</button>
      </div>
</div>
      <div className="container">
          <br/>
      <div className="card">
         
     {newOrders}  
         
     </div>
     </div>
     </>
     : 
     this.state.component
     }
       
 </>
     
    )
 }
}
