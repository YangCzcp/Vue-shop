import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import Vant from 'vant';
import 'vant/lib/index.css';
import '@/plugins/resquest'
import 'amfe-flexible/index.min.js'
import store from '@/store/index'

Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
