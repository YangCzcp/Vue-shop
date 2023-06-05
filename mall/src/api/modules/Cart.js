import axios from 'axios'
// 购物车
// 列表
const list = (params)=>axios.get('/cart/list',params)
// 加入购物车
const add = (formData)=>axios.post('/cart',formData)
// 删除
const del = (id,params)=>axios.delete(`/cart/${id}`,params)
// 购物车数量添加
const plus = (id,formData)=>axios.put(`/cart/increase/${id}`,formData)

// /increase

export default{
    list,
    del,
    add,
    plus
}