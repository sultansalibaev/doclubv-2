<template>
	<player-layout class="module-layout" :has-timecodes="getModuleInfo?.timecodes?.length > 0">
		<template #header>
			<app-header
				class="module-layout__header"
				heading="Education"
				:breadcrumbs="moduleStore.getBreadcrumbs"
			/>
		</template>
		<template #player>
			<template v-if="getDataLoadingStatus">
				<BaseSkeletonPath
						width="100%"
						height="100%"
						class="skeleton__main"
				/>
			</template>
			<div v-else-if="getModuleInfo?.video_link">
				<app-player
						:src="getModuleInfo?.video_link"
						:time="videoTime"
						class="module-layout__video-player"
				/>
				<the-video-navigation
						v-if="getModuleInfo?.timecodes?.length > 0"
						class="module-layout__mobile-video-nav"
						:timestamps="getModuleInfo?.timecodes"
						@time-change="videoTimeChangeHandler($event)"
				/>
			</div>
		</template>
		<template #timecodes v-if="getModuleInfo?.timecodes?.length > 0">
			<the-video-navigation
					v-if="getModuleInfo?.timecodes?.length > 0"
					class="module-layout__video-nav"
					:timestamps="getModuleInfo?.timecodes"
					@time-change="videoTimeChangeHandler($event)"
			/>
		</template>
		<template #main>
			<div class="module-layout__main-content" v-if="getModuleInfo">
				<div class="module-layout__speakers-wrapper">
					<app-speakers-info
						class="module-layout__speakers-info"
						v-if="getModuleInfo.lectors.length > 0"
						:speakers="getModuleInfo.lectors"
					/>
					<div class="module-layout__speakers-buttons">
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
							:text="getModuleInfo?.is_favorite ? 'В избранном' : 'В избранное'"
							:theme="'outline'"
							:append-inner="!favoritesStore.getDataLoadingStatus"
							@click="
								getModuleInfo?.is_favorite
									? favoritesStore.deleteModuleFromFavoritesList(id)
									: favoritesStore.addModuleToFavoritesList(id)
							"
						>
							<template #append-inner>
								<img
									v-if="getModuleInfo?.is_favorite"
									src="@/assets/icons/icon-heart-blue-filled.svg"
									alt=""
								/>
								<img v-else src="@/assets/icons/icon-heart.svg" alt="" />
							</template>
						</AppButton>
					</div>
				</div>
				<h3 class="module-layout__course-heading" v-if="getModuleInfo">
					{{ getModuleInfo.name }}
				</h3>
				<p class="module-layout__course-desc" v-if="getModuleInfo">
					{{ getModuleInfo.description }}
				</p>
				<ul class="module-layout__tags-list" v-if="getModuleInfo">
					<li class="module-layout__tag" v-for="(badge, index) in getModuleInfo.tags" :key="index">
						<app-badge class="module-card__badge" :text="badge.name" theme="grey" />
					</li>
				</ul>
				<section
						class="module-layout__navigation navigation"
						v-if="
							getModuleInfo['downloadable_materials'].length > 0
							|| getModuleInfo['viewable_materials'].length > 0
							|| getModuleInfo['chat_link']
						"
				>
					<h3 class="navigation__heading">Материалы модуля</h3>
					<ul class="navigation__list">
						<li class="navigation__item" v-if="getModuleInfo['downloadable_materials'].length > 0">
							<app-navigation-card
								:desc="downloadCardText"
								class="navigation__card"
								theme="materials"
								heading="Материалы"
								button="Скачать"
								@click="isShowDownloadableMaterials = true"
							/>
						</li>
						<li class="navigation__item" v-if="getModuleInfo['viewable_materials'].length > 0">
							<app-navigation-card
								:desc="presentationCardText"
								class="navigation__card"
								theme="presentation"
								heading="Презентация"
								button="Посмотреть"
								@click="isShowViewableMaterials = true"
							/>
						</li>
						<li class="navigation__item" v-if="getModuleInfo['chat_link']">
							<app-navigation-card
								class="navigation__card"
								theme="chat"
								heading="Обсудить в чате"
								button="Перейти в чат"
								@click="openChat(getModuleInfo.chat_link)"
							/>
						</li>
					</ul>
				</section>
				<router-link
						v-if="getModuleInfo?.sponsor?.id"
						:to="`/education/sponsor/${getModuleInfo?.sponsor?.id | 1}`"
						class="text-decoration-none mt-8"
				>
					<app-workshop-widget :sponsor-info="useUtilsStore().getSponsorData" />
				</router-link>
				<the-materials-modal
					class="navigation__materials-modal"
					v-if="materialsModalOpened"
					:materials="getModuleInfo.downloadable_materials"
					@close="materialsCardClickHandler"
				/>
				<app-parent-course
						class="module-layout__parent-course"
						v-if="getModuleInfo['parent_course']"
						:name="getModuleInfo['parent_course'].name"
						:id="1"
				/>
				<the-recommended-media-layout
						class="module-layout__media-layout"
						v-if="dashboardStore.getMedia"
						:media="dashboardStore.getMedia"
				/>
				<BaseModal
						:show-modal="isShowDownloadableMaterials"
						:max-width="400"
						:title="'Скачать материалы'"
						@on-close="isShowDownloadableMaterials = false"
				>
					<div class="modal">
						<div :class="['modal-list', getModuleInfo.downloadable_materials.length > 4 ? 'modal-list--withScroll' : '']">
							<div
									v-for="material in getModuleInfo.downloadable_materials"
									:key="material.id"
									class="modal-list__item"
							>
								<div>
									<p class="caption-2-medium">
										{{ material.name }}
									</p>
									<p class="small-regular | mt-2">
										{{ material.file_extension }}
									</p>
								</div>
								<div @click="downloadMaterial(material)">
									<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
									>
										<path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M19.3719 15.2V18.9C19.3719 19.6 19.0719 20.2 18.5719 20.7C18.0719 21.2 17.4719 21.5 16.7719 21.5H6.77187C6.07187 21.5 5.47187 21.2 4.97187 20.7C4.47187 20.2 4.17188 19.6 4.17188 18.9V15.2C4.17188 14.7 4.57187 14.3 5.07187 14.3C5.57187 14.3 5.97187 14.7 5.97187 15.2V18.9C5.97187 19.1 6.07187 19.3 6.17188 19.4C6.37188 19.6 6.47187 19.6 6.67188 19.6H16.6719C16.8719 19.6 17.0719 19.5 17.1719 19.4C17.2719 19.3 17.3719 19.1 17.3719 18.9V15.2C17.3719 14.7 17.7719 14.3 18.2719 14.3C18.9719 14.3 19.3719 14.7 19.3719 15.2Z"
												fill="#5C34F6"
										/>
										<path
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M15.7719 12L12.4719 15.3C12.2719 15.5 12.0719 15.6 11.8719 15.6C11.5719 15.6 11.3719 15.5 11.1719 15.3L7.87187 12C7.47187 11.6 7.47187 11.1 7.87187 10.7C8.17187 10.4 8.77187 10.4 9.17188 10.7L10.9719 12.5V3.9C10.9719 3.4 11.3719 3 11.8719 3C12.3719 3 12.7719 3.4 12.7719 3.9V12.6L14.5719 10.8C14.8719 10.5 15.4719 10.5 15.8719 10.8C16.0719 11.1 16.0719 11.6 15.7719 12Z"
												fill="#5C34F6"
										/>
									</svg>
								</div>
							</div>
						</div>
						<AppButton v-if="getModuleInfo.downloadable_materials.length > 1" class="modal-button" theme="primary" text="Скачать всё" @click="downloadAll()" />
					</div>
				</BaseModal>
				<BaseModal
						:show-modal="isShowViewableMaterials"
						:max-width="400"
						:title="'Посмотреть материалы'"
						@on-close="isShowViewableMaterials = false"
				>
					<div class="modal">
						<div class="modal-list">
							<div
									v-for="material in getModuleInfo?.viewable_materials"
									:key="material.id"
									class="modal-list__item"
									@click="showPresentation(material)"
							>
								<div>
									<p class="caption-2-medium">
										{{ material?.name }}
									</p>
									<p class="small-regular | mt-2">
										{{ material?.file_extension }}
									</p>
								</div>
								<span>
									<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M15.8281 12C15.8281 12.3 15.7281 12.5 15.5281 12.7L9.52812 18.7C9.32812 18.8 9.12812 19 8.82812 19C8.52812 19 8.32813 18.9 8.12813 18.7C7.92813 18.5 7.82812 18.3 7.82812 18C7.82812 17.7 7.92813 17.5 8.12813 17.3L13.4281 12L8.12813 6.7C7.82813 6.3 7.82813 5.7 8.12813 5.3C8.42813 4.9 9.12813 4.9 9.42813 5.3L15.4281 11.3C15.6281 11.5 15.8281 11.8 15.8281 12Z" fill="#4C4C4C"/>
									</svg>
								</span>
							</div>
						</div>
						<AppButton class="modal-button" theme="outline" text="Закрыть" @click="isShowViewableMaterials = false" />
					</div>
				</BaseModal>
				<BaseModal
						:show-modal="isShowPresentation"
						:max-width="1050"
						:title="presentationData?.material_name || 'Презентация'"
						@on-close="closePresentation()"
				>
					<div class="presentation">
						<div class="presentation__img-wrapper">
							<img
									:src="presentationData?.pages[fileIndex]?.file"
									:alt="presentationData?.pages[fileIndex]?.file"
									class="presentation__img"
							/>
						</div>
						<div class="presentation__buttons mt-6">
							<AppButton
									:disabled="fileIndex === 0"
									theme="outline"
									text="Назад"
									@click="fileIndex--"
							/>
							<AppButton
									:disabled="fileIndex === presentationData.pages.length - 1"
									theme="outline"
									text="Вперёд"
									@click="fileIndex++"
							/>
						</div>
					</div>
				</BaseModal>
				<app-share-modal
					class="course-layout__share-modal"
					:url="route.fullPath"
					v-if="shareModalOpened"
					@modal-close="shareModalCloseHandler"
				/>
			</div>
		</template>
		<template #aside>
			<template v-if="getDataLoadingStatus">
				<BaseSkeletonPath
						:width="`100%`"
						class="skeleton__aside"
				/>
			</template>
			<template v-else-if="getRecommendations.length > 0">
				<div class="module-layout__aside-content">
					<h3 class="module-layout__aside-heading">Рекомендации</h3>
					<ul class="module-layout__modules-list">
						<li
								class="module-layout__modules-item"
								v-for="(module, index) in getRecommendations"
								:key="index"
						>
							<app-module-card
									class="module-layout__announcement"
									:image="module?.image"
									:tags="module?.tags"
									:name="module?.name"
									:color-scheme="module?.color_scheme || null"
									:downloadable-materials="module?.has_downloadable_materials || null"
									:viewable-materials="module?.has_viewable_materials || null"
									@click="cardModulesClickHandler(module.id)"
							/>
						</li>
					</ul>
				</div>
			</template>
			<the-recommended-media-layout
					class="module-layout__media-layout module-layout__media-layout--mobile"
					v-if="dashboardStore.getMedia"
					:media="dashboardStore.getMedia"
			/>
		</template>
	</player-layout>
