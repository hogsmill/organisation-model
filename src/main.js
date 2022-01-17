import Vue from 'vue'
import App from './App.vue'
import VModal from 'vue-js-modal'
import { store } from './store/store'

require('./assets/site.css')

Vue.config.productionTip = false

Vue.use(VModal)

const app = new Vue({
  el: '#app',
  store,
  render: (h) => h(App),
})
