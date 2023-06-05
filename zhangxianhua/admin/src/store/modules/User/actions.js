
import {User} from '@/api/index'
const loadInfo = async ({commit,state},fromData)=>{
    console.log(fromData)
    // axios.get('/admins',{fromData})
    let {status,data} = await User.info(fromData)
    if(status){
        // 调用mutations中的方法 将接口返回的用户数据保存在state中
        commit('setProfile',data)
    }
    return { status, data };
}


export default{
    loadInfo
}