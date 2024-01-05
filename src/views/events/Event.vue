<template>
	<PageLayout class="article-layout" :aside="true">
		<template #header>
			<AppHeader class="article-layout__header" heading="Education" :breadcrumbs="getBreadcrumbs" />
		</template>
		<template #main>
			<template v-if="getDataLoadingStatus">
				<BaseSkeletonPath
					width="100%"
					:height="500"
					class="mt-4"
				/>
			</template>
			<div v-else class="article-layout__main-content">
				<EventTimer class="mb-8" :date-time="getEventData.start_date" />
				<div class="event-carousel">
					<div v-if="getEventData?.external_event_video_link" class="event-player">
						<app-player
							:src="getEventData?.external_event_video_link"
							:time="videoTime"
							class="event-player__player"
						/>
					</div>
					<v-carousel
						v-else-if="getEventData?.images?.length || getEventData.video_link"
						:hide-delimiters="getEventData?.images?.length === 1 && !getEventData.video_link"
						:show-arrows="false"
						style="height: auto; max-height: 500px"
					>
						<v-carousel-item v-if="getEventData?.video_link">
							<div class="event-player">
								<app-player
									:src="getEventData?.video_link"
									:time="videoTime"
									class="event-player__player"
								/>
							</div>
						</v-carousel-item>
						<v-carousel-item
							v-for="image in getEventData.images"
							:key="image"
						>
							<v-img
								:src="image.file"
								aspect-ratio="16/9"
								:height="500"
								cover
							/>
						</v-carousel-item>
					</v-carousel>
				</div>
				<section
					class="article-layout__article article"
					:class="[getEventData?.images?.length > 1 && getEventData?.external_event_video_link || (getEventData?.images?.length && getEventData.video_link) ? 'mt82' : 'mt-8']"
				>
					<h2 class="headers-2 | text-gray900">
						{{ getEventData.name }}
					</h2>
					<div class="mt-8 event__blockquote">
						<div>
							<div class="event__blockquote-info">
								<div>
									<div class="caption-2-regular | text-gray800">Дата и время</div>
									<div class="caption-1-regular | mt-2 text-gray900">{{ getDate(getEventData.start_date, getEventData.end_date) }}</div>
								</div>
								<div>
									<div class="caption-2-regular | text-gray800">Место</div>
									<div class="caption-1-regular | mt-2 text-gray900">{{ getEventData.type }}</div>
								</div>
							</div>
							<div class="mt-4 event__blockquote-info">
								<div>
									<div class="caption-2-regular | text-gray800">Адрес</div>
									<div class="caption-1-regular | mt-2 text-gray900">{{ getEventData.place_address }}</div>
								</div>
								<div>
									<div class="caption-2-regular | text-gray800">Комментарий</div>
									<div class="caption-1-regular | mt-2 text-gray900">{{ getEventData.place_description }}</div>
								</div>
							</div>
						</div>
						<div class="event__blockquote-buttons">
							<template v-if="!getEventData.external_registration_link">
								<AppButton
									:text="getEventData.is_registered ? 'Не хочу учавствовать' : 'Буду учавствовать'"
									:theme="getEventData.is_registered ? 'outline' : 'primary'"
									@click="getEventData.is_registered ? eventStore.unregistrationOnEvent(id) : eventStore.registrationOnEvent(id)"
								/>
							</template>
							<template v-else>
								<AppButton
									text="Зарегистрироваться"
									:theme="'primary'"
									@click="openRegistrationLink(getEventData.external_registration_link)"
								/>
							</template>
              <AppButton
								:text="'Поделиться'"
								:theme="'outline'"
								append-inner
								@click="shareModalOpened = true"
              >
                <template #append-inner>
                  <img src="@/assets/icons/icon-share.svg" alt="" />
                </template>
              </AppButton>
              <AppShareModal
								class="course-layout__share-modal"
								:url="route.fullPath"
								v-if="shareModalOpened"
								@modal-close="shareModalOpened = false"
              />
						</div>
					</div>
					<p class="body-regular | mt-8 text-pre-wrap text-gray800">
						{{ getEventData.description }}
					</p>
					<h4 v-if="getEventData.schedule?.length" class="headers-4 | mt-8 text-gray900">Программа мероприятия</h4>
					<BaseExpansionPanel
						v-for="schedule in getEventData.schedule"
						:key="schedule.id"
						:title="schedule.name"
						class="mt-6"
					>
						<div
							v-for="(block, index) in schedule.sub_blocks"
							:key="block.id"
							:class="['expanded-block', index !== 0 ? 'mt-5' : '']"
						>
							<div class="expanded-block__description">
								<span class="small-regular | text-gray800"> {{ block.from_time.slice(0, -3) }} - {{ block.to_time.slice(0, -3) }} </span>
								<span class="caption-2-regular | text-gray800">
									{{ block.name }}
								</span>
							</div>
							<div v-if="block?.lectors.length" class="speakers">
								<div
									v-for="speaker in block.lectors"
									:key="speaker.id"
									class="speakers__speaker speaker"
								>
									<div class="speaker__avatar-wrapper">
										<img :src="speaker?.photo" alt="" class="speaker__avatar" />
									</div>
									<div class="ml-5 d-flex flex-column">
										<span class="caption-2-regular | text-gray900"> {{ speaker?.first_name }} {{ speaker?.last_name }} </span>
										<span class="small-regular | mt-1 text-gray800">
											{{ speaker?.description }}
										</span>
									</div>
								</div>
							</div>
						</div>
					</BaseExpansionPanel>
					<div class="mt-8 tags">
						<div v-for="tag in getEventData.tags" :key="tag.id" class="tag">
							{{ tag.name }}
						</div>
					</div>
				</section>
				<AppWorkshopWidget v-if="getEventData?.sponsors?.length" :sponsor-info="getEventData?.sponsors[0]" class="mt-8 article-layout__workshop" />
			</div>
		</template>
		<template #aside>
			<div class="article-layout__aside-content">
				<h5 class="headers-5 | text-gray800">Ближайшие мероприятия</h5>
				<template v-if="getDataLoadingStatus">
					<BaseSkeletonPath
						width="100%"
						:height="272"
						class="mt-8"
					/>
				</template>
				<template v-else>
					<AppAnnouncementCard
						v-for="(announcement, index) in getUpcomingEventData"
						:key="announcement.id"
						:tags="[getDate(announcement.start_date, announcement.end_date)]"
						:name="announcement.name"
						:badges="badgesText(announcement.tags)"
						:link="announcement.id.toString()"
						class="mt-8"
						@on-button-click="openUpcomingEvent($event)"
					/>
				</template>
			</div>
		</template>
	</PageLayout>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useEventsStore } from '@/stores/events'
