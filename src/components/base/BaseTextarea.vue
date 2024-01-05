<template>
	<textarea
		:value="modelValue"
		:placeholder="placeholder"
		:style="{
			'min-width': `${minWidth}px`,
			'max-width': `${maxWidth}px`,
			'min-height': `${minHeight}px`,
			'max-height': `${maxHeight}px`,
		}"
		class="textarea"
		@input="handleInput"
	/>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
	modelValue: {
		type: [String, Number],
	},
	placeholder: {
		type: String,
		defaults: '',
	},
	minWidth: {
		type: Number,
	},
	maxWidth: {
		type: Number,
	},
	minHeight: {
		type: Number,
	},
	maxHeight: {
		type: Number,
	},
})

const emit = defineEmits(['update:modelValue'])
const handleInput = (event) => emit('update:modelValue', event.target.value)
</script>

<style scoped>
.textarea {
	width: 100%;
	height: 100%;
	padding: 12px 16px;
	border-radius: 5px;

	outline: 1px solid #000000;
	background: #FFFFFF;
}
</style>
