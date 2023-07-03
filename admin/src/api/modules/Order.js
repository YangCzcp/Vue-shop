import axios from 'axios'

const list = (params)=>axios.get('/seller/order/list',{params}) 
const update =(formData)=> axios.post('/seller/order/updateStatus',formData)

export default{
    list,
    update
   
}