import {Menu} from '@/api/index'

const loadMenu = async ({commit,state},fromData)=>{
   
    // axios.get('/admins',{fromData})
    let {status,data} = await Menu.loadMenus()
    if(status){
        // 调用mutations中的方法 将接口返回的用户数据保存在state中
        commit('setMenus',data)
    }
    return { status, data };
}


export default{
    loadMenu
}