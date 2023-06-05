import axios from 'axios'

const loadTree =(params)=> axios.get('/menu/all',{params})

export default  {
    loadTree
}