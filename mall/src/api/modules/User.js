import axios from 'axios'
// 列表
const login = (formData)=>axios.post('/vueuser/login',formData) 
const register = (formData)=>axios.post('/vueuser/register',formData) 
const update = (formData)=>axios.put('/vueuser/update',formData) 

export default{
    login,
    register,
    update
}