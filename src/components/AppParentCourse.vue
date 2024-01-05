<template>
	<div class="parent-course">
		<div class="parent-course__text-wrapper">
			<strong class="parent-course__topic">Модуль из курса</strong>
			<p class="parent-course__text">
				{{ name }}
			</p>
		</div>
		<router-link class="parent-course__link" :to="courseUrl">
			<span class="parent-course__link-text">Открыть страницу курса</span>
		</router-link>
	</div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	id: {
		type: Number,
		required: true,
	}
})

const courseUrl = computed(() => {
	return `/education/course/${props.id}`
})

</script>

<style>
.parent-course {
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

.parent-course::before {
	content: '';
	position: absolute;
	top: calc(50% - 28px);
	left: 24px;

	display: block;
	width: 56px;
	height: 56px;

	background: url("../assets/parent-course-icon.svg") center no-repeat;
}

.parent-course__text-wrapper {
	margin: 0 10px 0 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 8px;
}

.parent-course__topic {
	margin: 0;

	font-family: var(--text-font);
	font-weight: 600;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	color: var(--headings-color);
}

.parent-course__text {
	margin: 0;


	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 14px;
	line-height: 16px;
	color: #4c4c4c;
	transition: var(--base-transition);
}

.parent-course__link {
	margin: 0 0 0 auto;
	flex-shrink: 0;
	display: block;
	width: 24px;
	height: 24px;
	text-decoration: none;

	background: url('../assets/icons/icon-arrow-right-base.svg') center no-repeat;
}

.parent-course__link-text {
	margin: 0;
	padding: 0;
	display: none;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	color: #fff;
	text-align: center;
}

@media screen and (max-width: 500px) {
	.parent-course {
		padding: 96px 24px 24px;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.parent-course::before {
		top: 24px;
		left: 24px;
	}

	.parent-course__link {
		box-sizing: border-box;
		margin: 16px 0 0;
		padding: 10px 20px;

		width: auto;
		height: auto;

		border-radius: 5px;
		background: #BA58A1;
		transition: var(--base-transition);
	}

	.parent-course__link-text {
		display: block;
	}

	.parent-course__link:hover,
	.parent-course__link:focus {
		outline: none;
		border-color: #bdbdcd;
	}
}
</style>
