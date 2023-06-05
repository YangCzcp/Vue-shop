
import {User} from '@/api/index'
import router from '@/router/index'
const login = async ({commit,state},fromData)=>{

    let {status,data} = await User.login(fromData)
    
    if(status){
        // 调用mutations中的方法 将接口返回的用户数据保存在state中
        commit('setUserInfo',data)
        router.push('/')
    }
    return { status, data };
}


export default{
    login
}