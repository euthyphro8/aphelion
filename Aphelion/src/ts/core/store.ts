import Vue from 'vue';
import Vuex from 'vuex';
import VueCookies from 'vue-cookies-ts';

import AuthStatus from '@/ts/coms/AuthStatus';
import Time from '@/ts/util/Time';

Vue.use(Vuex);
Vue.use(VueCookies);

const loadedState = {
  authenticated: false
}

console.log('Loading all cookies');
if(Vue.cookies.isKey('AuthStatus')) {
  console.log('Found AuthStatus cookie');
  let authStatus = Vue.cookies.get('AuthStatus') as AuthStatus;
  if(authStatus.isAuthenticated) {
    loadedState.authenticated = true;
  }
}


export default new Vuex.Store({
  state: loadedState,
  mutations: {
    authenticate(state) {
      state.authenticated = true;
      let status = { isAuthenticated: true} as AuthStatus;
      console.log('Storing AuthStatus cookie');
      Vue.cookies.set('AuthStatus', status, {
        expires: Time.MinutesFromNow(1),
        secure: true
      });
    }
  },
  actions: {

  }
});
