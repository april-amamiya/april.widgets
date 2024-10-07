import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

export function createAppRouter() {
  return createRouter({
    history: createWebHistory(),
    routes,
  })
}
