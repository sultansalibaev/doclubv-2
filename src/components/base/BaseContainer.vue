<template>
	<v-container
		:style="{ maxWidth: typeCheck(maximumWidth) }"
		class="d-flex flex-column flex-grow-1"
	>
		<slot />
	</v-container>
</template>

<script setup>
const props = defineProps({
	maximumWidth: {
		type: [String, Number],
		default: '960px',
	},
})
const typeCheck = (value) => (typeof value === 'string' ? value : `${value}px`)
</script>
