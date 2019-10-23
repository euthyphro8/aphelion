import Vue from 'vue';
import App from '@/components/App.vue';
import router from '@/ts/core/router';
import store from '@/ts/core/store';

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  console.log(`${from.name} => ${to.name}`);
  if(to.name !== 'login') {
    next('/login');
  }
  else {
    next();
  }
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
