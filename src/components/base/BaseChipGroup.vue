<template>
	<v-chip-group :value="value" v-bind="{ ...$attrs }" @update:model-value="emit('update', $event)">
		<slot></slot>
	</v-chip-group>
</template>

<script setup>
const props = defineProps({
	value: {},
})

const emit = defineEmits(['update'])
</script>

<style scoped></style>
