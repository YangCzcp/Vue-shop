import axios from 'axios'
// 添加收藏
const collected = (fromData)=>axios.post('/collection',fromData)
// 取消收藏
const disCollected = (id,params)=>axios.delete(`/collection/${id}`,params)
const list = (params)=>axios.get(`/collection`,params)



export default{
    collected,
    disCollected,
    list
}