import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todoList: [],
    alert: {
      isOpen: false,
      width: 0,
      height: 0,
      message: '',
      returnURL: '',
    }
  },
  getters: {

  },
  actions: {
    alertOpen({commit}, payload) {
      commit('setAlertOpen', payload);
    },
    alertClose({commit}, payload) {
      commit('setAlertClose', payload);
    },
    async requestMethods({state, dispatch}, payload) {
      const {header, method, url, data} = payload;

      try {
        const requestParams = {
          method: method,
          header: header ? header : {},
          url: url,
          data: data ? data : null
        };
  
        const response = await axios(requestParams);
        
        if (response && response.status && (response.status == 200 || response.status == 201)) {
          return response;
        }
        else {
          throw ({message: response.status_message});
        }
      }
      catch(ex) {
        console.error('error', ex);
      }
    }
  },
  mutations: {
    setAlertOpen(state, alertData) {
      state.alert = Object.assign(state.alert, alertData);
    },
    setAlertClose(state, alertData) {
      state.alert = Object.assign(state.alert, alertData);
    }
  },
})
