import axios from 'axios'

const loadMenus = (params)=>axios.get('/menu/all',params) 

export default{
    loadMenus
}