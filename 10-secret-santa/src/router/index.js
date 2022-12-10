import { createRouter, createWebHistory } from 'vue-router'
import Start from "../views/Start.vue"
import Hint1 from "../views/Hint1.vue"
import Hint2 from "../views/Hint2.vue"
import Hint3 from "../views/Hint3.vue"
import Riddle from "../views/Riddle.vue"

export const routeOpts = {
    start: '/',
    hint1: '/hint-1',
    hint2: '/hint-2',
    riddle: '/riddle',
    hint3: '/hint-3',
}

const routes = [
    { path: routeOpts.start, component: Start },
    { path: routeOpts.hint1, component: Hint1 },
    { path: routeOpts.hint2, component: Hint2 },
    { path: routeOpts.riddle, component: Riddle },
    { path: routeOpts.hint3, component: Hint3 },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router