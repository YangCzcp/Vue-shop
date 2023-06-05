import actions from './actions.js'
import mutations from './mutations.js'
import getters from './getters.js'

const state = {
    // 保存用户信息
    profile: {
        username: '张三'
    }
}


export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}