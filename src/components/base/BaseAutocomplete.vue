<template>
	<v-autocomplete v-bind="{ ...baseAttrs, ...$attrs }">
		<template v-for="(_, scopedSlotName) in $slots" #[scopedSlotName]="slotData">
			<slot :name="scopedSlotName" v-bind="slotData"></slot>
		</template>
		<template v-for="(_, slotName) in $slots" #[slotName]>
			<slot :name="slotName"></slot>
		</template>
	</v-autocomplete>
</template>

<script setup>
import { computed } from 'vue'

const baseAttrs = computed(() => {
	return {
		'hide-details': true,
		'item-color': 'neutral10',
		attach: true,
		filled: true,
	}
})
</script>

<style>
.v-input--density-compact .v-input__control {
	min-height: 44px;
	border: 1px solid #000000;
	border-radius: 5px;
}
</style>
<!--<style scoped>-->
<!--// full border for filled variant-->
<!--.v-text-field&#45;&#45;filled > :deep(.v-input__control > .v-input__slot) {-->
<!--    border: 1px solid var(&#45;&#45;v-surface2-base);-->
<!--}-->
<!--// removed default bottom border for filled variant-->
<!--.v-text-field&#45;&#45;filled > :deep(.v-input__control > .v-input__slot) {-->
<!--    &:before, &:after {-->
<!--        display: none;-->
<!--    }-->
<!--}-->
<!--// border color for error state-->
<!--.v-text-field&#45;&#45;filled.v-input&#45;&#45;has-state > :deep(.v-input__control > .v-input__slot) {-->
<!--    border-color: currentColor!important;-->
<!--}-->
<!--// color for hover state, excluded for disabled-->
<!--.v-text-field&#45;&#45;filled.v-input&#45;&#45;is-focused > :deep(.v-input__control > .v-input__slot),-->
<!--.v-text-field&#45;&#45;filled:not(.v-input&#45;&#45;is-disabled) > :deep(.v-input__control > .v-input__slot:hover) {-->
<!--    border-color: currentColor!important;-->
<!--}-->
<!--// text-input, details outer padding-->
<!--.v-text-field.v-text-field&#45;&#45;enclosed:not(.v-text-field&#45;&#45;rounded) > :deep(.v-input__control > .v-input__slot),-->
<!--.v-text-field.v-text-field&#45;&#45;enclosed > :deep(.v-text-field__details) {-->
<!--    padding: 0 16px;-->
<!--}-->
<!--:deep(.v-autocomplete__content) {-->
<!--    border-radius: 16px;-->
<!--}-->
<!--:deep(.v-autocomplete__content::-webkit-scrollbar) {-->
<!--    width: 8px;-->
<!--}-->
<!--:deep(.v-autocomplete__content::-webkit-scrollbar-track) {-->
<!--    background: var(&#45;&#45;v-surface1-base);-->
<!--    border-radius: 16px;-->
<!--    margin: 8px 0;-->
<!--}-->
<!--:deep(.v-autocomplete__content::-webkit-scrollbar-thumb) {-->
<!--    background: var(&#45;&#45;v-surface3-base);-->
<!--    border-radius: 16px;-->
<!--}-->
<!--</style>-->
