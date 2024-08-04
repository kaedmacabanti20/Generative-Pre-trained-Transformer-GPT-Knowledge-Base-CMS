import { createRouter, createWebHistory } from 'vue-router'
import AnalyticsView from '../views/AnalyticsView.vue'
import TestingView from '../views/TestingView.vue'
import ChatbotSettingsView from '../views/ChatbotSettingsView.vue'
import KnowledgeSourceView from '../views/KnowledgeSourceView.vue'
import ClassifierView from '../views/ClassifierView.vue'
import InformationView from '../views/InformationView.vue'
import AccountView from '../views/AccountView.vue'
import DetailsView from '../views/DetailsView.vue'
import Login from '../components/Login.vue'
import { useStore } from 'vuex';
 
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/analytics',
      name: 'analytics',
      component: AnalyticsView,
      meta: { requiresAuth: true},
    },
    {
      path: '/testing',
      name: 'testing',
      component: TestingView,
      meta: { requiresAuth: true },
    },
    {
      path: '/chatbot-settings',
      name: 'chatbot-settings',
      component: ChatbotSettingsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/knowledge-source',
      name: 'knowledge-source',
      component: KnowledgeSourceView,
      meta: { requiresAuth: true },
    },
    {
      path: '/knowledge-source/main/classifier',
      name: 'classifier',
      component: ClassifierView,
      meta: { requiresAuth: true },
    },
    {
      path: '/knowledge-source/:information',
      name: 'Information',
      component: InformationView,
      meta: { requiresAuth: true },
    },
    {
      path: '/analytics/:customId',
      name: 'Details',
      component: DetailsView,
      meta: { requiresAuth: true },
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const store = useStore();

  console.log('Before navigation, isAuthenticated:', store.getters['isAuthenticated']);
  
  await store.dispatch('checkAuthentication'); 
  const isAuthenticated = store.getters['isAuthenticated'];

  console.log('After checkAuthentication, isAuthenticated:', isAuthenticated);

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});



export default router
