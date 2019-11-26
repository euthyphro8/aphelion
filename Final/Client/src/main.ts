import Vue from 'vue';

import App from '@/components/App.vue';
import router from '@/ts/plugins/router';
import store from '@/ts/plugins/store';

import Client from '@/ts/coms/Client';


Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
    console.log(`${from.name} => ${to.name}`);
    if (to.name !== 'login' && to.name !== 'about' && !store.state.authenticated) {
        next('/login');
    } else if (to.name === 'login' && store.state.authenticated) {
        next('/');
    } else {
        next();
    }
});

// store.state.

new Vue({
    router,
    store,
    render: (h: any) => h(App)
}).$mount('#app');

