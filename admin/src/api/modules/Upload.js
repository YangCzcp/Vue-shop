import axios from 'axios'

const remove = (params)=>axios.delete('/upload',{params})


export default{
    remove
}