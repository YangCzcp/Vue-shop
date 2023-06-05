import axios from 'axios'
// 列表
const list = (params)=>axios.get('/goods/list',{params})
const details = (id,params)=>axios.get(`/goods/details/${id}`,{params})
export default{
    list,
    details
}