import axios from 'axios'

const list = (params)=>axios.get('/goods/sub',{params})

export default{
    list
}