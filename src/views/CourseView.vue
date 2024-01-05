<template>
	<page-layout class="course-layout" :aside="true" :no-sticky="true">
		<template #header>
			<app-header
				v-if="courseStore.getBreadCrumbs"
				class="course-layout__header"
				heading="Education"
				:breadcrumbs="courseStore.getBreadCrumbs.value"
			/>
		</template>
		<template #main>
			<BaseSkeletonPath  v-if="getDataLoadingStatus" :width="`100%`" :height="360" class="mt-4" />
			<template v-else-if="getCourseInfo">
				<div class="course-layout__main-content">
					<app-course-card
							class="course-layout__announcement"
							:image="getCourseInfo.image"
							:tags="getCourseInfo.tags"
							:name="getCourseInfo.name"
							:color-scheme="getCourseInfo.colorScheme"
							:modules-count="getCourseInfo.modules.length"
					/>
					<div class="course-layout__speakers-wrapper">
						<app-speakers-info
								:speakers="getCourseInfo.lectors"
								class="course-layout__speakers-info"
						/>
						<div class="course-layout__speakers-buttons">
							<AppButton
									:text="'Поделиться'"
									:theme="'outline'"
									append-inner
									@click="shareButtonClickHandler"
							>
								<template #append-inner>
									<img src="@/assets/icons/icon-share.svg" alt="" />
								</template>
							</AppButton>
							<AppButton
									:loading="favoritesStore.getDataLoadingStatus"
									:text="getCourseInfo.is_favorite ? 'В избранном' : 'В избранное'"
									:theme="'outline'"
									:append-inner="!favoritesStore.getDataLoadingStatus"
									@click="getCourseInfo.is_favorite ? favoritesStore.deleteCourseFromFavoritesList(id) : favoritesStore.addCourseToFavoritesList(id)"
							>
								<template #append-inner>
									<img
											v-if="getCourseInfo.is_favorite"
											src="@/assets/icons/icon-heart-blue-filled.svg"
											alt=""
									/>
									<img v-else src="@/assets/icons/icon-heart.svg" alt="" />
								</template>
							</AppButton>
						</div>
					</div>
					<h3 class="course-layout__course-heading">
						{{ getCourseInfo.name }}
					</h3>
					<p class="course-layout__course-desc">
						{{ getCourseInfo.description }}
					</p>
					<ul class="course-layout__tags-list">
						<li class="course-layout__tag" v-for="(badge, index) in getCourseInfo.tags" :key="index">
							<app-badge class="module-card__badge" :text="badge.name" theme="grey" />
						</li>
					</ul>
					<app-certificate-download class="course-layout__certificate-download" />
					<router-link
							v-if="getCourseInfo?.sponsor?.id"
							:to="`/education/sponsor/${getCourseInfo?.sponsor?.id | 1}`"
							class="text-decoration-none"
					>
						<app-workshop-widget
								:sponsor-info="useUtilsStore().getSponsorData"
								class="course-layout__workshop-widget"
						/>
					</router-link>
					<app-share-modal
							class="course-layout__share-modal"
							:url="route.fullPath"
							v-if="shareModalOpened"
							@modal-close="shareModalCloseHandler"
					/>
				</div>
			</template>
			<the-recommended-media-layout
					class="course-layout__media-layout"
					v-if="dashboardStore.getMedia"
					:media="dashboardStore.getMedia"
			/>
		</template>
		<template #aside>
			<div class="course-layout__aside-content">
				<h3 class="course-layout__aside-heading">Модули трека</h3>
				<ul class="course-layout__modules-list" v-if="getDataLoadingStatus">
					<li
							class="course-layout__modules-item"
							v-for="skelet in 3"
							:key="skelet"
					>
						<BaseSkeletonPath
								:width="`100%`"
								:height="150"
						/>
					</li>
				</ul>
				<ul class="course-layout__modules-list"  v-else-if="getCourseInfo">
					<li
						class="course-layout__modules-item"
						v-for="(module, index) in getCourseInfo.modules"
						:key="index"
					>
						<app-module-card
							class="course-layout__module"
							:image="module.image"
							:tags="module.tags"
							:name="module.name"
							:color-scheme="module.colorScheme"
							:downloadable-materials="module.hasDownloadableMaterials"
							:viewable-materials="module.hasViewableMaterials"
							@click="moduleCardClickHandler(module.id)"
						/>
					</li>
				</ul>
				<the-recommended-media-layout
						class="course-layout__media-layout course-layout__media-layout--mobile"
						v-if="dashboardStore.getMedia"
						:media="dashboardStore.getMedia"
				/>
			</div>
		</template>
	</page-layout>
</template>

<script setup>
import PageLayout from '@/views/layouts/PageLayout.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppCourseCard from '@/components/materials/AppCourseCard.vue'
import AppModuleCard from '@/components/materials/AppModuleCard.vue'
import AppSpeakersInfo from '@/components/AppSpeakersInfo.vue'
import AppBadge from '@/components/AppBadge.vue'
import AppCertificateDownload from '@/components/AppCertificateDownload.vue'
import AppWorkshopWidget from '@/components/AppWorkshopWidget.vue'
import AppButton from '@/components/AppButton.vue'
import AppShareModal from '@/components/AppShareModal.vue'
import TheRecommendedMediaLayout from '@/components/TheRecommendedMediaLayout.vue'

