import axios from 'axios'

const list =(params)=> axios.get('/seller/goods/list',{params})
export default  {
    list
}