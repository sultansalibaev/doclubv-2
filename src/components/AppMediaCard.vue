<template>
	<article class="media-card">
		<div class="media-card__preview-wrapper">
			<img class="media-card__preview-image" :src="img" alt="Превью медиа" />
			<ul class="media-card__badges-list">
				<li class="media-card__badges-item" v-for="(badge, index) in badges" :key="index">
					<app-badge theme="grey" class="media-card__badge" :text="badge" />
				</li>
			</ul>
		</div>
		<strong class="media-card__topic" v-if="topic">
			{{ topic }}
		</strong>
		<span class="media-card__viewed-status" v-if="viewed">
			{{ viewed ? 'Просмотрено' : 'Не просмотрено' }}
		</span>
	</article>
</template>

<script setup>
import AppBadge from './AppBadge.vue'

defineProps({
	badges: {
		required: true,
		type: Array,
	},
	img: {
		required: true,
		type: String,
	},
	topic: {
		required: false,
		type: String,
	},
	viewed: {
		required: false,
		type: Boolean,
	},
})
</script>

<style>
.media-card {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;

	cursor: pointer;
}

.media-card:hover .media-card__preview-wrapper,
.media-card:focus .media-card__preview-wrapper {
	box-shadow: 0 2px 15px 0 rgba(79, 79, 108, 0.25);
}

.media-card__preview-wrapper {
	position: relative;

	width: 100%;
	height: 242px;

	display: flex;

	border-radius: 12px;
	overflow: hidden;
	transition: var(--base-transition);
}

.media-card__preview-image {
	display: block;
	width: 100%;
	object-fit: cover;
}

.media-card__badges-list {
	position: absolute;
	bottom: 0;
	left: 0;
	z-index: 1;

	margin: auto 20px 20px;
	padding: 0;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: center;
	align-content: center;
	gap: 12px;

	list-style: none;
}

.media-card__badges-item {
	margin: 0;
}

.media-card__topic {
	margin: 16px 0 0;

	font-family: var(--headings-font);
	font-weight: 700;
	font-style: normal;
	font-size: 24px;
	line-height: 28px;
	color: var(--media-card-topic-color);
}

.media-card__viewed-status {
	margin: 16px 0 0;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 18px;
	line-height: 24px;
	color: var(--media-card-status-color);
}
</style>