import { computed, onMounted, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useCourseStore } from '@/stores/course'
import { useUtilsStore } from '@/stores/utils'
import { storeToRefs } from 'pinia'
import { useFavoritesStore } from '@/stores/favorites'
import { useDashboardStore } from "@/stores/dashboard";

const favoritesStore = useFavoritesStore()
const courseStore = useCourseStore()
const dashboardStore = useDashboardStore()
const router = useRouter()
const route = useRoute()

const id = computed(() => {
	return route.params.id
})

const shareModalOpened = ref(false)

const { getCourseInfo, getDataLoadingStatus } = storeToRefs(courseStore)

function moduleCardClickHandler(moduleId) {
	router.push(`/education/module/${moduleId}`)
}

function shareButtonClickHandler() {
	shareModalOpened.value = true
}

function shareModalCloseHandler() {
	shareModalOpened.value = false
}

const getSponsor = async (id) => {
	if (id) await useUtilsStore().fetchSponsor(id)
}

onMounted(async () => {
	await courseStore.updateCourseInfo(id.value)
	await getSponsor(getCourseInfo.value.sponsor.id)
	await dashboardStore.fetchDashboardData()
})
</script>

<style lang="scss">
.course-layout__speakers-buttons {
	display: flex;
	flex-direction: column;
	gap: 8px;

	@media (min-width: 375px) {
		flex-direction: row;
	}
}
.course-layout__main-content,
.course-layout__aside-content {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
}

.course-layout__main-content {
	position: sticky;
	bottom: 60px;
	z-index: 1;
}

.course-layout__announcement {
	pointer-events: none;
}

.course-layout__aside-heading {
	margin: 0;

	font-family: var(--headings-font);
	font-weight: 700;
	font-style: normal;
	font-size: 20px;
	line-height: 28px;
	color: var(--text-secondary-color);
}

.course-layout__modules-list {
	margin: 30px 0 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	gap: 30px;

	list-style: none;
}

.course-layout__modules-item {
	display: flex;
}

.course-layout__module-link {
	text-decoration: none;
}

.course-layout__speakers-wrapper {
	margin: 30px 0 0;
	padding: 0;
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;
}

.course-layout__share-button,
.course-layout__favorite-button {
	position: relative;
	box-sizing: border-box;
	margin: 0 0 0 16px;
	padding: 10px 56px 10px 20px;
	flex-shrink: 0;
	display: flex;
	justify-content: center;
	align-items: center;

	font-family: var(--text-font);
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 20px;
	text-align: center;
	color: var(--text-primaty-color);
	white-space: nowrap;

	border: none;
	border-radius: 5px;
	background: var(--background-secondary);
	cursor: pointer;
	transition: var(--base-transition);
}

.course-layout__share-button:hover,
.course-layout__share-button:focus,
.course-layout__favorite-button:hover,
.course-layout__favorite-button:focus {
	outline: none;
	background: #e7e7ef;
}

.course-layout__share-button::after,
.course-layout__favorite-button::after {
	content: '';
	position: absolute;
	top: calc(50% - 12px);
	right: 20px;

	display: block;
	width: 24px;
	height: 24px;
}

.course-layout__share-button::after {
	background: url('../assets/icons/icon-share.svg') center no-repeat;
}

.course-layout__favorite-button::after {
	background: url('../assets/icons/icon-heart.svg') center no-repeat;
}

.course-layout__module-desc {
	margin: 30px 0 0;
}

.course-layout__course-heading {
	margin: 32px 0 0;

	font-family: var(--headings-font);
	font-weight: 700;
	font-style: normal;
	font-size: 24px;
	line-height: 28px;
	color: var(--headings-color);
	text-transform: uppercase;
}

.course-layout__course-desc {
	margin: 16px 0 0;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 24px;
	color: var(--text-secondary-color);
	white-space: pre-wrap;
}

.course-layout__tags-list {
	margin: 32px 0 0;
	padding: 0;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: center;
	align-content: center;
	gap: 12px;

	list-style: none;
}

.course-layout__tag {
	margin: 0;
	display: flex;
}

.course-layout__certificate-download,
.course-layout__workshop-widget {
	margin: 32px 0 0;
}

.course-layout__media-layout {
	margin-top: 32px;
}

.course-layout__media-layout--mobile {
	display: none;
}

@media screen and (max-width: 1366px) {
	.course-layout__modules-list {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 20px;
	}

	.course-layout__media-layout {
		display: none;
	}

	.course-layout__media-layout--mobile {
		display: block;
	}
}

@media screen and (max-width: 768px) {
	.course-layout__modules-list {
		grid-template-columns: 1fr;
	}

	.course-layout__speakers-wrapper {
		display: grid;
		gap: 20px;
		grid-template-columns: 1fr;
	}

	.course-layout__speakers-info {
		grid-column: 1 / 3;
	}

	.course-layout__share-button,
	.course-layout__favorite-button {
		margin-left: 0;
	}
}

@media screen and (max-width: 500px) {
	.course-layout__share-button,
	.course-layout__favorite-button {
		font-size: 14px;
		line-height: 18px;
	}
}
</style>
