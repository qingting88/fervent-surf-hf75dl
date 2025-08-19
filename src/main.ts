import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createMemoryHistory, createRouter } from 'vue-router'
import Billing from './components/Billing.vue'
import Card from './components/Card.vue'
import Trade from './components/Trade.vue';
import Connect from './components/Connect.vue';


const routes = [
  { path: '/', component: Connect },
  { path: '/trade',name:'trade', component: Trade },
  { path: '/billing',name:'billing', component: Billing },
  { path: '/card/:uuid',name:'card', component: Card },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

const app = createApp(App);
app.use(router).mount("#app");