</template>

<script setup>
import PlayerLayout from './layouts/PlayerLayout.vue'
import AppHeader from '../components/AppHeader.vue'
import AppSpeakersInfo from '../components/AppSpeakersInfo.vue'
import AppBadge from '../components/AppBadge.vue'
import AppModuleCard from '../components/materials/AppModuleCard.vue'
import AppNavigationCard from '../components/AppNavigationCard.vue'
import TheVideoNavigation from '../components/module/TheVideoNavigation.vue'
import TheMaterialsModal from '../components/module/TheMaterialsModal.vue'
import AppPlayer from '../components/module/AppPlayer.vue'
import AppButton from '@/components/AppButton.vue'
import AppShareModal from '@/components/AppShareModal.vue'
import TheRecommendedMediaLayout from '@/components/TheRecommendedMediaLayout.vue'
import AppParentCourse from '@/components/AppParentCourse.vue'

import 'vue-plyr/dist/vue-plyr.css'

import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useFavoritesStore } from '@/stores/favorites'
import { useModuleStore } from '@/stores/module'
import { useUtilsStore } from '@/stores/utils'
import { useDashboardStore } from '@/stores/dashboard'
import AppWorkshopWidget from '@/components/AppWorkshopWidget.vue'

const isShowDownloadableMaterials = ref(false)
const isShowViewableMaterials = ref(false)
const isShowPresentation = ref(false)

