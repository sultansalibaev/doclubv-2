<template>
	<page-layout class="article-layout" :aside="true">
		<template #header>
			<app-header class="article-layout__header" heading="Медиа" :breadcrumbs="breadcrumbs" />
		</template>
		<template #main>
			<template v-if="mediaStore.getDataLoadingStatus">
				<div class="article-layout__main-content">
					<BaseSkeletonPath :width="'100%'" :height="500" />
					<section class="article-layout__article article gap-2">
						<BaseSkeletonPath :width="'100%'" :height="22" />
						<BaseSkeletonPath :width="'100%'" :height="22" />
						<BaseSkeletonPath :width="'80%'" :height="22" />
					</section>
				</div>
			</template>
			<template v-else>
				<div class="article-layout__main-content">
					<app-media-card class="article-layout__media-preview media-card--big-picture"
						:img="article?.image || ''" :badges="badgesText(article?.tags) || []" />
					<h2 class="headers-2 | mt-8">
						{{ article.name }}
					</h2>
					<section v-html="article.text" class="article-layout__article article" />
					<div class="article__buttons mt-8">
						<AppButton :text="'Поделиться'" :theme="'outline'" append-inner @click="shareButtonClickHandler">
							<template #append-inner>
								<img src="@/assets/icons/icon-share.svg" alt="" />
							</template>
						</AppButton>
						<AppButton :loading="favoritesStore.getDataLoadingStatus"
							:text="article?.is_favorite ? 'В избранном' : 'В избранное'" :theme="'outline'"
							:append-inner="!favoritesStore.getDataLoadingStatus" @click="
								article?.is_favorite
									? favoritesStore.deleteArticleFromFavoritesList(id)
									: favoritesStore.addArticleToFavoritesList(id)
								">
							<template #append-inner>
								<img v-if="article?.is_favorite" src="@/assets/icons/icon-heart-blue-filled.svg" alt="" />
								<img v-else src="@/assets/icons/icon-heart.svg" alt="" />
							</template>
						</AppButton>
					</div>
					<AppShareModal class="course-layout__share-modal" :url="route.fullPath" v-if="shareModalOpened"
						@modal-close="shareModalCloseHandler" />
				</div>
			</template>
		</template>
		<template #aside>
			<template v-if="mediaStore.getDataLoadingStatus">
				<div class="article-layout__aside-content">
					<h3 class="article-layout__aside-heading">Похожие медиа</h3>
					<ul class="article-layout__media-list">
						<li class="article-layout__media-item" v-for="skelet in 3" :key="skelet">
							<BaseSkeletonPath :width="'100%'" :height="240" />
						</li>
					</ul>
				</div>
			</template>
			<div v-else-if="getMediaRecommendations.length" class="article-layout__aside-content">
				<h3 class="article-layout__aside-heading">Похожие медиа</h3>
				<ul class="article-layout__media-list">
					<li class="article-layout__media-item" v-for="(media, index) in getMediaRecommendations" :key="index">
						<app-media-card class="article-layout__media-preview" :img="media?.image" :topic="media?.name"
							:badges="badgesText(media?.tags) || []" :viewed="media?.viewed" />
					</li>
				</ul>
			</div>
		</template>
	</page-layout>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import PageLayout from './layouts/PageLayout.vue'
import AppHeader from '../components/AppHeader.vue'
import AppMediaCard from '../components/AppMediaCard.vue'
import TheNavigationLayout from '../components/TheNavigationLayout.vue'
import AppWorkshopWidget from '../components/AppWorkshopWidget.vue'
import AppButton from '@/components/AppButton.vue'
import { useMediaStore } from '@/stores/media'
import { useFavoritesStore } from '@/stores/favorites'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import AppShareModal from '@/components/AppShareModal.vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const { getMediaArticle, getMediaRecommendations } = storeToRefs(useMediaStore())
const mediaStore = useMediaStore()
const favoritesStore = useFavoritesStore()
const route = useRoute()

onMounted(async () => {
	await mediaStore.fetchMediaArticle(id.value)
	await mediaStore.fetchMediaArticleRecommendations(id.value)
})
const id = computed(() => route?.params?.id)

const article = ref(getMediaArticle)
const badgesText = (badges) => badges?.map((item) => item?.name)
const breadcrumbs = ref([
	{
		name: t('Home'),
		url: '/main',
	},
	{
		name: 'Медиа',
		url: '/media',
	},
	{
		name: '',
		url: '',
	},
])

const shareModalOpened = ref(false)
const shareButtonClickHandler = () => (shareModalOpened.value = true)
const shareModalCloseHandler = () => (shareModalOpened.value = false)
</script>

<style lang="scss">
.media-card--big-picture .media-card__preview-wrapper {
	height: 400px;

	@media screen and (max-width: 1920px) {
		height: 300px;
	}
}

.article-layout__main-content,
.article-layout__aside-content {
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
}

.article-layout__main-content {
	position: sticky;
	bottom: 60px;
}

.article {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;

	&__buttons {
		display: flex;
		flex-direction: column;
		gap: 8px;

		@media (min-width: 500px) {
			flex-direction: row;
		}
	}
}

.article h2 {
	margin: 0;

	font-family: var(--headings-font);
	font-weight: 700;
	font-style: normal;
	font-size: 32px;
	line-height: 40px;
	color: var(--headings-color);
}

.article p {
	margin: 32px 0 0;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 18px;
	line-height: 24px;
	color: var(--text-primaty-color);
}

.article blockquote {
	position: relative;
	box-sizing: border-box;
	margin: 32px 0 0;
	padding: 0 0 0 20px;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: italic;
	font-size: 18px;
	line-height: 24px;
	color: var(--text-secondary-color);
}

.article blockquote::before {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;

	display: block;
	width: 4px;
	height: 100%;

	background: var(--button-primary-default-color);
}

.article h3 {
	margin: 32px 0 0;

	font-family: var(--headings-font);
	font-weight: 700;
	font-style: normal;
	font-size: 20px;
	line-height: 28px;
	color: var(--headings-color);
}

.article ol {
	box-sizing: border-box;
	margin: 16px 0 0;
	padding: 0 0 0 20px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	gap: 15px;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 18px;
	line-height: 24px;
	color: var(--text-secondary-color);
}

.article ul {
	box-sizing: border-box;
	margin: 16px 0 0;
	padding: 0 0 0 20px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	gap: 15px;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 18px;
	line-height: 24px;
	color: var(--text-secondary-color);
}

.article-layout__materials {
	margin: 32px 0 0;
}

.article-layout__workshop {
	margin: 32px 0 0;
}

.article-layout__aside-heading {
	margin: 0;

	font-family: var(--headings-font);
	font-weight: 700;
	font-style: normal;
	font-size: 20px;
	line-height: 28px;
	color: var(--text-secondary-color);
}

.article-layout__media-list {
	margin: 30px 0 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	gap: 30px;

	list-style: none;
}

@media screen and (max-width: 1366px) {
	.article-layout__media-list {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}
}

@media screen and (max-width: 768px) {
	.article-layout__media-list {
		grid-template-columns: 1fr;
	}
}
</style>
