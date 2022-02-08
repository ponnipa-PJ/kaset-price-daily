import Vue from "vue";
import Router from "vue-router";
import Home from './components/Home.vue';
import HelloWorld from './components/HelloWorld.vue';

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/hello",
      alias: "/hello",
      name: "hello",
      component: HelloWorld
    },
  ]
});
