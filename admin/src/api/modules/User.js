import axios from 'axios'
// 登录接口
const login =(formData)=> axios.post('/admins/login',formData)
// 获取管理员
const info =(params)=> axios.get('/admins',{params})



export default  {
    login,
    info
}