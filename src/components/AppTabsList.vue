<template>
	<ul class="tabs">
		<li class="tabs__item" v-for="(tab, index) in tabs" :key="index">
			<button
				:class="[
					'tabs__tab-button',
					tab.url === openedTab ? 'tabs__tab-button--opened' : '',
					isDisabled ? 'tabs__tab-button--disabled' : '',
				]"
				type="button"
				@click="tabButtonClickHandler(tab)"
			>
				{{ tab.name ? tab.name : t('Error') }}
			</button>
		</li>
	</ul>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
	tabs: {
		// { name: 'Модули', url: '/modules' } и т.д.
		type: Array,
		required: true,
		validator(value) {
			Object.values(value).forEach((tab) => {
				if (!tab.name) {
					console.warn(`В таб не передано поле name`)
					return false
				}
				if (!tab.url) {
					console.warn(`В таб не передано поле url`)
					return false
				}
			})
			return true
		},
	},
	isDisabled: {
		type: Boolean,
		default: false,
	},
	openedTab: {
		// '/all', '/courses', и т.д.
		type: String,
		required: true,
	},
})

const emit = defineEmits(['change'])

const tabButtonClickHandler = (tab) => {
	emit('change', tab.url)
}
</script>

<style>
.tabs {
	padding: 0;
	width: fit-content;
	display: flex;
	gap: 16px;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: center;
	align-content: center;

	list-style: none;
}

@media screen and (max-width: 425px) {
	.tabs {
		gap: 8px;
		flex-wrap: nowrap;
	}
}

.tabs__item {
	margin: 0;
	padding: 0;
}

.tabs__tab-button {
	box-sizing: border-box;
	padding: 12px 20px;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	color: var(--text-primaty-color);

	border-radius: 12px;
	background: var(--tab-button-default-color);
	transition: var(--base-transition);
}

.tabs__tab-button:hover,
.tabs__tab-button:focus {
	outline: none;
	box-shadow: var(--hover-shadow);
}

.tabs__tab-button--opened {
	/* #TODO после выпила вьютифая убрать important */
	color: #fff !important;
	background: var(--tab-button-opened-color);
}

.tabs__tab-button--disabled {
	pointer-events: none;
}
</style>
