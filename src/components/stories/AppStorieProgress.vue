<template>
	<span
		:class="[
			'storie-progress',
			launched ? 'storie-progress--animate' : '',
			filled ? 'storie-progress--filled' : '',
		]"
	/>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
	launched: {
		required: true,
		type: Boolean,
	},
	filled: {
		required: true,
		type: Boolean,
	},
})
</script>

<style>
.storie-progress {
	position: relative;
	display: block;

	width: 100%;
	height: 3px;

	border-radius: 2px;
	background: rgba(255, 255, 255, 0.5);
	overflow: hidden;
}

.storie-progress--animate::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	display: block;

	background: #fff;
	transition: var(--base-transition);
	animation: slideRight 10s linear forwards;
}

.storie-progress--filled::after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	display: block;

	background: #fff;
}

@keyframes slideRight {
	from {
		transform: translateX(-100%);
	}
	to {
		transform: translateX(0);
	}
}
</style>
