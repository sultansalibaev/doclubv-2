<template>
	<div class="workshop-widget" :style="cssProps">
		<div class="workshop-widget__text-wrapper">
			<strong class="workshop-widget__topic">Курс подготовлен совместно с {{ sponsorInfo?.name }}</strong>
			<p class="workshop-widget__text">
				{{ sponsorInfo?.description }}
			</p>
		</div>
		<a class="workshop-widget__link" href="#" target="_blank">
			<span class="workshop-widget__link-text">О компании</span>
		</a>
	</div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	sponsorInfo: {
		type: Object,
		required: true,
	}
})

const cssProps = computed(() => { return { '--imageBackground': `url(${props.sponsorInfo?.logo}) center / cover no-repeat` }})
</script>

<style>
.workshop-widget {
	position: relative;
	box-sizing: border-box;
	padding: 24px 24px 24px 96px;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;

	border-radius: 16px;
	background: var(--background-secondary);
}

.workshop-widget::before {
	content: '';
	position: absolute;
	top: calc(50% - 28px);
	left: 24px;

	display: block;
	width: 56px;
	height: 56px;

	background: var(--imageBackground);
}

.workshop-widget__text-wrapper {
	margin: 0 10px 0 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 8px;
}

.workshop-widget__topic {
	margin: 0;

	font-family: var(--text-font);
	font-weight: 600;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	color: var(--headings-color);
}

.workshop-widget__text {
	margin: 0;


	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 14px;
	line-height: 16px;
	color: #4c4c4c;
	transition: var(--base-transition);
}

.workshop-widget__link {
	margin: 0 0 0 auto;
	flex-shrink: 0;
	display: block;
	width: 24px;
	height: 24px;
	text-decoration: none;

	background: url('../assets/icons/icon-arrow-right-base.svg') center no-repeat;
}

.workshop-widget__link-text {
	margin: 0;
	padding: 0;
	display: none;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	color: #000;
	text-align: center;
}

@media screen and (max-width: 500px) {
	.workshop-widget {
		padding: 96px 24px 24px;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.workshop-widget::before {
		top: 24px;
		left: 24px;
	}

	.workshop-widget__link {
		box-sizing: border-box;
		margin: 16px 0 0;
		padding: 10px 20px;

		width: auto;
		height: auto;

		border-radius: 5px;
		border: 1px solid #d6d6e3;
		background: transparent;
		transition: var(--base-transition);
	}

	.workshop-widget__link-text {
		display: block;
	}

	.workshop-widget__link:hover,
	.workshop-widget__link:focus {
		outline: none;
		border-color: #bdbdcd;
	}
}
</style>
