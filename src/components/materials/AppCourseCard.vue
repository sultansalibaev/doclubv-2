<template>
	<article
		:class="[
			'course-card',
			colorScheme === 'D' ? 'course-card--dark' : '',
			image ? 'course-card--with-image' : '',
		]"
		:style="cssProps"
	>
		<ul class="course-card__badges" v-if="tags.length > 0">
			<li class="course-card__badge" v-for="(badge, index) in tags" :key="index">
				<app-badge
					class="course-card__badge-text"
					:text="badge.name"
					:theme="colorScheme === 'D' ? 'brand' : 'base'"
				/>
			</li>
		</ul>
		<strong :class="['course-card__topic', colorScheme === 'D' ? 'course-card__topic--white' : '']">
			{{ name }}
		</strong>
		<ul class="course-card__tags">
			<li :class="['course-card__tag', colorScheme === 'D' ? 'course-card__tag--white' : '']">
				<span
					:class="[
						'course-card__tag-text',
						colorScheme === 'D' ? 'course-card__tag-text--white' : '',
					]"
					>{{ modulesCount }} {{ caseOfTheWord }}</span
				>
			</li>
		</ul>
	</article>
</template>

<script setup>
import AppBadge from '@/components/AppBadge.vue'
import { computed } from 'vue'

const props = defineProps({
	image: {
		type: [String, null],
		required: true,
	},
	tags: {
		type: Array,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	colorScheme: {
		type: String,
		required: true,
		validator(value) {
			return ['L', 'D'].includes(value)
		},
	},
	modulesCount: {
		type: [Number, null],
		required: true,
	},
})

const caseOfTheWord = computed(() => {
	switch (props.modulesCount) {
		case 1:
			return `доклад`
		case 2:
		case 3:
		case 4:
			return `доклада`
		default:
			return `докладов`
	}
})

const cssProps = computed(() => {
	if (props.image) return { '--imageBackground': `url(${props.image}) center / cover no-repeat` }
})
</script>

<style>
.course-card {
	position: relative;
	box-sizing: border-box;
	margin-top: 24px;
	padding: 32px;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;

	border-radius: 16px;
	background: var(--background-secondary, #f8f8f8);
	transition: var(--base-transition);
	cursor: pointer;
}

.course-card::before {
	content: '';
	position: absolute;
	right: 32px;
	left: 32px;
	bottom: calc(100% + 8px);

	display: block;
	height: 16px;

	border-radius: 16px 16px 0 0;
	background: var(--background-secondary);
	transition: var(--base-transition);
}

.course-card--dark,
.course-card--dark::before {
	background-color: #23282c;
}

.course-card--with-image {
	min-height: 280px;
}

.course-card--with-image,
.course-card--with-image::before {
	background: var(--imageBackground);
}

.course-card:hover,
.course-card:focus {
	box-shadow: var(--hover-shadow);
}

.course-card__badges {
	margin: 0 0 20px;
	padding: 0;
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	align-content: center;
	gap: 12px;
}

.course-card__badge {
	margin: 0;
	display: flex;
}

.course-card__topic {
	margin: 0;
	padding: 0;
	max-width: 450px;

	font-family: var(--headings-font);
	font-weight: 700;
	font-style: normal;
	font-size: 20px;
	line-height: 28px;
	color: var(--gray-700-secondary, #4c4c4c);
}

.course-card__topic--white {
	color: #fff;
}

.course-card__tags {
	margin: auto 0 0;
	padding: 20px 0 0;
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: center;
	align-content: center;

	list-style: none;
}

.course-card__tag {
	position: relative;
	margin: 0;
}

.course-card__tag:not(:first-child) {
	margin-left: 12px;
	padding-left: 24px;
}

.course-card__tag:not(:first-child)::before {
	content: '';
	position: absolute;
	top: calc(50% - 2px);
	left: 6px;

	display: block;
	width: 4px;
	height: 4px;

	background: var(--tag-dark-text-color);
	border-radius: 50%;
}

.course-card__tag--white:not(:first-child)::before {
	background: var(--tag-light-text-color);
}

.course-card__tag-text {
	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	color: var(--tag-dark-text-color);
}

.course-card__tag-text--white {
	color: var(--tag-light-text-color);
}
</style>
