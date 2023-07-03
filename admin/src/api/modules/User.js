// 专门用于处理用户相关的接口
import axios from 'axios'
// 调用登录接口
const login  = (formData)=>axios.post('/admins/login',formData)
// 获取管理员信息
const info  = (params)=>axios.get('/admins',{params})
const list  = (params)=>axios.get('/admin/user/list',{params})

export default{
    login,
    info,
    list
}