const presentationData = ref({})
const fileIndex = ref(0)
const showPresentation = async (material) => {
	if (!material?.presentation?.pages.length) return

	presentationData.value = material?.presentation
	isShowViewableMaterials.value = false
	isShowPresentation.value = true

	if (!material.done) await moduleStore.fetchModulePoint(getModuleInfo.value.id, material?.id)
}
const closePresentation = () => {
	presentationData.value = {}
	isShowPresentation.value = false
	isShowViewableMaterials.value = true
}

const favoritesStore = useFavoritesStore()
const moduleStore = useModuleStore()
const dashboardStore = useDashboardStore()
const router = useRouter()
const route = useRoute()

const materialsModalOpened = ref(false)

const id = computed(() => route.params.id)

const { getModuleInfo, getRecommendations, getDataLoadingStatus } = storeToRefs(moduleStore)

const videoTime = ref(0)

const shareModalOpened = ref(false)

const cardModulesClickHandler = async (moduleId) => {
	if (Number(moduleId) === Number(id.value)) return
	else {
		await router.push(`/education/module/${moduleId}`)
		await moduleStore.updateModuleInfo(id.value)
	}
}

const materialsCardClickHandler = () => {
	// materialsModalOpened.value = !materialsModalOpened.value
	isShowDownloadableMaterials.value = true
}

