import Vue from 'vue';
import Router from 'vue-router';

import About from '@/components/views/About.vue';
import Account from '@/components/views/Account.vue';
import Game from '@/components/views/Game.vue';
import Home from '@/components/views/Home.vue';
import Leaderboard from '@/components/views/Leaderboard.vue';
import Login from '@/components/views/Login.vue';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/about',
      name: 'about',
      component: About,
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