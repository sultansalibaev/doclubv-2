<template>
	<ul class="breadcrumbs">
		<li class="breadcrumbs__item" v-for="(breadcrumb, index) in breadcrumbs" :key="index">
			<router-link
				:class="['breadcrumbs__link', breadcrumb.url === '' ? 'breadcrumbs__link--disabled' : '']"
				:to="breadcrumb.url"
			>
				{{ breadcrumb.name }}
			</router-link>
		</li>
	</ul>
</template>

<script setup>
defineProps({
	breadcrumbs: {
		required: true,
		type: Array,
	},
})
</script>

<style>
.breadcrumbs {
	padding: 0;
	min-width: 0;
	display: flex;
	gap: 12px;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	align-content: center;

	list-style: none;
}

.breadcrumbs__item {
	position: relative;
	box-sizing: border-box;
	display: flex;
	margin: 0;
}

.breadcrumbs__item:not(:first-child) {
	padding-left: 18px;

	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.breadcrumbs__item:not(:last-child) {
	flex-shrink: 0;
}

.breadcrumbs__item:not(:first-child)::before {
	content: '/';
	position: absolute;
	top: calc(50% - 10px);
	left: 0;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	color: var(--text-secondary-color);
}

.breadcrumbs__link {
	margin: 0;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	color: var(--breadcrumb-unactive-default-color);
	text-decoration: none;

	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	transition: var(--base-transition);
}

.breadcrumbs__link--disabled {
	color: var(--breadcrumb-active-default-color);
	pointer-events: none;
}

.breadcrumbs__link:hover,
.breadcrumbs__link:focus {
	outline: none;
	color: var(--breadcrumb-unactive-hover-color);
}

.breadcrumbs__link--disabled:hover,
.breadcrumbs__link--disabled:focus {
	color: var(--breadcrumb-active-hover-color);
}
</style>