const videoTimeChangeHandler = (time) => videoTime.value = time

const shareButtonClickHandler = () => shareModalOpened.value = true

const shareModalCloseHandler = () => shareModalOpened.value = false

const getSponsor = async (id) => 	{ if (id) await useUtilsStore().fetchSponsor(id) }

const downloadAll = () => {
	let link = document.createElement('a')
	link.setAttribute('href',getModuleInfo?.value?.materials_archive)
	link.setAttribute('download','download')
	link.setAttribute('target','_blank')
	link.click()
	link.remove()
}

const downloadMaterial = async (material) => {
	let link = document.createElement('a')
	link.setAttribute('href', material.file)
	link.setAttribute('download','download')
	link.setAttribute('target','_blank')
	link.click()
	link.remove()

	await moduleStore.fetchModulePoint(getModuleInfo.value.id, material.id)
}

const openChat = (chatLink) => {
	let link = document.createElement('a')
	link.setAttribute('href',chatLink)
	link.setAttribute('target','_blank')
	link.click()
	link.remove()
}

onMounted(async () => {
	await moduleStore.updateModuleInfo(id.value)
	await moduleStore.fetchModuleRecommendations(id.value)
	await getSponsor(getModuleInfo.value.sponsor?.id)
	await dashboardStore.fetchDashboardData()
})

const downloadCardText = computed(() => {
	const array = getModuleInfo.value.downloadable_materials
	if (array.filter(item => item.done).length === 0) return 'Не скачано'
	else if (array.filter(item => item.done).length < array.length) return `Скачано (${array.filter(item => item.done).length}/${array.length})`
	else return 'Скачано всё'
})
const presentationCardText = computed(() => {
	const array = getModuleInfo.value.viewable_materials
	if (array.filter(item => item.done).length === 0) return 'Не просмотрено'
	else if (array.filter(item => item.done).length < array.length) return `Просмотрено (${array.filter(item => item.done).length}/${array.length})`
	else return 'Просмотрено всё'
})
</script>

<style scoped lang="scss">
.module-layout {
}

.module-layout__header {
}

.module-layout__video-player {
	padding: 0;
	flex-grow: 1;
}

.module-layout__mobile-video-nav {
	margin: 0;
	padding: 0;
	display: none;

	overflow: auto;
}


.module-layout__video-nav {
	padding: 0;
	flex-shrink: 1;

	overflow: auto;
}

.module-layout__main-content,
.module-layout__aside-content {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
}

.module-layout__main-content {
	z-index: 1;
}

.module-layout__aside-content {
	position: relative;
}

.module-layout__aside-heading {
	margin: 0;

	font-family: var(--headings-font);
	font-weight: 700;
	font-style: normal;
	font-size: 20px;
	line-height: 28px;
	color: var(--text-secondary-color);
}

