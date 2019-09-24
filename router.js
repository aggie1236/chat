import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/chat',
        name: 'chatting_room',
        component: require('~/pages/chat').default
      },
    ]
  })
}
