import axios from 'axios'
// 列表
const list = (params)=>axios.get('/seller/goods/list',{params}) 
// 添加
const add = (formData)=>axios.post('/seller/goods',formData) 
// 商品详情
const detail = (params)=>axios.get('/seller/goods',{params}) 
// 商品更新
const update = (id,formData)=>axios.put(`/seller/goods/${id}`,formData) 
// 删除
const remove = (id,params)=>axios.delete(`/seller/goods/${id}`,params) 

export default{
    list,
    add,
    detail,
    update,
    remove
}