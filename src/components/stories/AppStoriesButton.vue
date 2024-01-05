<template>
	<button
		:class="['stories-button', viewed ? 'stories-button--viewed' : '']"
		type="button"
		@click="storiesButtonClickHandler"
	>
		<img class="stories-button__image" :src="url" alt="Stories thumb" />
	</button>
</template>

<script setup>
defineProps({
	url: {
		type: String,
		required: true,
	},
	viewed: {
		type: Boolean,
		required: true,
	},
})

const emit = defineEmits(['storiesClick'])

function storiesButtonClickHandler() {
	emit('storiesClick')
}
</script>

<style>
.stories-button {
	box-sizing: border-box;
	padding: 4px;
	display: flex;
	width: 120px;
	height: 120px;

	border: 4px solid var(--stories-border-main-color);
	border-radius: 16px;
	overflow: hidden;
	cursor: pointer;
	transition: var(--base-transition);
}

.stories-button:hover,
.stories-button:focus {
	border-color: var(--stories-border-hover-color);
}

.stories-button--viewed {
	border-color: var(--stories-border-viewed-color);
}

.stories-button__image {
	display: block;
	width: 100%;
	height: 100%;
	object-fit: cover;

	border-radius: 12px;
	overflow: hidden;
}
</style>
