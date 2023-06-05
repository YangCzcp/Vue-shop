import axios from 'axios'
// 列表
const list = (params)=>axios.get('/address/list',{params})
const add = (formData)=>axios.post('/address',formData)


export default{
    list,
    add
}