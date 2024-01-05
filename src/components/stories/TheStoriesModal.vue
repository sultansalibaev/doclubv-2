<template>
	<div class="stories-modal" @click.self="modalSubstrateClickHandler">
		<button class="stories-modal__back-button" type="button" @click="backButtonClickHandler">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="17"
				viewBox="0 0 16 17"
				fill="none"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M10.7433 2.93309C11.1128 3.3436 11.0795 3.97589 10.669 4.34535L6.49485 8.10206L10.669 11.8588C11.0795 12.2282 11.1128 12.8605 10.7433 13.271C10.3738 13.6815 9.74155 13.7148 9.33104 13.3454L4.33104 8.84535C4.12032 8.65571 4 8.38555 4 8.10206C4 7.81857 4.12032 7.54841 4.33104 7.35877L9.33104 2.85877C9.74155 2.48931 10.3738 2.52258 10.7433 2.93309Z"
					fill="#4C4C4C"
				/>
			</svg>
		</button>
		<div :class="['stories-modal__wrapper', !imageLoaded ? 'stories-modal__wrapper--fixed' : '']">
			<button class="stories-modal__close-button" type="button" @click="closeButtonClickHandler" />
			<app-loader class="stories-modal__loader" height="50" width="50" v-if="!imageLoaded" />
			<ul class="stories-modal__progress-list" v-if="imageLoaded">
				<li class="stories-modal__progress-item" v-for="(_, index) in storiesList" :key="index">
					<app-storie-progress
						class="stories-modal__progress"
						:launched="openedStorieIndex === index"
						:filled="openedStorieIndex > index"
					/>
				</li>
			</ul>
			<div class="stories-modal__image-container" v-show="imageLoaded">
				<img
					class="stories-modal__image"
					:src="currentStorieUrl"
					alt="Stories"
					@load="imageLoadHandler"
				/>
			</div>
		</div>
		<button class="stories-modal__next-button" type="button" @click="nextButtonClickHandler">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="17"
				viewBox="0 0 16 17"
				fill="none"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M5.25671 2.93309C5.62617 2.52258 6.25846 2.48931 6.66897 2.85877L11.669 7.35877C11.8797 7.54841 12 7.81857 12 8.10206C12 8.38555 11.8797 8.65571 11.669 8.84535L6.66897 13.3454C6.25846 13.7148 5.62617 13.6815 5.25671 13.271C4.88726 12.8605 4.92053 12.2282 5.33104 11.8588L9.50516 8.10206L5.33104 4.34535C4.92053 3.97589 4.88726 3.3436 5.25671 2.93309Z"
					fill="#4C4C4C"
				/>
			</svg>
		</button>
	</div>
</template>

<script setup>
import AppStorieProgress from '@/components/stories/AppStorieProgress.vue'
import AppLoader from '@/components/AppLoader.vue'

import { computed, onMounted, ref } from 'vue'

const props = defineProps({
	stories: {
		required: true,
		type: Object,
	},
})

const emit = defineEmits(['closeModal', 'prevStorie', 'nextStorie'])

const imageLoaded = ref(false)
const imageError = ref(false)

const openedStorieIndex = ref(0)
const storiesList = ref(props.stories.stories)
let timer = null

const currentStorieUrl = computed(() => {
	return `${props.stories.stories[openedStorieIndex.value]}`
})

function imageLoadHandler() {
	imageLoaded.value = true
	timer = setInterval(() => {
		switchOpenedStorie()
	}, 10000)
}

function imageErrorHandler() {
	imageError.value = true
}

function retryFetchHandler() {
	imageError.value = false
}

function closeButtonClickHandler() {
	emit('closeModal')
}

function backButtonClickHandler() {
	if (openedStorieIndex.value === 0) {
		emit('prevStorie', props.stories.id)
		clearInterval(timer)
		imageLoaded.value = false
		return
	}
	openedStorieIndex.value -= 1
}

function nextButtonClickHandler() {
	if (openedStorieIndex.value === storiesList.value.length - 1) {
		emit('nextStorie', props.stories.id)
		clearInterval(timer)
		imageLoaded.value = false
		return
	}
	openedStorieIndex.value += 1
}

function switchOpenedStorie() {
	if (openedStorieIndex.value === storiesList.value.length - 1) {
		emit('nextStorie', props.stories.id)
		imageLoaded.value = false
		clearInterval(timer)
		return
	}
	openedStorieIndex.value += 1
}

function modalSubstrateClickHandler() {
	if (timer) {
		clearInterval(timer)
	}
	emit('closeModal')
}

onMounted(() => {})
</script>

<style>
.stories-modal__back-button,
.stories-modal__next-button {
	margin: 0;
	padding: 0;
	width: 32px;
	height: 32px;
	display: flex;
	justify-content: center;
	align-items: center;

	border-radius: 50%;
	background: #fff;
}

.stories-modal {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	display: flex;
	justify-content: center;
	align-items: center;
	gap: 24px;

	background-color: rgba(0, 0, 0, 0.5);

	z-index: 3;
}
.stories-modal__wrapper {
	position: relative;
	box-sizing: border-box;
	padding: 0;
	max-width: 100%;
	max-height: calc(100vh - 100px);
	display: flex;
	justify-content: center;
	align-items: center;

	border-radius: 20px;
	overflow: hidden;
	aspect-ratio: 9/16;
}

.stories-modal__wrapper--fixed {
	width: 500px;

	background: #1e1e1e;
}

.stories-modal__close-button {
	position: absolute;
	top: 48px;
	right: 24px;

	width: 28px;
	height: 28px;

	background: transparent url('../../assets/icons/icon-close-white.svg') center no-repeat;
	cursor: pointer;
}

.stories-modal__progress-list {
	position: absolute;
	top: 20px;
	left: 8px;
	right: 8px;

	margin: 0;
	padding: 0;
	display: grid;
	grid-auto-flow: column;
	grid-column-gap: 4px;

	list-style: none;
}
.stories-modal__progress-item {
	margin: 0;
	padding: 0;
	display: flex;
	justify-content: stretch;
	align-items: stretch;
}

.stories-modal__progress {
}

.stories-modal__image-container {
	width: 100%;
	height: 100%;
}

.stories-modal__loader {
}

.stories-modal__image {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

@media screen and (max-width: 768px) {
	.stories-modal__wrapper {
		width: 100%;
		height: 100%;
		max-height: unset;

		border-radius: 0;
	}

	.stories-modal__back-button,
	.stories-modal__next-button {
		position: absolute;
		top: 100px;
		bottom: 0;
		width: 30%;
		height: auto;

		background: transparent;
		border-radius: 0;

		z-index: 1;
	}

	.stories-modal__back-button svg,
	.stories-modal__next-button svg {
		display: none;
	}

	.stories-modal__back-button {
		left: 0;
	}

	.stories-modal__next-button {
		right: 0;
	}
}
</style>
