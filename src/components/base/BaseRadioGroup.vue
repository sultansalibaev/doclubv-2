<template>
	<v-radio-group
		:value="value"
		v-bind="{ ...baseAttrs, ...$attrs }"
		@update:model-value="emit('update', $event)"
	>
		<template v-for="(_, scopedSlotName) in $slots" #[scopedSlotName]="slotData">
			<slot :name="scopedSlotName" v-bind="slotData"></slot>
		</template>
		<template v-for="(_, slotName) in $slots" #[slotName]>
			<slot :name="slotName"></slot>
		</template>
	</v-radio-group>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	value: {},
})

const emit = defineEmits(['update'])

const baseAttrs = computed(() => {
	return {
		'background-color': 'primary',
		'hide-details': false,
		'item-color': 'primary',
		attach: true,
		class: 'rounded-lg',
		color: 'primary',
		filled: false,
	}
})
</script>

<style scoped></style>
