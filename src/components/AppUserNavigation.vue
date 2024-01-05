<template>
	<div class="user-nav">
		<base-skeleton-path
			v-if="userStore.getDataLoadingStatus"
			:width="100"
			:height="20"
			class="user-nav__profile-button"
		/>
		<button v-else class="user-nav__profile-button" type="button" @click="navButtonClickHandler">
			<span class="user-nav__user-name"
				>{{ getUserData.first_name }} {{ getUserData.last_name }}
				{{ getUserData.middle_name }}</span
			>
		</button>
		<base-skeleton-path
			v-if="userStore.getDataLoadingStatus"
			:width="32"
			:height="32"
			class="user-nav__avatar-wrapper"
		/>
		<div v-else class="user-nav__avatar-wrapper" @click="navButtonClickHandler">
			<img
				v-if="getUserData.photo"
				class="user-nav__avatar"
				:src="getUserData.photo"
				:alt="`${getUserData.first_name} ${getUserData.last_name} ${getUserData.middle_name}`"
			/>
			<img
				v-else
                src="/src/assets/profile-avatars/avatar.png"
                alt="no photo"
                class="user-nav__avatar"
			/>
		</div>
		<div class="user-nav__modal" v-if="userNavOpened" @click.self="closeUserNav">
			<ul class="user-nav__nav-list">
				<li class="user-nav__nav-item">
					<router-link class="user-nav__link user-nav__link--icon-person" to="/personal">
						{{ t('Personal account') }}
					</router-link>
				</li>
				<li class="user-nav__nav-item">
					<router-link
						:class="[
							'user-nav__link',
							'user-nav__link--icon-external-link',
							!getUserData.is_published ? 'user-nav__link--disabled' : '',
						]"
						:to="'/public/' + getUserData.id"
					>
						{{ t('Public profile') }}
					</router-link>
				</li>
				<li class="user-nav__nav-item">
					<router-link
						:class="['user-nav__link', 'user-nav__link--icon-heart-blue']"
						to="/favorites"
					>
						{{ t('Favorite') }}
					</router-link>
				</li>
				<li class="user-nav__nav-item">
					<div class="user-nav__link user-nav__link--icon-exit" @click="deleteCookies()">{{ t('Exit') }}</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
const { getUserData } = storeToRefs(useUserStore())
import { deleteCookie } from '@/plugins/cookie'
import BaseSkeletonPath from '@/components/base/BaseSkeletonPath.vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const userStore = useUserStore()
const router = useRouter()
onMounted(() => userStore.fetchUserData())

const userNavOpened = ref(false)

const navButtonClickHandler = () => (userNavOpened.value = true)
const closeUserNav = () => (userNavOpened.value = false)

const deleteCookies = () => {
	deleteCookie('accessToken')
	deleteCookie('refreshToken')
	router.push('/auth')
}
</script>

<style>
.user-nav {
	padding: 0;
	display: grid;
	/*grid-template-columns: auto 32px 24px;*/
	grid-template-columns: auto 32px;
	grid-gap: 16px;
	align-items: center;
}

.user-nav__profile-button {
	margin: 0 0 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;

	border: none;
	background: none;
}

.user-nav__user-name {
	margin: 0;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	color: var(--text-primary-color);
	transition: var(--base-transition);
}

.user-nav__user-name:hover {
	color: var(--text-hover-color);
}

.user-nav__avatar-wrapper {
	width: 32px;
	height: 32px;
	display: flex;
    padding: 2px;
	justify-content: center;
	align-items: center;

	overflow: hidden;
	border-radius: 50%;
	cursor: pointer;
    border: 2px solid var(--stories-border-main-color);
}

.user-nav__avatar {
	object-fit: cover;
	width: 100%;
	height: 100%;
    border-radius: 50%;
}

.user-nav__notifications-button {
	position: relative;
	margin: 0;
	width: 24px;
	height: 24px;

	background: url('../assets/icons/icon-bell.svg') center no-repeat;
}

.user-nav__notifications-button--marked::before {
	content: '';
	position: absolute;
	top: -3px;
	right: -2px;

	display: block;
	width: 12px;
	height: 12px;

	background: url('../assets/icons/icon-mark.svg') center no-repeat;
}

.user-nav__modal {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	z-index: 1;
}

