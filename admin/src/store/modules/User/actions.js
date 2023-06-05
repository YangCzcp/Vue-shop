import {User} from '@/api/index'
const loadInfo = async ({commit,state},fromData)=>{
    
    // 调用/admins接口
    let {status,data} = await User.info(fromData)
    
    if(status){
        commit('setProfile',data)
    }
    return { status, data };
    
}


export default{
    loadInfo
}