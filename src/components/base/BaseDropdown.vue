<template>
	<div v-click-outside="handleClickedOutside" class="autocomplete">
		<BaseInput2
			v-model="search"
			:placeholder="placeholder"
			:prepend-inner="prependInner"
			:append-inner="appendInner"
			@click="isOpened = !isOpened"
		/>
		<ul
			v-if="isOpened"
			class="autocomplete__list"
		>
			<li
				v-for="result in searchResults"
				:key="result?.id || result"
				class="caption-2-regular | autocomplete__list-item"
				@click="setSelected(result)"
			>
				{{ result?.name }}
			</li>
		</ul>
	</div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
	items: {
		type: Array,
		required: true,
		default: () => [],
	},
	modelValue: {
		type: [String, Number, Object],
	},
	prependInner: {
		type: Boolean,
		default: false,
	},
	appendInner: {
		type: Boolean,
		default: false,
	},
	placeholder: {
		type: String,
		default: 'Выбрать',
	},
})

const emit = defineEmits(['update:modelValue'])

const isOpened = ref(false)
const search = ref('')
watch(() => props.modelValue, (newValue, oldValue) => {
	if (!newValue) search.value = ''
})
const searchResults = computed(() => {
	if (search.value === '') return props.items

	return props.items.filter(item => {
		if (item.name.toLowerCase().includes(search.value.toLowerCase())) return item
	})
})

const setSelected = (item) => {
	isOpened.value = false
	search.value = item.name
	emit('update:modelValue', item)
}

watch(() => search.value, (newValue, oldValue) => {
	const searchResult = searchResults.value[0]?.name.toLowerCase()
	if (newValue.toLowerCase() === searchResult) setSelected(searchResults.value[0])
})

const handleClickedOutside = () => (isOpened.value = false)
</script>

<style scoped lang="scss">
.autocomplete {
	position: relative;

	&__list {
		position: absolute;
		top: 48px;
		width: 100%;
		height: auto;
		max-height: 252px;
		overflow: scroll;

		border: 1px solid #FFFFFF;
		border-radius: 5px;
		background: #FFFFFF;
		box-shadow: 0px 0px 15px 0px #99999933;

		z-index: 100;

		&-item {
			padding: 8px 20px;

			list-style: none;
			color: #00000080;
			transition: var(--base-transition);

			&:hover {
				cursor: pointer;
				color: #000000;
				background: rgba(#5C34F6, .1);
			}

			&:first-child {
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;
			}
			&:last-child {
				border-bottom-left-radius: 5px;
				border-bottom-right-radius: 5px;
			}
		}
	}
}
</style>