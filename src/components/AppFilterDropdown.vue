<template>
	<div class="filter-dropdown">
		<AppButton
			append-inner
			theme="outline"
			:text="t('Filter')"
			class="filter-dropdown__toggle-button"
			@click="toggleShowModal()"
		>
			<template #append-inner>
				<div
						v-if="getFiltersCount"
						class="filter-dropdown__count"
				>
					{{ getFiltersCount }}
				</div>
				<img v-else src="@/assets/icons/icon-filter.svg" alt="filter icon" />
			</template>
		</AppButton>
		<div
			class="filter-dropdown__toggle-button filter-dropdown__toggle-button--icon"
			@click="toggleShowModal()"
		>
			<div
					v-if="getFiltersCount"
					class="filter-dropdown__count"
			>
				{{ getFiltersCount }}
			</div>
			<img v-else src="@/assets/icons/icon-filter.svg" alt="filter icon" />
		</div>
		<BaseModal
			:show-modal="showModal"
			:max-width="715"
			:max-height="680"
			:title="'Фильтр'"
			@on-close="toggleShowModal()"
		>
			<div class="filters-modal__lists modal-filters">
				<div class="modal-filters__block">
					<p class="caption-2-medium">
						{{ t('Theme') }}
					</p>
					<div class="modal-filters__list">
						<BaseCheckbox
								v-for="materialType in themesArray"
								:key="materialType.id"
								v-model="selectedThemesArray"
								:label="materialType.name"
								:value="materialType"
						/>
					</div>
				</div>
				<div class="modal-filters__block">
					<p class="caption-2-medium">
						{{ t('Tags') }}
					</p>
					<div class="modal-filters__list">
						<BaseCheckbox
								v-for="scope in tagsArray"
								:key="scope.id"
								v-model="selectedTagsArray"
								:label="scope.name"
								:value="scope"
						/>
					</div>
				</div>
			</div>
			<div class="filters-modal__buttons">
				<app-button class="filter-dropdown__submit-button" theme="outline" :text="t('Clear')" @click="emit('reset-filters'), toggleShowModal()" />
				<app-button class="filter-dropdown__submit-button" theme="primary" :text="t('Apply')" @click="emit('filters-clicked'), toggleShowModal()" />
			</div>
		</BaseModal>
	</div>
</template>

<script setup>
import {computed, ref, watch} from 'vue'
import { storeToRefs } from 'pinia'
import { useFiltersStore } from '@/stores/filters'
import AppButton from '@/components/AppButton.vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const { getTagsData, getThemesData, getFiltersState } = storeToRefs(useFiltersStore())
const filtersStore = useFiltersStore()

const emit = defineEmits(['filters-clicked', 'reset-filters'])


const themesArray = ref(getThemesData)
const selectedThemesArray = ref(getFiltersState.value.themes)

const tagsArray = ref(getTagsData)
const selectedTagsArray = ref(getFiltersState.value.tags)

const showModal = ref(false)

watch(() => selectedTagsArray.value, (newValue) => filtersStore.updateTagsFilters(newValue))
watch(() => selectedThemesArray.value, (newValue) => filtersStore.updateThemesFilters(newValue))
const toggleShowModal = () => showModal.value = !showModal.value

const getFiltersCount = computed(() => getFiltersState.value.tags.length + getFiltersState.value.themes.length)
</script>

<style lang="scss" scoped>
.modal-filters {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 24px;

	@media screen and (max-width: 767px) {
		grid-template-columns: 1fr;
	}
	&__list {
		margin: 16px 0 0;
		padding: 0 8px 0 0;
		display: flex;
		flex-direction: column;
		gap: 16px;
		max-height: 450px;
		overflow: scroll;
	}
}

.filters-modal__buttons {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 24px;
	margin: 28px 0 0;

	@media screen and (max-width: 767px) {
		flex-direction: column-reverse;
		gap: 8px;
	}
}



.filter-dropdown {
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}

.filter-dropdown__count {
	position: absolute;
	top: 50%;
	right: 23px;
	transform: translateY(-50%);

	width: 18px;
	height: 18px;
	display: flex;
	align-items: center;
	justify-content: center;

	font-size: 9px;
	font-weight: 700;
	line-height: 16px;
	letter-spacing: 0;
	text-align: center;

	border-radius: 50%;
	color: #FFFFFF;
	background-color: #FF0000;
}

.filter-dropdown__toggle-button--icon {
	display: none;
}
.filter-dropdown__toggle-button {
	position: relative;
	box-sizing: border-box;

	border: none;
	border-radius: 5px;
	background: var(--tab-button-default-color);
	transition: var(--base-transition);
}

.filter-dropdown__toggle-button:hover,
.filter-dropdown__toggle-button:focus {
	box-shadow: var(--hover-shadow);
}

.filter-dropdown__filters-window {
	position: absolute;
	top: calc(100% + 8px);
	right: 0;
	z-index: 5;

	box-sizing: border-box;
	margin: 0;
	padding: 28px;
	display: none;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	width: 370px;

	border-radius: 12px;
	background: var(--background-primary);
	box-shadow: 0 0 15px 0 rgba(153, 153, 153, 0.2);
}

.filter-dropdown__filters-window--opened {
	display: flex;
}

.filter-dropdown__header {
	margin: 0;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.filter-dropdown__heading {
	margin: 0;

	font-family: var(--headings-font);
	font-weight: 700;
	line-height: 28px;
	font-size: 24px;
	font-style: normal;
	color: var(--headings-color);
}

.filter-dropdown__close-button {
	margin: 0;
	padding: 0;

	width: 28px;
	height: 28px;

	background: url('../assets/icons/icon-close.svg') center no-repeat;
	cursor: pointer;
}

.filter-dropdown__groups-list {
	margin: 24px 0 0;
	padding: 0;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 24px;

	list-style: none;
}

.filter-dropdown__groups-item {
	margin: 0;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}

.filter-dropdown__group-name {
	margin: 0;
	padding: 0;

	font-family: var(--text-font);
	font-weight: 600;
	font-style: normal;
	font-size: 16px;
	color: var(--text-primaty-color, #000);
}

.filter-dropdown__filters-list {
	margin: 16px 0 0;
	padding: 0;
	width: 100%;
	height: 100%;
	max-height: 250px;
	overflow: scroll;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	gap: 16px;

	list-style: none;
}

.filter-dropdown__submit-button {

	width: 100%;
}

@media (max-width: 1080px) {
	.filter-dropdown__toggle-button {
		display: none;
	}
	.filter-dropdown__toggle-button.filter-dropdown__toggle-button--icon::after {
		width: 0;
		height: 0;
		display: none;
	}
	.filter-dropdown__toggle-button.filter-dropdown__toggle-button--icon {
		display: flex;
		padding: 10px;
	}
}
@media screen and (max-width: 500px) {
	.filter-dropdown__filters-window {
		right: 0;
		width: calc(100vw - 50px);
	}
}
</style>
