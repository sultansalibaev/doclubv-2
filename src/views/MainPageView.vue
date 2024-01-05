<template>
  <page-layout class="main-layout" :aside="true">
    <template #header>
      <app-header class="main-layout__header" heading="Home" />
    </template>
    <template #main>
      <div class="main-layout__main-content">
        <the-stories-layout class="main-layout__stories-layout" />
        <the-navigation-layout :loading="dashboardStore.getDataLoadingStatus" class="main-layout__navigation-layout" />
        <the-modules-layout v-if="dashboardStore.getModules" :modules="dashboardStore.getModules"
          :loading="dashboardStore.getDataLoadingStatus" class="main-layout__modules-layout" />
        <the-personal-layout :loading="dashboardStore.getDataLoadingStatus" class="main-layout__personal-layout" />
        <the-recommended-media-layout class="main-layout__media-layout" v-if="dashboardStore.getMedia"
          :media="dashboardStore.getMedia" />
      </div>
    </template>
    <template #aside>
      <div class="main-layout__aside-content">
        <TheCalendar :event-dates="eventDatesList" @on-date-clicked="handleDateClick($event)"
          @on-date-update="handleUpdateDate($event)" class="mt-8" />
        <div class="article-layout__aside-content">
          <h5 class="headers-5 | text-gray800">{{ t('Upcoming Events') }}</h5>
          <AppAnnouncementCard v-for="(announcement, index) in getUpcomingEventData" :key="announcement.id"
            :tags="[getDate(announcement.start_date, announcement.end_date)]" :name="announcement.name"
            :badges="badgesText(announcement.tags)" :link="announcement.id.toString()" class="mt-8"
            @on-button-click="openUpcomingEvent($event)" />
        </div>
      </div>
    </template>
  </page-layout>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { useEventsStore } from '@/stores/events'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from "vue-i18n";
const { t } = useI18n();


import PageLayout from '@/views/layouts/PageLayout.vue'
import AppHeader from '@/components/AppHeader.vue'
import TheStoriesLayout from '@/components/stories/TheStoriesLayout.vue'
import TheNavigationLayout from '@/components/TheNavigationLayout.vue'
import TheModulesLayout from '@/components/TheModulesLayout.vue'
import ThePersonalLayout from '@/components/ThePersonalLayout.vue'
import TheRecommendedMediaLayout from '@/components/TheRecommendedMediaLayout.vue'
import TheCalendar from '@/components/TheCalendar.vue'
import AppAnnouncementCard from '@/components/AppAnnouncementCard.vue'

const { getUpcomingEventData, getDataLoadingStatus, getScheduleEvents } = storeToRefs(useEventsStore())

const dashboardStore = useDashboardStore()
const eventsStore = useEventsStore()
const route = useRoute()
const router = useRouter()

const badgesText = (badges) => badges.map((item) => item.name)
const currentTab = computed(() => `/${route.params.type}`)
const openUpcomingEvent = (event) => {
  router.push(`/events${currentTab.value}/${event}`)
  eventsStore.fetchEvent(event)
}
const getDate = (start, end) => {
  const options = {
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
  }

  const startDateWithTime = new Date(start).toLocaleString('ru', options).split(' в ')
  const endDateWithTime = new Date(end).toLocaleString('ru', options).split(' в ')

  const startDate = startDateWithTime[0]
  const startTime = startDateWithTime[1]

  const endDate = endDateWithTime[0]
  const endTime = endDateWithTime[1]

  if (startDate === endDate) return `${startDate} ${startTime} - ${endTime}`
  else return `${startDate} ${startTime} - ${endDate} ${endTime}`
}

const handleDateClick = (date) => router.push(`/events/all`)
const handleUpdateDate = async ({ year, month }) => {
  eventDatesList.value = []
  await eventsStore.fetchScheduleEvents(year, month)

  const twoDigits = (num) => {
    if (num < 10) return ('0' + num).slice(-2)
    else return num
  }

  for (let item of Object.entries(getScheduleEvents.value)) {
    if (item[1]) eventDatesList.value.push(`${year}-${twoDigits(month)}-${twoDigits(item[0])}`)
  }
}


let eventDatesList = ref([])

onMounted(async () => {
  await dashboardStore.fetchDashboardData()
  await eventsStore.fetchUpcomingEvents()
})
</script>

<style>
.main-layout__main-content,
.main-layout__aside-content {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 32px;
}
</style>