import { storeToRefs } from 'pinia'
import AppPlayer from '@/components/module/AppPlayer.vue'
import AppAnnouncementCard from '@/components/AppAnnouncementCard.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppWorkshopWidget from '@/components/AppWorkshopWidget.vue'
import EventTimer from '@/views/events/EventTimer.vue'
import PageLayout from '@/views/layouts/PageLayout.vue'
import AppButton from '@/components/AppButton.vue'
import AppShareModal from '@/components/AppShareModal.vue'

const { getEventData, getDataLoadingStatus, getUpcomingEventData, getBreadcrumbs } = storeToRefs(useEventsStore())

const route = useRoute()
const router = useRouter()
const eventStore = useEventsStore()

onMounted(async () => eventStore.fetchEvent(id.value))

const currentTab = computed(() => `/${route.params.type}`)
const openUpcomingEvent = (event) => {
  if (event === id.value) return
  router.push(`/events${currentTab.value}/${event}`)
  eventStore.fetchEvent(event)
}

const id = computed(() => route?.params?.id)

const badgesText = (badges) => badges.map((item) => item.name)

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

const videoTime = ref(0)

const shareModalOpened = ref(false)

const openRegistrationLink = (link) => window.open(link, '_blank')
</script>

<style lang="scss">
.event__blockquote {
	position: relative;
	padding: 8px 0 8px 24px;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	&-info {
		display: flex;
		align-items: center;
		gap: 60px;

		& div {
			max-width: 330px;
			width: 100%;
		}
	}

	&-buttons {
		display: flex;
		gap: 16px;

		@media screen and (max-width: 1980px) {
			flex-direction: column;
		}
	}

	&::after {
		position: absolute;
		top: 0;
		left: 0;
		content: '';
		width: 4px;
		height: 100%;
		background: rgb(var(--v-theme-primary));
	}

	@media (max-width: 1780px) {
		align-items: flex-start;
		flex-direction: column;

		&-info {
			align-items: flex-start;
			flex-direction: column;
			gap: 20px;
		}

		&-buttons {
			margin: 20px 0 0;
			flex-direction: column;
			gap: 20px;
		}
	}
}

.speakers {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 20px 16px;

	@media (max-width: 2200px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (max-width: 900px) {
		grid-template-columns: 1fr;
	}

	&__speaker {
		display: flex;
		align-items: flex-start;
	}

	& .speaker {
		&__avatar {
			width: 100%;
			height: 100%;

			&-wrapper {
				display: flex;
				align-items: center;
				justify-content: center;
				min-width: 44px;
				max-width: 44px;
				min-height: 44px;
				max-height: 44px;
				border-radius: 50px;
				overflow: hidden;
			}
		}
	}
}
.tags {
	display: flex;
	flex-wrap: wrap;
	gap: 12px;
	& .tag {
		width: fit-content;
		box-sizing: border-box;
		padding: 6px 10px;

		font-family: var(--text-font);
		font-weight: 400;
		font-style: normal;
		font-size: 14px;
		line-height: 16px;
		color: var(--text-secondary-color);

		border-radius: 12px;
		background: rgb(var(--v-theme-background-secondary));
	}
}

.expanded-block {
	&__description {
		display: grid;
		grid-template-columns: minmax(70px, 85px) 1fr;
		gap: 20px;
		align-items: baseline;
	}
	& .speakers {
		display: flex;
		flex-direction: column;
		margin: 16px 0 0 106px;
	}
}

.event-player {
	aspect-ratio: 16/9;
  &__player {
		width: 100%;
		height: 100%;

  }
}

.event-player .plyr audio, .event-player .plyr iframe, .event-player .plyr video, .event-player .plyr__poster {
	height: auto !important;
	aspect-ratio: 16/9;
}

.event-carousel {
	position: relative;
}

.event-carousel .v-carousel {
	position: static;
}

.event-carousel .v-window__container {
	border-radius: 16px;
	overflow: hidden;
}

.event-carousel .v-carousel__controls {
	bottom: -50px;
	border-radius: 8px;
	overflow: hidden;
}
.mt82 {
	margin-top: 82px;
}
</style>
