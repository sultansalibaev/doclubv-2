<template>
	<PageLayout :aside="true" class="events-layout">
		<template #header>
			<AppHeader :breadcrumbs="breadcrumbs" heading="Events" />
			<div class="mt-8 events-layout__filters">
				<AppTabsList :is-disabled="loadings" :tabs="tabs" :opened-tab="currentTab" @change="tabChangeHandler" />
				<div class="events-layout__search-block">
					<app-filter-dropdown class="events-layout__filter" @reset-filters="resetFiltersClicked()"
						@filters-clicked="handleFiltersClicked()" />
					<!--					<BaseInput2-->
					<!--							v-model="search"-->
					<!--							disabled-->
					<!--							class="events-layout__search"-->
					<!--							@keydown.enter="search ? handleFiltersClicked() : false"-->
					<!--					/>-->
					<!--					<AppButton-->
					<!--							:disabled="!search"-->
					<!--							:text="'Найти'"-->
					<!--							:theme="'outline'"-->
					<!--							class="events-layout__search-button ml-4"-->
					<!--							@click="handleFiltersClicked()"-->
					<!--					/>-->
				</div>
			</div>
		</template>
		<template #main>
			<template v-if="getDataLoadingStatus || getDataLoadingStatus1">
				<div class="d-flex flex-column gap-8">
					<div v-for="skelet in 3" :key="skelet">
						<BaseSkeletonPath :width="130" :height="28" />
						<BaseSkeletonPath width="100%" :height="220" class="mt-8" />
					</div>
				</div>
			</template>
			<template v-else>
				<div class="d-flex flex-column gap-8">
					<template v-for="events in getEventsData" :key="events.date">
						<div v-if="events.items.length && currentTab === '/all'">
							<h5 class="headers-5 | text-gray900">
								{{ getEventsDateString(events.date) }}
							</h5>
							<div class="mt-8 events-layout__content">
								<template v-if="events.items.length">
									<AppAnnouncementCard v-for="(announcement, index) in events.items" :key="index"
										:tags="[]" :name="announcement.name" :badges="badgesText(announcement.tags)"
										:link="announcement.id.toString()"
										@on-button-click="router.push(`/events${currentTab}/${$event}`)" />
								</template>
								<template v-else>
									<p class="small-regular | text-gray800">{{ t('List empty') }}</p>
								</template>
							</div>
						</div>
						<div
							v-if="events.items.filter(item => item.type === 'offline').length && currentTab === '/offline'">
							<h5 class="headers-5 | text-gray900">
								{{ getEventsDateString(events.date) }}
							</h5>
							<div class="mt-8 events-layout__content">
								<template v-if="events.items.length">
									<AppAnnouncementCard v-for="(announcement, index) in events.items" :key="index"
										:tags="[]" :name="announcement.name" :badges="badgesText(announcement.tags)"
										:link="announcement.id.toString()"
										@on-button-click="router.push(`/events${currentTab}/${$event}`)" />
								</template>
								<template v-else>
									<p class="small-regular | text-gray800">{{ t('List empty') }}</p>
								</template>
							</div>
						</div>
						<div v-if="events.items.filter(item => item.type === 'online').length && currentTab === '/online'">
							<h5 class="headers-5 | text-gray900">
								{{ getEventsDateString(events.date) }}
							</h5>
							<div class="mt-8 events-layout__content">
								<template v-if="events.items.length">
									<AppAnnouncementCard v-for="(announcement, index) in events.items" :key="index"
										:tags="[]" :name="announcement.name" :badges="badgesText(announcement.tags)"
										:link="announcement.id.toString()"
										@on-button-click="router.push(`/events${currentTab}/${$event}`)" />
								</template>
								<template v-else>
									<p class="small-regular | text-gray800">{{ t('List empty') }}</p>
								</template>
							</div>
						</div>
					</template>
				</div>
			</template>
		</template>
		<template #aside>
			<template v-if="getDataLoadingStatus">
				loadingNeedSkeleton
			</template>
			<template v-else>
				<TheCalendar :event-dates="eventDatesList" @on-date-clicked="getDate($event)"
					@on-date-update="handleUpdateDate($event)" class="events-layout__calendar grid-row-2" />
			</template>
		</template>
	</PageLayout>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PageLayout from '@/views/layouts/PageLayout.vue'
