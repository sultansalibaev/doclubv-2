<template>
	<div
		:style="{
			width: typeCheck(width),
			height: typeCheck(height),
			borderRadius: typeCheck(borderRadius),
		}"
		class="placeholder"
	>
		&nbsp;
	</div>
</template>

<script setup>
const props = defineProps({
	width: {
		type: [String, Number],
		default: 100,
	},
	height: {
		type: [String, Number],
		default: 'auto',
	},
	borderRadius: {
		type: [String, Number],
		default: 16,
	},
})

const typeCheck = (value) => (typeof value === 'string' ? value : `${value}px`)
</script>

<style lang="scss" scoped>
@keyframes loading {
	100% {
		transform: translateX(100%);
	}
}
.placeholder {
	background: rgb(var(--v-theme-gray400));
	overflow: hidden;
	position: relative;
}
.placeholder:after {
	-webkit-animation: loading 1.5s infinite;
	-webkit-transform: translateX(-100%);
	animation: loading 1.5s infinite;
	background: -webkit-gradient(
		linear,
		left top,
		right top,
		from(rgba(255, 255, 255, 0)),
		color-stop(rgba(255, 255, 255, 0.3)),
		to(rgba(255, 255, 255, 0))
	);
	background: linear-gradient(
		90deg,
		rgba(255, 255, 255, 0),
		rgba(255, 255, 255, 0.3),
		rgba(255, 255, 255, 0)
	);
	content: '';
	height: 100%;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	transform: translateX(-100%);
	z-index: 1;
}
</style>
