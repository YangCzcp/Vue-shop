import mutations  from "./mutations"
import actions  from "./actions"
import getters from './getters'
// 保存数据
const state={
    profile:''  // 保存用户信息
}

export default{
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}