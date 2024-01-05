<template>
	<page-layout class="education-layout" :aside="false">
		<template #header>
			<app-header class="education-layout__header" heading="Education" :breadcrumbs="breadcrumbs" />
		</template>
		<template #main>
			<div class="education-layout__main-content">
				<div class="education-layout__education-filters" v-if="!educationStore.getDataLoadingStatus">
					<app-tabs-list class="education-layout__tabs mr-2" :tabs="tabs" :opened-tab="currentTab"
						@change="tabChangeHandler" />
					<app-filter-dropdown class="education-layout__filter" @reset-filters="resetFiltersClicked()"
						@filters-clicked="handleFiltersClicked()" />
					<BaseInput2 v-model="search" class="education-layout__search"
						@keydown.enter="search ? handleFiltersClicked() : false" />
					<AppButton :disabled="!search" :loading="educationStore.getDataLoadingStatus" :text="t('Find')"
						:theme="'outline'" class="ml-4 education-layout__search-button" @click="handleFiltersClicked()" />
				</div>

				<div class="education-layout__loader-wrapper" v-if="educationStore.getDataLoadingStatus">
					<app-loader class="education-layout__loader" height="50" width="50" />
					<p class="education-layout__loader-text">{{ t('Loading') }}...</p>
				</div>
				<ul class="education-layout__materials-list"
					v-else-if="currentTab === '/all' && educationStore.getMaterials.length > 0">
					<li class="education-layout__announcement-item" v-for="(card, index) in educationStore.getMaterials"
						:key="index">
						<app-module-card v-if="card.type === 'module'" class="education-layout__card" :image="card.image"
							:tags="card.tags" :name="card.name" :color-scheme="card.colorScheme"
							:downloadable-materials="card.hasDownloadableMaterials"
							:viewable-materials="card.hasViewableMaterials" @click="cardModulesClickHandler(card)" />
						<app-course-card v-if="card.type === 'course'" class="education-layout__card" :image="card.image"
							:tags="card.tags" :name="card.name" :color-scheme="card.colorScheme"
							:modules-count="card.modulesCount" @click="cardCoursesClickHandler(card)" />
					</li>
				</ul>
				<ul class="education-layout__modules-list"
					v-else-if="currentTab === '/modules' && educationStore.getModules.length > 0">
					<li class="education-layout__announcement-item" v-for="(card, index) in educationStore.getModules"
						:key="index">
						<app-module-card class="education-layout__card" :image="card.image" :tags="card.tags"
							:name="card.name" :color-scheme="card.colorScheme"
							:downloadable-materials="card.hasDownloadableMaterials"
							:viewable-materials="card.hasViewableMaterials" @click="cardModulesClickHandler(card)" />
					</li>
				</ul>
				<ul class="education-layout__courses-list"
					v-else-if="currentTab === '/courses' && educationStore.getCourses.length > 0">
					<li class="education-layout__announcement-item" v-for="(card, index) in educationStore.getCourses"
						:key="index">
						<app-course-card class="education-layout__card" :image="card.image" :tags="card.tags"
							:name="card.name" :color-scheme="card.colorScheme" :modules-count="card.modulesCount"
							@click="cardCoursesClickHandler(card)" />
					</li>
				</ul>
				<div class="education-layout__fallback-wrapper" v-else>
					<p class="education-layout__fallback-text">{{ t('No materials found') }}</p>
					<app-button class="education-layout__refresh-button" type="button" theme="primary" :text="t('Refresh')"
						@click="refreshButtonClickHandler" />
				</div>
			</div>
		</template>
	</page-layout>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

import { useEducationStore } from '@/stores/education'
import { useFiltersStore } from '@/stores/filters'

import PageLayout from '@/views/layouts/PageLayout.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppTabsList from '@/components/AppTabsList.vue'
import AppFilterDropdown from '@/components/AppFilterDropdown.vue'
import AppSearch from '@/components/AppSearch.vue'
import AppLoader from '@/components/AppLoader.vue'
import AppButton from '@/components/AppButton.vue'
import AppModuleCard from '@/components/materials/AppModuleCard.vue'
import AppCourseCard from '@/components/materials/AppCourseCard.vue'

const router = useRouter()
const route = useRoute()

const educationStore = useEducationStore()
const filtersStore = useFiltersStore()

let menuOpened = ref(false)

const breadcrumbs = [
	{
		name: t('Home'),
		url: '/main',
	},
	{
		name: t('Training'),
		url: '',
	},
]

