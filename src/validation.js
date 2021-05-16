
export default function validateData(values) {
    let errors={}
   console.log(values,Object.keys(values)[0].includes('order'),Object.keys(values))
   if(Object.keys(values)[0].includes('order').toString() === 'false') {
    if(!values.email.trim()){
        errors.email="Email required"
    } else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email="Email is Invalid"
    }

    if((!values.password)) {
        errors.password='Password is required'
    } else if(values.password.length<6) {
        errors.password='Password needs to be 6 characters or more'
    }

    if(Object.keys(values).length === 3) {

        if(!values.confirmPassword) {
            errors.password='Password is required'
        }
    
        if(values.confirmPassword !== values.password) {
            errors.confirmPassword ='Passwords do not match'
        }
    }
}
else {

        if(!values.orderName.trim()) {
            errors.orderName='Order Name is required'
        }
        if(!values.orderQuantity.trim()) {
            errors.orderQuantity='Order Quantity is required'
        }
        if(!values.orderStatus.trim()) {
            errors.orderStatus='Order Status is required'
        }
    
}
    console.log("Errors",errors)
    return errors
}
