import {Menu} from '@/api/index'
const LoadMenu = async ({commit},formData)=>{
    
    // 调用/admins接口
    let {status,data} = await Menu.loadTree(formData)
    
    if(status){
        commit('saveMenu',data)
    }
    return { status, data };
    
}
export default{
    LoadMenu
}