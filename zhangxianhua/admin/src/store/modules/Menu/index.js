import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

const state = {
    // 保存菜单
    menu:[]
}


export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}