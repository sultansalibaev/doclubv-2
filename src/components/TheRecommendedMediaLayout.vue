<template>
	<section v-if="media.length > 0" class="recommended-media">
		<div class="recommended-media__header-wrapper">
			<h3 class="recommended-media__heading">{{ t('Latest News') }}</h3>
			<router-link class="recommended-media__link" to="/media">{{ t('Read more') }}</router-link>
		</div>
		<ul class="recommended-media__media-list">
			<li
				class="recommended-media__media-item"
				v-for="(mediaCard, index) in slicedMediaArray"
				:key="index"
			>
				<app-media-card
					:viewed="mediaCard.viewed"
					:topic="mediaCard.name"
					:img="mediaCard.image"
					:badges="badgesText(mediaCard?.tags) || []"
					@click="mediaCardClickHandler(mediaCard['id'])"
				/>
			</li>
		</ul>
	</section>
</template>

<script setup>
import AppMediaCard from './AppMediaCard.vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
	media: {
		required: true,
		type: Array,
	}
})

const router = useRouter()

const slicedMediaArray = computed(() => {
	return props.media.slice(0, props.media.length - (props.media.length - 2))
})

const badgesText = (badges) => badges?.map(item => item?.name)

function mediaCardClickHandler(id) {
	router.push(`/media/${id}`)
}
</script>

<style>
.recommended-media {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}

.recommended-media__header-wrapper {
	margin: 0;
	padding: 0;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.recommended-media__heading {
	margin: 0;
	padding: 0;

	font-family: var(--headings-font);
	font-weight: 700;
	font-style: normal;
	font-size: 24px;
	line-height: 28px;
	color: var(--headings-color);
}

.recommended-media__link {
	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	color: var(--links-color);
	text-decoration-line: underline;
}

.recommended-media__media-list {
	margin: 32px 0 0;
	padding: 0;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 32px;

	list-style: none;
}

.recommended-media__media-item {
	margin: 0;
}

.recommended-media__fallback {
	box-sizing: border-box;
	margin: 32px 0 0;
	padding: 32px;
	align-self: stretch;
	display: flex;
	justify-content: center;
	align-items: center;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 14px;
	line-height: 16px;
	color: var(--text-secondary-color);

	background: var(--background-secondary);
	border-radius: 16px;
}

@media screen and (max-width: 1439px) {
	.recommended-media__media-list {
		grid-template-columns: 1fr;
	}
}

@media screen and (max-width: 1366px) {
	.recommended-media__media-list {
		grid-template-columns: 1fr 1fr;
	}
}

@media screen and (max-width: 768px) {
	.recommended-media__header-wrapper {
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.recommended-media__link {
		margin-top: 12px;
	}

	.recommended-media__media-list {
		grid-template-columns: 1fr;
	}
}
</style>
