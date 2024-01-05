import { createRouter, createWebHistory } from 'vue-router'
import { getCookie } from '@/plugins/cookie'

import FavoritesView from '@/views/favorites/FavoritesView.vue'

const router = createRouter({
	scrollBehavior(to, from, savedPosition) {
		if (to.hash) {
			return {
				el: to.hash,
				behavior: 'smooth',
			}
		} else if (savedPosition) {
			return savedPosition
		} else {
			return {
				left: 0,
				top: 0,
				behavior: 'smooth',
			}
		}
	},
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			redirect: {
				name: 'main',
			},
		},
		{
			path: '/auth',
			name: 'auth',
			component: () => import('@/views/auth/AuthView.vue'),
		},
		{
			path: '/register',
			name: 'register',
			component: () => import('@/views/registration/RegistrationView.vue'),
		},
		{
			path: '/main',
			name: 'main',
			component: () => import('@/views/MainPageView.vue'),
		},
		{
			path: '/education',
			redirect: {
				path: '/education/all',
			},
		},
		{
			path: '/education/:type',
			name: 'education',
			component: () => import('@/views/EducationView.vue'),
		},
		{
			path: '/education/course/:id',
			name: 'course',
			component: () => import('@/views/CourseView.vue'),
		},
		{
			path: '/education/module/:id',
			name: 'module',
			component: () => import('@/views/ModuleView.vue'),
		},
		{
			path: '/education/sponsor/:id',
			name: 'sponsor',
			component: () => import('@/views/SponsorView.vue'),
		},
		{
			path: '/events',
			redirect: {
				path: '/events/all',
			},
		},
		{
			path: '/events/:type',
			name: 'events',
			component: () => import('@/views/events/EventsView.vue'),
		},
		{
			path: '/events/:type/:id',
			name: 'event',
			component: () => import('@/views/events/Event.vue'),
		},
		{
			path: '/media',
			name: 'media',
			component: () => import('@/views/MediaView.vue'),
		},
		{
			path: '/media/:id',
			name: 'article',
			component: () => import('@/views/ArticleView.vue'),
		},
		{
			path: '/communities',
			redirect: {
				path: '/communities/all',
			},
		},
		{
			path: '/communities/:type',
			name: 'communities',
			component: () => import('@/views/communities/CommunitiesView.vue'),
		},
		{
			path: '/personal',
			name: 'personal',
			component: () => import('@/views/personal/PersonalView.vue'),
		},
		{
			path: '/public/:id',
			name: 'public',
			component: () => import('@/views/public/PublicViev.vue'),
		},
		{
			path: '/favorites',
			redirect: {
				path: '/favorites/all',
			},
		},
		{
			path: '/favorites/:type',
			name: 'favorites',
			component: FavoritesView,
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'notFound',
			component: () => import('@/views/NotFoundView.vue')
		},
	],
})

router.beforeEach((to, from, next) => {
	if (to.name === 'public') {
		next()
	}
	else if (
		to.name !== 'auth' &&
		to.name !== 'register' &&
		!getCookie('accessToken') &&
		!getCookie('refreshToken')
	) {
		localStorage.setItem('location', to.path)
		next({ name: 'auth' })
	}
	else if (to.name === 'auth' && getCookie('accessToken') && getCookie('accessToken')) {
		next({name: 'main'})
	}
	else if (to.name === 'register' && getCookie('accessToken') && getCookie('accessToken')) {
		next({name: 'main'})
	}
	else {
		next()
	}
})

export default router
