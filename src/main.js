import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// 필요한 아이콘 solid 쪽에 추가 후 아래 library 안에 추가
library.add(faEdit, faPen);

Vue.config.productionTip = false

import AlertComponent from '@/components/AlertComponent.vue'
import ConfirmComponent from '@/components/ConfirmComponent.vue'
import ModalComponent from '@/components/ModalComponent.vue'

Vue.component('alert-component', AlertComponent);
Vue.component('confirm-component', ConfirmComponent);
Vue.component('modal-component', ModalComponent);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
