<template>
	<page-layout class="media-layout" :aside="false" :no-sticky="true">
		<template #header>
			<app-header class="media-layout__header" heading="Яндекс" :breadcrumbs="breadcrumbs" />
		</template>
		<template #main>
			<template v-if="getDataLoadingStatus">
				<div class="article-layout__main-content">
					<BaseSkeletonPath :width="'100%'" :height="350" />
					<section class="mt-8 d-flex flex-column gap-2">
						<BaseSkeletonPath :width="'100%'" :height="16" />
						<BaseSkeletonPath :width="'100%'" :height="16" />
						<BaseSkeletonPath :width="'80%'" :height="16" />
					</section>
				</div>
			</template>
			<template v-else>
				<div class="article-layout__main-content">
					<app-media-card class="article-layout__media-preview" :img="getSponsorData.banner || ''" :badges="[]" />
					<h4 class="headers-4 | mt-8">
						О КОМПАНИИ
					</h4>
					<div class="mt-8">
						<img :src="`${getSponsorData.logo_large}`" :alt="`${getSponsorData.name}`">
					</div>
					<section v-html="getSponsorData?.description" class="mt-8" />
					<div v-if="isShowBlockquote" class="mt-8 event__blockquote">
						<div class="event__blockquote-info">
							<div v-if="getSponsorData.address">
								<div class="caption-2-regular | text-gray800">Адрес</div>
								<div class="caption-1-regular | mt-2 text-gray900">{{ getSponsorData.address }}</div>
							</div>
							<div v-if="getSponsorData.phone">
								<div class="caption-2-regular | text-gray800">{{ t('Telephone') }}</div>
								<div class="caption-1-regular | mt-2 text-gray900">{{ getSponsorData.phone }}</div>
							</div>
							<div v-if="getSponsorData.email">
								<div class="caption-2-regular | text-gray800">Email</div>
								<div class="caption-1-regular | mt-2 text-gray900">{{ getSponsorData.email }}</div>
							</div>
						</div>
					</div>
					<template v-if="getSponsorData.courses">
						<div class="mt-8 d-flex align-center justify-space-between">
							<h4 class="headers-4">
								Треки Компании
							</h4>
							<router-link class="recommended-media__link" to="/education/courses">
								Открыть все
							</router-link>
						</div>
						<div class="mt-8 cards-wrapper">
							<app-course-card v-for="card in getSponsorData.courses.slice(0, 2)" :key="card.id"
								class="education-layout__card" :image="card.image" :tags="card.tags" :name="card.name"
								:color-scheme="card.colorScheme" :modules-count="card.modulesCount"
								@click="cardCoursesClickHandler(card)" />
						</div>
					</template>
					<template v-if="getSponsorData.modules">
						<div class="mt-8 d-flex align-center justify-space-between">
							<h4 class="headers-4">
								Доклады Компании
							</h4>
							<router-link class="recommended-media__link" to="/education/modules">
								Открыть все
							</router-link>
						</div>
						<div class="mt-8 cards-wrapper">
							<app-module-card v-for="card in getSponsorData.modules.slice(0, 2)" :key="card.id"
								class="education-layout__card" :image="card.image" :tags="card.tags" :name="card.name"
								:color-scheme="card.colorScheme" :downloadable-materials="card.hasDownloadableMaterials"
								:viewable-materials="card.hasViewableMaterials" @click="cardModulesClickHandler(card)" />
						</div>
					</template>
					<the-recommended-media-layout v-if="dashboardStore.getMedia" :media="dashboardStore.getMedia"
						class="mt-8" />
				</div>
			</template>
		</template>
	</page-layout>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { useUtilsStore } from '@/stores/utils'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import PageLayout from '@/views/layouts/PageLayout.vue'
import AppMediaCard from '@/components/AppMediaCard.vue'
import AppHeader from '@/components/AppHeader.vue'
import TheRecommendedMediaLayout from '@/components/TheRecommendedMediaLayout.vue'
import AppCourseCard from '@/components/materials/AppCourseCard.vue'
import AppModuleCard from '@/components/materials/AppModuleCard.vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const route = useRoute()
const dashboardStore = useDashboardStore()
const { getDataLoadingStatus, getSponsorData } = storeToRefs(useUtilsStore())

onMounted(async () => {
	await dashboardStore.fetchDashboardData()
	await useUtilsStore().fetchSponsor(route?.params?.id)
})

const breadcrumbs = [
	{
		name: t('Home'),
		url: '/main',
	},
	{
		name: 'Спонсор',
		url: '',
	},
]

const isShowBlockquote = computed(() => getSponsorData.value.phone || getSponsorData.value.email || getSponsorData.value.address)

const router = useRouter()
const cardModulesClickHandler = (card) => {
	if (!card.id) {
		console.warn('Отсутствует id')
		return
	}
	router.push(`/education/module/${card.id}`)
}

const cardCoursesClickHandler = (card) => {
	if (!card.id) {
		console.warn('Отсутствует id')
		return
	}
	router.push(`/education/course/${card.id}`)
}
</script>

<style lang="scss" scoped>
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
	}

	&-buttons {
		display: flex;
		gap: 16px;
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

	@media (max-width: 1500px) {
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

.cards-wrapper {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 30px;

	@media screen and (max-width: 1439px) {
		grid-template-columns: 1fr;
	}
}
</style>