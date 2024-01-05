<template>
	<page-layout class="media-layout" :aside="false" :no-sticky="true">
		<template #header>
			<app-header class="media-layout__header" heading="News" :breadcrumbs="breadcrumbs" />
		</template>
		<template #main>
			<div v-if="mediaStore.getDataLoadingStatus" class="media-layout__main-content">
				<div class="media-layout__media-filters">
					<BaseSkeletonPath :width="135" :height="40" />
					<BaseSkeletonPath :width="320" :height="40" />
				</div>
				<ul class="media-layout__media-list">
					<li class="media-layout__media-item" v-for="skelet in 3" :key="skelet">
						<BaseSkeletonPath :width="'100%'" :height="340" />
						<BaseSkeletonPath :width="'100%'" :height="28" class="mt-4" />
					</li>
				</ul>
			</div>
			<div v-else class="media-layout__main-content">
				<div class="media-layout__media-filters">
					<app-filter-dropdown class="media-layout__filter" @reset-filters="resetFiltersClicked()"
						@filters-clicked="handleFiltersClicked()" />
					<BaseInput2 v-model="search" class="media-layout__search"
						@keydown.enter="search ? handleFiltersClicked() : false" />
					<AppButton :disabled="!search" :loading="mediaStore.getDataLoadingStatus" :text="'Найти'"
						:theme="'outline'" class="education-layout__search-button" @click="handleFiltersClicked()" />
				</div>
				<ul v-if="medias.length" class="media-layout__media-list">
					<li class="media-layout__media-item" v-for="media in medias" :key="media.id">
						<router-link class="media-layout__card-link" :to="`/media/${media.id}`">
							<app-media-card class="media-layout__media-card" :viewed="media?.viewed" :topic="media?.name"
								:img="media?.image" :badges="badgesText(media?.tags)" />
						</router-link>
					</li>
				</ul>
				<div v-else>
					{{ t('List empty') }}
				</div>
			</div>
		</template>
	</page-layout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useMediaStore } from '@/stores/media'
import { useFiltersStore } from '@/stores/filters'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import PageLayout from './layouts/PageLayout.vue'
import AppHeader from '../components/AppHeader.vue'
import AppFilterDropdown from '../components/AppFilterDropdown.vue'
import AppSearch from '../components/AppSearch.vue'
import AppMediaCard from '../components/AppMediaCard.vue'
import AppButton from "@/components/AppButton.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const { getMediaList } = storeToRefs(useMediaStore())
const mediaStore = useMediaStore()
const filtersStore = useFiltersStore()

const router = useRouter()
onMounted(async () => {
	await mediaStore.fetchMediaList()
	filtersStore.resetFilters()
})

const breadcrumbs = [
	{
		name: t('Home'),
		url: '/main',
	},
	{
		name: t('News'),
		url: '',
	},
]

const medias = ref(getMediaList)

const badgesText = (badges) => badges.map((item) => item.name)

const handleFiltersClicked = () => mediaStore.fetchMediaList()
const resetFiltersClicked = () => {
	useFiltersStore().resetFilters()
	mediaStore.fetchMediaList()
}

const search = ref('')
watch(() => search.value, (newValue, oldValue) => {
	if (oldValue && !newValue) handleFiltersClicked()
	filtersStore.updateSearch(newValue)
})
</script>

<style>
.media-layout__main-content {
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
}

.media-layout__media-filters {
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-end;
	align-items: center;
	align-content: center;
	gap: 20px;
}

.media-layout__tabs {
	margin: 0 auto 0 0;
	width: auto;
}

.media-layout__search {
	max-width: 320px;
	width: 100%;
}

.media-layout__media-list {
	margin: 32px 0 0;
	padding: 0;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-column-gap: 30px;
	grid-row-gap: 32px;

	list-style: none;
}

.media-layout__media-item {
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
}

.media-layout__card-link {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	flex-grow: 1;

	text-decoration: none;
}

.media-layout__media-card {
	flex-grow: 1;
}

@media screen and (max-width: 1366px) {
	.media-layout__media-list {
		grid-template-columns: 1fr 1fr;
	}
}

@media screen and (max-width: 1080px) {
	.media-layout__search {
		display: none;
	}

	.education-layout__search-button {
		display: none;
	}
}

@media screen and (max-width: 768px) {
	.media-layout__media-list {
		grid-template-columns: 1fr;
	}
}
</style>
