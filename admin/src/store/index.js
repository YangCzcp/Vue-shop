import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-plugin-persistedstate";

import User from './modules/User/index'
import Menu from './modules/Menu/index'

Vue.use(Vuex);


export default new Vuex.Store({
    modules:{
        User:User,
        Menu:Menu
    },
    plugins: [createPersistedState()]
})