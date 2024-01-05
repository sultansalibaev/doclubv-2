<template>
	<v-radio v-bind="{ ...baseAttrs, ...$attrs }">
		<template v-for="(_, scopedSlotName) in $slots" #[scopedSlotName]="slotData">
			<slot :name="scopedSlotName" v-bind="slotData"></slot>
		</template>
		<template v-for="(_, slotName) in $slots" #[slotName]>
			<slot :name="slotName"></slot>
		</template>
	</v-radio>
</template>

<script setup>
import { computed } from 'vue'

const baseAttrs = computed(() => {
	return {
		color: 'black',
	}
})
</script>

<style scoped></style>
