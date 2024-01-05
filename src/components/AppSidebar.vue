<template>
	<div class="sidebar">
		<app-logo class="sidebar__logo" logo-theme="white" />
		<app-nav class="sidebar__navigation" @on-close="emit('closeMenu')" />
		<button class="sidebar__close-button" type="button" @click="closeButtonClickHandler" />

		<div class="sidebar__legal-info-wrapper">
			<p class="sidebar__legal-data">
				{{ t('The platform is currently available in beta version.') }}<br />
				{{ t('If you encounter any errors, please contact us') }}:
			</p>
			<a class="sidebar__data-processing-link" href="mailto:mm.support@doclub.tech" target="_blank">
				mm.support@doclub.tech
			</a>
		</div>
	</div>
</template>

<script setup>
import AppLogo from '../components/AppLogo.vue'
import AppNav from '../components/AppNav.vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n();

const emit = defineEmits(['closeMenu'])

function closeButtonClickHandler() {
	emit('closeMenu')
}
</script>

<style>
.sidebar {
	position: sticky;
	top: 0;
	left: 0;

	box-sizing: border-box;
	margin: 0;
	padding: 40px 16px 32px;
	width: 100%;
	height: 100vh;
	max-width: 330px;
	display: flex;
	flex-direction: column;

	overflow: auto;
	background: var(--sidebar-background-color);
}

.sidebar__logo {
	margin: 0 0 0 16px;
}

.sidebar__navigation {
	margin: 40px 0 40px;
	padding: 0;
}

.sidebar__legal-info-wrapper {
	margin: auto 16px 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}

.sidebar__company-name {
	margin: 0;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 18px;
	line-height: 24px;
	color: var(--sidebar-legal-text-primary-color);
}

.sidebar__data-processing-link {
	margin: 16px 0 0;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	color: var(--sidebar-legal-text-primary-color);
	text-decoration-line: underline;
}

.sidebar__legal-data {
	margin: 16px 0 0;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 14px;
	line-height: 16px;
	color: var(--sidebar-legal-text-secondary-color);
}

.sidebar__close-button {
	position: absolute;
	top: 16px;
	right: 16px;
	width: 20px;
	height: 20px;
	display: none;
}

.sidebar__close-button::before,
.sidebar__close-button::after {
	content: '';
	position: absolute;
	top: calc(50% - 1px);
	left: calc(50% - 10px);

	display: block;
	width: 20px;
	height: 2px;

	background: var(--gray-500-neutral);
	border-radius: 1px;
}

.sidebar__close-button::before {
	transform: rotate(45deg);
}

.sidebar__close-button::after {
	transform: rotate(-45deg);
}

@media screen and (max-width: 1024px) {
	.sidebar__close-button {
		display: block;
	}
}

@media screen and (max-width: 500px) {
	.sidebar {
		max-width: unset;
	}
}
</style>
