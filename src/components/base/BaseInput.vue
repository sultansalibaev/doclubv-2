<template>
	<v-text-field v-bind="{ ...baseAttrs, ...$attrs }">
		<template v-for="(_, scopedSlotName) in $slots" #[scopedSlotName]="slotData">
			<slot :name="scopedSlotName" v-bind="slotData"></slot>
		</template>
		<template v-for="(_, slotName) in $slots" #[slotName]>
			<slot :name="slotName"></slot>
		</template>
	</v-text-field>
</template>

<script setup>
import { computed } from 'vue'

const baseAttrs = computed(() => {
	return {
		'background-color': 'primary',
		'hide-details': false,
		'hide-spin-buttons': true,
		class: 'rounded-lg',
		color: 'primary',
		filled: true,
		variant: 'solo',
	}
})
</script>

<style lang="scss" scoped>
// full border for filled variant
.v-text-field--filled > :deep(.v-input__control > .v-input__slot) {
	border: 1px solid var(--v-theme-background-secondary);
}
// removed default bottom border for filled variant
.v-text-field--filled > :deep(.v-input__control > .v-input__slot) {
	&:before,
	&:after {
		display: none;
	}
}
// border color for error state
.v-text-field--filled.v-input--has-state > :deep(.v-input__control > .v-input__slot) {
	border-color: currentColor !important;
}
// color for hover state, excluded for disabled
.v-text-field--filled.v-input--is-focused > :deep(.v-input__control > .v-input__slot),
.v-text-field--filled:not(.v-input--is-disabled) > :deep(.v-input__control > .v-input__slot:hover) {
	border-color: currentColor !important;
}
// text-input, details outer padding
.v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
	> :deep(.v-input__control > .v-input__slot),
.v-text-field.v-text-field--enclosed > :deep(.v-text-field__details) {
	padding: 0 16px;
}
</style>

<style lang="scss">
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
	-webkit-box-shadow: 0 0 0px 1000px var(--v-theme-background-secondary) inset;
	-webkit-text-fill-color: var(--v-gray900-base);
}
</style>
