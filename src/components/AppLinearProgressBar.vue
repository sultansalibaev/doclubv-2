<template>
	<div class="progress">
		<div class="progress__done"></div>
		<div class="body-medium | progress__count">
			{{ percent }}
		</div>
		<div class="body-medium | progress__count2">
			{{ percent }}
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	percentValue: {
		type: [Number, String],
	},
})
const percent = computed(() => {
	if (typeof props.percentValue === 'number') return `${100 * props.percentValue.toFixed(3)}%`
	else if (typeof props.percentValue === 'string') return `${props.percentValue}%`
	else return '0%'
})
</script>

<style lang="scss" scoped>
.progress {
	height: 44px;
	width: 100%;
	background: rgb(var(--v-theme-purple100));
	border-radius: 12px;
	overflow: hidden;
	position: relative;

	&__done {
		height: 100%;
		width: v-bind(percent);
		opacity: 1;
		background: rgb(var(--v-theme-primary));
		display: flex;
		justify-content: center;
		align-items: center;
		transition: 1s ease;
	}

	&__count {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		mix-blend-mode: difference;
		color: rgb(var(--v-theme-primary));
	}

	&__count2 {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		mix-blend-mode: difference;
		color: rgb(var(--v-theme-white100));
	}
}
</style>
