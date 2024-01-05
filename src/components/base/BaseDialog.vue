<template>
	<v-dialog v-bind="{ ...baseAttrs, ...$attrs }">
		<template v-for="(_, slotName) in $slots" #[slotName]>
			<slot :name="slotName"></slot>
		</template>
	</v-dialog>
</template>

<script setup>
import { computed } from 'vue'

const baseAttrs = computed(() => {
	return {
		'content-class': 'rounded-xl',
	}
})
</script>
