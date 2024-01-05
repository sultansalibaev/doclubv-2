<template>
	<section v-if="storiesStore?.getStories.length" class="stories">
		<h3 class="stories__heading">{{ t('Stories') }}</h3>
		<template v-if="dashboardStore.getDataLoadingStatus">
			<ul class="stories__list">
				<li class="stories__item" v-for="skelet in 3" :key="skelet">
					<BaseSkeletonPath :width="120" :height="120" />
				</li>
			</ul>
		</template>
		<template v-else>
			<ul class="stories__list">
				<li class="stories__item" v-for="(storie, index) in storiesStore.getStories" :key="index">
					<app-stories-button
						class="stories__button"
						:url="storie.thumb"
						:viewed="storie.view"
						@stories-click="storiesClickHandler(storie)"
					/>
				</li>
			</ul>
		</template>
		<the-stories-modal
			class="stories__modal"
			v-if="storiesModalOpened"
			:stories="storiesStore.getOpenedStories"
			@close-modal="modalCloseHandler"
			@prev-storie="prevStorieHandler"
			@next-storie="nextStorieHandler"
		/>
	</section>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

import { useStoriesStore } from '@/stores/stories'
import { useDashboardStore } from '@/stores/dashboard'

import AppStoriesButton from './AppStoriesButton.vue'
import TheStoriesModal from './TheStoriesModal.vue'

const dashboardStore = useDashboardStore()
const storiesStore = useStoriesStore()

const storiesModalOpened = ref(false)

function storiesClickHandler(storie) {
	storiesStore.updateOpenedStories(storie)
	storiesStore.updateStorieViewedStatus(storie.id)
	storiesModalOpened.value = true
}

function modalCloseHandler() {
	storiesModalOpened.value = false
	storiesStore.updateOpenedStories(null)
}

function prevStorieHandler(currentId) {
	const newStorie = storiesStore.getPrevStorieById(currentId)
	modalCloseHandler()
	if (newStorie) {
		storiesClickHandler(newStorie)
	}
}

function nextStorieHandler(currentId) {
	const newStorie = storiesStore.getNextStorieById(currentId)
	modalCloseHandler()
	if (newStorie) {
		storiesClickHandler(newStorie)
	}
}
</script>

<style>
.stories {
	margin: 0;
	padding: 0;
	min-width: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}

.stories__heading {
	margin: 0;
	padding: 0;

	font-family: var(--headings-font);
	font-style: normal;
	font-weight: 700;
	font-size: 24px;
	line-height: 28px;
	color: var(--gray-800-primary);
}

.stories__list {
	margin: 32px 0 0;
	padding: 0 0 6px;
	width: 100%;
	display: flex;
	flex-wrap: nowrap;
	gap: 12px;

	list-style: none;
	overflow: auto;
}

.stories__item {
	margin: 0;
	padding: 0;
	display: flex;
}
</style>
