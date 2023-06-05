import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import createPersistedState from "vuex-plugin-persistedstate";
// 这是所有vuex的入口
import User from './modules/User/index'
import Cart from './modules/Cart/index'


export default new Vuex.Store({
    modules:{
        User,
        Cart
    },
    plugins: [createPersistedState()]
})