import axios from 'axios'

const list =(params)=> axios.get('/category/sub',{params})
export default  {
    list
}