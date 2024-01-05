<template>
	<header class="header">
		<app-logo class="header__logo" logo-theme="white" />
		<h2 class="header__heading">{{ t(heading) }}</h2>
		<app-user-navigation class="header__user-navigation" />
		<app-breadcrumbs class="header__breadcrumbs" v-if="breadcrumbs" :breadcrumbs="breadcrumbs" />
	</header>
</template>

<script setup>
import AppUserNavigation from '@/components/AppUserNavigation.vue'
import AppBreadcrumbs from '@/components/AppBreadcrumbs.vue'
import AppLogo from '@/components/AppLogo.vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

defineProps({
	heading: {
		required: true,
		type: String,
	},
	breadcrumbs: {
		required: false,
		type: Array,
	},
})
</script>

<style>
.header {
	margin: 0;
	padding: 0;
	display: grid;
	grid-template-columns: 1fr auto;
	grid-row-gap: 12px;
}

.header__logo {
	width: 62px;
	display: none;
}

.header__heading {
	margin: 0;
	font-family: var(--headings-font);
	font-weight: 700;
	font-style: normal;
	font-size: 32px;
	line-height: 40px;
	color: var(--headings-color);
	text-transform: uppercase;
}

.header__breadcrumbs {
	grid-column: 1 / 3;
}

@media screen and (max-width: 1024px) {
	.header__logo {
		display: block;
	}

	.header__heading {
		grid-column: 1 / 2;
		grid-row: 2 / 3;
	}
}

@media screen and (max-width: 768px) {
	.header {
		grid-template-columns: 1fr auto;
	}
}
</style>
