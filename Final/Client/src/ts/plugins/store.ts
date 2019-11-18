import Vue from 'vue';
import Vuex from 'vuex';
import VueCookies from 'vue-cookies-ts';
import Client from '../coms/Client';

// import Time from '@/ts/util/Time';
// import StoreLoader from '../util/StoreLoader';

Vue.use(Vuex);
Vue.use(VueCookies);


const unloadedState = {
    client: new Client(),
    authenticated: false,
};


export default new Vuex.Store({
    state: unloadedState,
    mutations: {
        authenticate(state) {
            state.authenticated = true;
        }
    },
    actions: {
    }
});
