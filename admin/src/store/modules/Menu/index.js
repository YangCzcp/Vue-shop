import mutations  from "./mutations"
import actions  from "./actions"
import getters from './getters'

const state={
    // 保存菜单信息
    menus:[]
}


export default{
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}