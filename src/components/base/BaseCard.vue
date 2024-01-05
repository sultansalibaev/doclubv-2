<template>
	<div
		:style="{ height: typeCheck(height), width: typeCheck(width) }"
		:class="{ 'card--disabled': disabled }"
		class="card"
	>
		<slot />
	</div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	color: {
		type: String,
		default: 'background-secondary',
	},
	height: {
		type: [String, Number],
	},
	width: {
		type: [String, Number],
	},
	disabled: {
		type: Boolean,
	},
})

const typeCheck = (value) => (typeof value === 'string' ? value : `${value}px`)
const bg = computed(() => `rgb(var(--v-theme-${props.color}))`)
</script>

<style scoped>
.card {
	padding: 32px;
	border-radius: 16px;
	background: v-bind(bg);
	overflow-x: hidden;
}
.card.card--disabled {
	pointer-events: none;
	opacity: 0.7;
}
</style>
