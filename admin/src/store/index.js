import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 这是所有vuex的入口
import User from './modules/User/index'
import Menu from './modules/Menu/index'



export default new Vuex.Store({
    modules:{
        User,
        Menu
    }
})