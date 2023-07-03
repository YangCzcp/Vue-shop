import axios from 'axios'
// 全部分类
const all = (params)=>axios.get('/category/all',{params}) 

// 子类
const list = (params)=>axios.get('/category/sub',{params}) 
const del = (id,params)=>axios.delete(`/category/${id}`,params) 
const add = (formData)=>axios.post(`/category`,formData) 

export default{
    list,
    all,
    del,
    add
}