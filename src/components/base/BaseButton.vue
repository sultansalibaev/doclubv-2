<template>
	<v-btn v-bind="{ ...baseAttrs, ...$attrs }">
		<slot></slot>
	</v-btn>
</template>

<script setup>
import { computed, useAttrs } from 'vue'

const baseAttrs = computed(() => {
	return {
		color: 'primary',
		elevation: 0,
		height: 44,
		ripple: false,
		rounded: false,
	}
})
</script>

<style lang="scss" scoped>
.v-btn:hover {
	background-color: rgb(var(--v-theme-purple400)) !important;
}
.v-btn.v-btn--disabled {
	color: rgb(var(--v-theme-gray900)) !important;
	background-color: rgb(var(--v-theme-purple300)) !important;
}
</style>