.user-nav__nav-list,
.user-nav__notifications-window {
	position: absolute;
	top: 80px;
	right: 60px;

	box-sizing: border-box;
	margin: 0;
	padding: 28px;
	display: grid;
	grid-template-columns: 314px;
	grid-row-gap: 16px;

	list-style: none;

	border-radius: 5px;
	background: var(--background-primary);
	box-shadow: var(--modal-window-shadow);
	transition: var(--base-transition);
	animation: slideDown 0.2s ease-in-out;
}

.user-nav__nav-item {
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
}

.user-nav__link {
	position: relative;
	margin: 0;
	padding: 0 0 0 32px;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 24px;
	color: var(--text-primary-color);
	text-decoration: none;

	transition: var(--base-transition);
}

.user-nav__link:hover,
.user-nav__link:focus {
	outline: none;
	color: var(--text-hover-color);
    cursor: pointer;
}

.user-nav__link::before {
	content: '';
	position: absolute;
	top: calc(50% - 12px);
	left: 0;

	display: block;
	width: 24px;
	height: 24px;
}

.user-nav__link--disabled {
	pointer-events: none;
	opacity: 0.5;
}

.user-nav__link--icon-person::before {
	background: url('../assets/icons/icon-person.svg') center no-repeat;
}

.user-nav__link--icon-external-link::before {
	background: url('../assets/icons/icon-external-link.svg') center no-repeat;
}

.user-nav__link--icon-heart-blue::before {
	background: url('../assets/icons/icon-heart-blue.svg') center no-repeat;
}

.user-nav__link--icon-crown::before {
	background: url('../assets/icons/icon-crown.svg') center no-repeat;
}

.user-nav__link--icon-transaction::before {
	background: url('../assets/icons/icon-transaction.svg') center no-repeat;
}

.user-nav__link--icon-exit::before {
	background: url('../assets/icons/icon-exit.svg') center no-repeat;
}

.user-nav__heading {
	margin: 0;
	padding: 0;

	font-family: var(--headings-font);
	font-weight: 700;
	font-style: normal;
	font-size: 24px;
	line-height: 28px;
	color: var(--headings-color);
}

.user-nav__notification-group {
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	gap: 16px;
}

.user-nav__group-topic {
	margin: 0;
	padding: 0;

	font-family: var(--text-font);
	font-weight: 600;
	font-style: normal;
	font-size: 16px;
	color: var(--text-primary-color);
}

.user-nav__notifications-list {
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	gap: 16px;

	list-style: none;
}

.user-nav__notifications-item {
	margin: 0;
	padding: 0;
	display: grid;
	grid-template-columns: 1fr 28px;
	grid-column-gap: 12px;
}

.user-nav__notifications-link {
	position: relative;
	box-sizing: border-box;
	margin: 0;
	padding: 0 0 0 36px;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	color: var(--text-hover-color);
	text-decoration: none;

	transition: var(--base-transition);
}

.user-nav__notifications-link::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;

	display: block;

	width: 24px;
	height: 24px;
}

.user-nav__notifications-link--icon-people::before {
	background: url('../assets/icons/icon-people.svg') center no-repeat;
}

.user-nav__notifications-link--icon-star::before {
	background: url('../assets/icons/icon-star.svg') center no-repeat;
}

.user-nav__notifications-link--icon-plane::before {
	background: url('../assets/icons/icon-plane.svg') center no-repeat;
}

.user-nav__notifications-link--icon-file-grey::before {
	background: url('../assets/icons/icon-file-grey.svg') center no-repeat;
}

.user-nav__notifications-link:hover,
.user-nav__notifications-link:focus {
	outline: none;
	color: var(--text-primary-color);
}

.user-nav path {
	transition: var(--base-transition);
}

.user-nav__notifications-link:hover ~ svg path,
.user-nav__notifications-link:focus ~ svg path {
	fill: #4c4c4c;
}

.user-nav__spare-hint {
	margin: 0;
	padding: 0;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	color: var(--text-secondary-color);
}

@media screen and (max-width: 768px) {
	.user-nav {
		grid-template-columns: auto;
	}

	.user-nav__profile-button {
		display: none;
	}
}

@media screen and (max-width: 500px) {
	.user-nav__nav-list {
		left: 20px;
		right: 20px;
	}
}

@keyframes slideDown {
	from {
		opacity: 0;
		transform: translateY(-300px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