.module-layout__modules-list {
	position: absolute;
	top: 28px;
	left: 0;
	right: 0;

	margin: 32px 10px 0 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	gap: 30px;

	list-style: none;
}

.module-layout__speakers-buttons {
	display: flex;
	flex-direction: column;
	gap: 8px;

	@media (min-width: 500px) {
		flex-direction: row;
	}
}
.module-layout__speakers-wrapper {
	margin: 0;
	padding: 0;
	width: 100%;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;
}

.module-layout__share-button,
.module-layout__favorite-button {
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
}

.module-layout__share-button::after,
.module-layout__favorite-button::after {
	content: '';
	position: absolute;
	top: calc(50% - 12px);
	right: 20px;

	display: block;
	width: 24px;
	height: 24px;
}

.module-layout__share-button::after {
	background: url('../assets/icons/icon-share.svg') center no-repeat;
}

.module-layout__favorite-button::after {
	background: url('../assets/icons/icon-heart.svg') center no-repeat;
}

.module-layout__course-heading {
	margin: 32px 0 0;

	font-family: var(--headings-font);
	font-weight: 700;
	font-style: normal;
	font-size: 24px;
	line-height: 28px;
	color: var(--headings-color);
	text-transform: uppercase;
}

.module-layout__course-desc {
	margin: 16px 0 0;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 24px;
	color: var(--text-secondary-color);
	white-space: pre-wrap;
}

.module-layout__tags-list {
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

.module-layout__tag {
	margin: 0;
	display: flex;
}

.module-layout__navigation {
	margin: 32px 0 0;
}

.module-layout__workshop-widget {
	margin: 32px 0 0;
}

.module-layout__parent-course {
	margin-top: 32px;
}

.module-layout__media-layout {
	margin-top: 32px;
}

.module-layout__media-layout--mobile {
	display: none;
}

@media screen and (max-width: 1600px) {
	.module-layout__video-nav {
		width: 300px;
	}
}
@media screen and (max-width: 1440px) {
	.module-layout__video-nav {
		width: 100%;
	}
}

@media screen and (max-width: 1366px) {
	.module-layout__speakers-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 16px;
	}

	.module-layout__speakers-info {
		grid-column: 1 / 3;
	}

	.module-layout__share-button,
	.module-layout__favorite-button {
		margin: 0;
	}
}

@media screen and (max-width: 1440px) {
	.module-layout__mobile-video-nav {
		display: block;
		margin-bottom: 20px;
	}

	.module-layout__video-nav {
		display: none;
	}

	.module-layout__media-layout {
		display: none;
	}

	.module-layout__media-layout--mobile {
		display: block;
	}

	.module-layout__modules-list {
		position: static;

		display: grid;
		grid-template-columns: 1fr 1fr;
	}
}

@media screen and (max-width: 768px) {
	.module-layout__speakers-wrapper {
		display: grid;
		gap: 20px;
		grid-template-columns: 1fr;
	}

	.module-layout__speakers-info {
		grid-column: 1 / 3;
	}

	.module-layout__share-button,
	.module-layout__favorite-button {
		margin-left: 0;
	}
	.module-layout__modules-list {
		grid-template-columns: 1fr;
	}
}

.navigation__list {
	margin: 16px 0 0;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 16px;

	@media screen and (max-width: 1279px) {
		grid-template-columns: 1fr;
	}
}
.navigation__item {
	list-style: none;
}

.modal {
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	&-list {
		display: flex;
		flex-direction: column;
		gap: 20px;
		max-height: 300px;
		height: 100%;

		&--withScroll {
			overflow: scroll;
		}

		&__item {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
	&-button {
		margin: 24px 0 0;
	}
}

.presentation {
	display: flex;
	justify-content: space-between;
	flex-direction: column;

	&__img {
		width: 100%;

		&__wrapper {
			width: 100%;
		}
	}
	&__buttons {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
}

.skeleton__main {
	min-height: 190px;
	max-height: 500px;
	margin-bottom: 32px;
}
.skeleton__aside {
	height: 250px !important;

	@media screen and (max-width: 1440px){
		display: none;
	}
}
</style>