const tabs = ref([
	{
		name: t('All'),
		url: '/all',
	},
	{
		name: t('Lessons'),
		url: '/modules',
	},
	{
		name: t('Courses'),
		url: '/courses',
	},
])

const currentTab = computed(() => {
	return `/${route.params.type}`
})

function tabChangeHandler(url) {
	router.push(`/education${url}`)
}

function burgerToggleHandler() {
	menuOpened.value = !menuOpened.value
}

function refreshButtonClickHandler() {
	search.value = ''
	fetchEducationData()
}

function cardModulesClickHandler(card) {
	if (!card.id) {
		console.warn(t('Missing id'))
		return
	}
	router.push(`module/${card.id}`)
}

function cardCoursesClickHandler(card) {
	if (!card.id) {
		console.warn(t('Missing id'))
		return
	}
	router.push(`course/${card.id}`)
}

async function fetchEducationData() {
	await educationStore.fetchMaterials()
}

onMounted(() => {
	fetchEducationData()
	filtersStore.resetFilters()
})

const handleFiltersClicked = () => educationStore.fetchEducationSearch()
const resetFiltersClicked = () => {
	filtersStore.resetFilters()
	educationStore.fetchEducationSearch()
}

const search = ref('')
watch(() => search.value, (newValue, oldValue) => {
	if (oldValue && !newValue) handleFiltersClicked()
	filtersStore.updateSearch(newValue)
})
</script>

<style>
.education-layout__main-content {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	flex-grow: 1;
}

.education-layout__education-filters {
	margin: 0;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
}

.education-layout__filter {
	margin-left: auto;
}

.education-layout__search {
	max-width: 320px;
	width: 100%;
	margin: 0 0 0 16px;
}

.education-layout__loader-wrapper {
	margin: 20px 0 0;
	padding: 0;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.education-layout__loader-text {
	margin: 30px 0 0;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 18px;
	line-height: 24px;
	color: #000;
}

.education-layout__materials-list,
.education-layout__modules-list,
.education-layout__courses-list {
	margin: 32px 0 0;
	padding: 0;
	display: grid;
	align-items: stretch;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-template-rows: 384px;
	grid-auto-rows: auto;
	grid-row-gap: 32px;
	grid-column-gap: 30px;

	list-style: none;
}

.education-layout__announcement-item {
	margin: 0;
	grid-column: span 2;
	display: flex;
	justify-content: stretch;
	align-items: stretch;
}

.education-layout__announcement-item:first-child {
	grid-column: span 4;
}

.education-layout__announcement-item:nth-child(2) {
	grid-column: span 2;
}

.education-layout__announcement-item:nth-child(3),
.education-layout__announcement-item:nth-child(4) {
	grid-column: span 3;
}

.education-layout__announcement-item:first-child strong {
	font-size: 40px;
	font-style: normal;
	font-weight: 700;
	line-height: 44px;
	text-transform: uppercase;
}

.education-layout__announcement-item:nth-child(2) strong {
	font-size: 28px;
	font-style: normal;
	font-weight: 700;
	line-height: 36px;
}

.education-layout__announcement {
	flex-grow: 1;
}

.education-layout__fallback-wrapper {
	margin: 20px 0 0;
	padding: 0;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.education-layout__fallback-text {
	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 18px;
	line-height: 24px;
	color: #000;
}

.education-layout__refresh-button {
	margin: 20px 0 0;
}

@media screen and (max-width: 1366px) {
	.education-layout__announcement-item {
		grid-column: span 3;
	}

	.education-layout__announcement-item:first-child {
		grid-column: span 6;
	}

	.education-layout__announcement-item:nth-child(2) {
		grid-column: span 3;
	}
}

@media (max-width: 1220px) {

	.education-layout__search,
	.education-layout__search-button {
		display: none;
	}
}

@media screen and (max-width: 1080px) {

	.education-layout__materials-list,
	.education-layout__modules-list,
	.education-layout__courses-list {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: stretch;
	}

	.education-layout__announcement-item:first-child strong,
	.education-layout__announcement-item:nth-child(2) strong {
		font-weight: 700;
		font-style: normal;
		font-size: 20px;
		line-height: 28px;
	}

	.education-layout__education-filters {
		justify-content: space-between;
	}

	.education-layout__filter {
		margin-left: 0;
	}
}

@media screen and (max-width: 768px) {}

@media screen and (max-width: 500px) {
	/*.education-layout__education-filters {
		flex-direction: column;
		align-items: flex-start;
		gap: 16px;
	}*/
}
</style>
