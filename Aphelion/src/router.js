import Vue from 'vue';
import Router from 'vue-router';

import About from './views/About.vue';
import Account from './views/Account.vue';
import Game from './views/Game.vue';
import Home from './views/Home.vue';
import Leaderboard from './views/Leaderboard.vue';
import Login from './views/Login.vue';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: Leaderboard 
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});
