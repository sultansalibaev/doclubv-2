<template>
	<article
		:class="[
			'module-card',
			colorScheme === 'D' ? 'module-card--dark' : '',
			image ? 'module-card--with-image' : '',
		]"
		:style="cssProps"
	>
		<ul class="module-card__badges" v-if="tags.length > 0">
			<li class="module-card__badge" v-for="(badge, index) in tags" :key="index">
				<app-badge
					class="module-card__badge-text"
					:text="badge.name"
					:theme="colorScheme === 'D' ? 'brand' : 'base'"
				/>
			</li>
		</ul>
		<strong :class="['module-card__topic', colorScheme === 'D' ? 'module-card__topic--white' : '']">
			{{ name }}
		</strong>
		<ul class="module-card__tags">
			<li
				:class="['module-card__tag', colorScheme === 'D' ? 'module-card__tag--white' : '']"
				v-if="downloadableMaterials"
			>
				<span
					:class="[
						'module-card__tag-text',
						colorScheme === 'D' ? 'module-card__tag-text--white' : '',
					]"
					>{{ t('Files') }}</span
				>
			</li>
			<li
				:class="['module-card__tag', colorScheme === 'D' ? 'module-card__tag--white' : '']"
				v-if="viewableMaterials"
			>
				<span
					:class="[
						'module-card__tag-text',
						colorScheme === 'D' ? 'module-card__tag-text--white' : '',
					]"
					>{{ t('Presentations') }}</span
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
	downloadableMaterials: {
		type: [Boolean, null],
		required: true,
	},
	viewableMaterials: {
		type: [Boolean, null],
		required: true,
	},
})

const cssProps = computed(() => {
	if (props.image) {
		return {
			'--imageBackground': `url(${props.image}) center / cover no-repeat`,
		}
	}
	return ''
})
</script>

<style>
.module-card {
	position: relative;
	box-sizing: border-box;
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

.module-card--dark {
	background-color: #23282c;
}

.module-card--with-image {
  min-height: 280px;
  position: relative;
}

.module-card--with-image::before {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background: var(--imageBackground);
}

.module-card:hover,
.module-card:focus {
	box-shadow: var(--hover-shadow);
}

.module-card__badges {
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

.module-card__badge {
	margin: 0;
	display: flex;
}

.module-card__topic {
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

.module-card__topic--white {
	color: #fff;
}

.module-card__tags {
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

.module-card__tag {
	position: relative;
	margin: 0;
}

.module-card__tag:not(:first-child) {
	margin-left: 12px;
	padding-left: 24px;
}

.module-card__tag:not(:first-child)::before {
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

.module-card__tag--white:not(:first-child)::before {
	background: var(--tag-light-text-color);
}

.module-card__tag-text {
	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	color: var(--tag-dark-text-color);
}

.module-card__tag-text--white {
	color: var(--tag-light-text-color);
}
</style>
