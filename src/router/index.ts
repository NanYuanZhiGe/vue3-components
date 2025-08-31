import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/splitTestView',
      name: 'splitTestView',
      component: () => import('@/views/SplitTestView.vue'),
    },
  ],
})

export default router
