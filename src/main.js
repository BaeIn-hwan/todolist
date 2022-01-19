import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import AlertComponent from '@/components/AlertComponent.vue'
import ConfirmComponent from '@/components/ConfirmComponent.vue'
import ModalComponent from '@/components/ModalComponent.vue'

Vue.component('alert-component', AlertComponent);
Vue.component('confirm-component', ConfirmComponent);
Vue.component('modal-component', ModalComponent);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
