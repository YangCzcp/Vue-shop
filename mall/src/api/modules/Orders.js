import axios from 'axios'
// 列表
const list = (params)=>axios.get('/order/list',{params})
const detail = (params)=>axios.get('/order/detail',{params})
const createOrder = (formData)=>axios.post('/order/create',formData)
const update = (formData)=>axios.post('/order/updateStatus',formData)
const pcpay = (formData)=>axios.post('/order/pcpay',formData)


export default{
    list,
    detail,
    createOrder,
    update,
    pcpay
}