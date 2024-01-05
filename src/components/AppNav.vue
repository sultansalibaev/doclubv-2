<template>
	<nav class="app-navigation">
		<b class="app-navigation__subtitle">{{ t('Navigation') }}</b>
		<ul class="app-navigation__list">
			<li class="app-navigation__item" v-for="(page, index) in navPages" :key="index"
				@click="page.url === openedTab ? emit('on-close') : false">
				<router-link :exact="true" :class="[
					'app-navigation__link',
					page.url === openedTab ? 'app-navigation__link--active' : '', // check /education
					page.disabled ? 'app-navigation__link--disabled' : '',
				]" :to="page.url">
					{{ t(page.name) }}
				</router-link>
			</li>
		</ul>

		<b class="app-navigation__subtitle">{{ t('Profile') }}</b>
		<ul class="app-navigation__list">
			<li class="app-navigation__item" v-for="(page, index) in profilePages" :key="index"
				@click="page.url === openedTab ? emit('on-close') : false">
				<router-link :class="[
					'app-navigation__link',
					page.url === openedTab ? 'app-navigation__link--active' : '',
					page.disabled ? 'app-navigation__link--disabled' : '',
				]" :to="page.url">
					{{ t(page.name) }}
				</router-link>
			</li>
		</ul>
		<button class="app-navigation__logout-button" type="button" @click="deleteCookies()">
			{{ t('Log out') }}
		</button>
	</nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { deleteCookie } from '@/plugins/cookie'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const router = useRouter()

const emit = defineEmits(['on-close'])

const navPages = [
	{
		name: 'Home',
		url: '/main',
		disabled: false,
	},
	{
		name: 'Education',
		url: '/education',
		disabled: false,
	},
	{
		name: 'Events',
		url: '/events',
		disabled: false,
	},
	{
		name: 'News',
		url: '/media',
		disabled: false,
	},
	{
		name: 'Community',
		url: '/communities',
		disabled: false,
	},
]

const profilePages = [
	{
		name: 'Personal account',
		url: '/personal',
		disabled: false,
	},
]

const openedTab = computed(() => `/${router.currentRoute.value.name}`)

const deleteCookies = () => {
	deleteCookie('accessToken')
	deleteCookie('refreshToken')
	router.push('/auth')
}
</script>

<style>
.app-navigation {
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}

.app-navigation__subtitle {
	margin: 0 0 0 16px;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	letter-spacing: 1px;
	text-transform: uppercase;
	color: var(--text-secondary-color, rgba(0, 0, 0, 0.5));
}

.app-navigation__subtitle:not(:first-child) {
	margin-top: 40px;
}

.app-navigation__list {
	margin: 16px 0 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	list-style: none;
}

.app-navigation__item {
	display: flex;
}

.app-navigation__item:not(:first-child) {
	margin-top: 8px;
}

.app-navigation__link {
	box-sizing: border-box;
	margin: 0;
	padding: 8px 16px;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 18px;
	line-height: 24px;
	color: #000;
	text-decoration: none;

	border-radius: 12px;
	transition: var(--base-transition);
	cursor: pointer;
}

.app-navigation__link:hover,
.app-navigation__link:focus {
	outline: none;
	color: #4c4c4c;
}

.app-navigation__link--disabled {
	pointer-events: none;
	color: rgba(0, 0, 0, 0.5);
}

.app-navigation__link--active {
	color: #ffffff;
	background: #5c34f6;
}

.app-navigation__link--active:hover,
.app-navigation__link--active:focus {
	color: #ffffff;
	background: #a689e3;
}

.app-navigation__logout-button {
	box-sizing: border-box;
	margin: 8px 0 0;
	padding: 8px 16px;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 18px;
	line-height: 24px;
	color: #000;
	text-decoration: none;

	background: none;
	border-radius: 12px;
	transition: var(--base-transition);
	cursor: pointer;
}

.app-navigation__logout-button:hover,
.app-navigation__logout-button:focus {
	outline: none;
	color: #4c4c4c;
}
</style>