import AppAnnouncementCard from '@/components/AppAnnouncementCard.vue'
import AppTabsList from '@/components/AppTabsList.vue'
import AppFilterDropdown from '@/components/AppFilterDropdown.vue'
import AppHeader from '@/components/AppHeader.vue'
import TheCalendar from '@/components/TheCalendar.vue'
import router from '@/router'

import { useFiltersStore } from '@/stores/filters'
import { useEventsStore } from '@/stores/events'
import { storeToRefs } from 'pinia'
import AppButton from '@/components/AppButton.vue'
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const { getEventsData, getDataLoadingStatus, getScheduleEvents, getDataLoadingStatus1 } = storeToRefs(useEventsStore())
const eventsStore = useEventsStore()

const route = useRoute()
const loadings = computed(() => isLoading.value)
const isLoading = ref(false)

const breadcrumbs = [
	{
		name: t('Home'),
		url: '/main',
	},
	{
		name: t('Events'),
		url: '',
	},
]

const tabs = [
	{
		name: t('All'),
		url: '/all',
	},
	{
		name: t('Offline'),
		url: '/offline',
	},
	{
		name: t('Online'),
		url: '/online',
	},
]
const currentTab = computed(() => `/${route.params.type}`)
const tabChangeHandler = (url) => router.push(`/events${url}`)

const badgesText = (badges) => badges.map((item) => item.name)

const getDate = (date) => eventsStore.fetchCalendarEvent(date)

const dateData = ref({
	year: 0,
	month: 0,
	lastDateOfMonth: 0,
})
const handleUpdateDate = async ({ year, month, lastDateOfMonth }) => {
	dateData.value.year = year
	dateData.value.month = month
	dateData.value.lastDateOfMonth = lastDateOfMonth
	await eventsStore.fetchScheduleEvents(year, month)
	await eventsStore.fetchEvents(year, month, lastDateOfMonth)

	const twoDigits = (num) => {
		if (num < 10) return ('0' + num).slice(-2)
		else return num
	}

	for (let item of Object.entries(getScheduleEvents.value)) {
		if (item[1]) eventDatesList.value.push(`${year}-${twoDigits(month)}-${twoDigits(item[0])}`)
	}
}

let eventDatesList = ref([])

const getEventsDateString = (date) => {
	const options = {
		month: 'long',
		day: 'numeric',
		timezone: 'UTC',
	}

	return new Date(date).toLocaleString(locale.value, options)
}

const search = ref('')
const handleFiltersClicked = () => eventsStore.fetchEvents(dateData.value.year, dateData.value.month, dateData.value.lastDateOfMonth)
const resetFiltersClicked = () => {
	useFiltersStore().resetFilters()
	handleFiltersClicked()
}
</script>

<style>
@media (max-width: 1366px) {
	.events-layout .page-layout__columns-wrapper--two-columns .page-layout__header-wrapper {
		grid-row: 1;
	}

	.events-layout .page-layout__columns-wrapper--two-columns .page-layout__aside {
		grid-row: 2;
	}

	.events-layout .page-layout__columns-wrapper--two-columns .page-layout__main-content {
		grid-row: 3;
	}
}
</style>

<style lang="scss">
.events-layout {
	&__content {
		display: grid;
		gap: 32px;

		//@media (min-width: 2400px) {
		//	grid-template-columns: repeat(2, 1fr);
		//}
	}

	&__filters {
		margin: 0;
		gap: 32px;
		flex-wrap: wrap;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	&__filters-tabs {
		width: max-content;
	}

	&__search {
		margin: 0 0 0 16px;
	}

	&__search-block {
		display: flex;
	}

	&__calendar {
		position: sticky;
		top: 20px;
	}
}
</style>
