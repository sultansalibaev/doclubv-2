<template>
	<span class="loader" :style="cssProps" />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	width: {
		required: true,
		type: String,
	},
	height: {
		required: true,
		type: String,
	},
})

const cssStyles = computed(() => `width: ${props.width}; height: ${props.height}`)

const cssProps = computed(() => {
	return {
		'--loader-width': props.width + 'px',
		'--loader-height': props.height + 'px',
	}
})
</script>

<style scoped>
.loader {
	width: var(--loader-width, 20px);
	height: var(--loader-height, 20px);
	border: 3px solid transparent;
	border-radius: 50%;
	display: inline-block;
	position: relative;
	box-sizing: border-box;
	animation: rotation 1s linear infinite;
}
.loader::after {
	content: '';
	box-sizing: border-box;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	width: 56px;
	height: 56px;
	border-radius: 50%;
	border: 3px solid;
	border-color: #5c34f6 transparent;
}

@keyframes rotation {
	0% {
		transform: rotate(0deg);
	}
	100% {
		transform: rotate(360deg);
	}
}
</style>
