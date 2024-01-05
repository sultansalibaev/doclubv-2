<template>
	<PageLayout :aside="false" :no-sticky="true">
		<template #header>
			<AppHeader :breadcrumbs="breadcrumbs" heading="Favorites" />
		</template>
		<template #main>
			<div class="favorites-page">
				<div v-if="favoritesStore.getDataLoadingStatus">
					<div class="filters-block">
						<BaseSkeletonPath :width="68" :height="44" />
						<!--						<BaseSkeletonPath :width="319" :height="44"/>-->
					</div>
					<div class="favorites-block">
						<h4 class="headers-4 | mt-8 text-gray900">Доклады</h4>
						<div class="favorites-block__cards">
							<BaseSkeletonPath v-for="skelet in 3" :key="skelet" :width="'100%'" :height="190" />
						</div>
					</div>
					<div class="favorites-block">
						<h4 class="headers-4 | mt-8 text-gray900">Рекомендуемые медиа</h4>
						<div class="favorites-block__cards">
							<BaseSkeletonPath v-for="skelet in 3" :key="skelet" :width="'100%'" :height="190" />
						</div>
					</div>
					<div class="favorites-block">
						<h4 class="headers-4 | mt-8 text-gray900">Треки</h4>
						<div class="favorites-block__cards">
							<BaseSkeletonPath v-for="skelet in 3" :key="skelet" :width="'100%'" :height="190" />
						</div>
					</div>
				</div>
				<template v-else>
					<div class="filters-block">
						<AppTabsList :tabs="tabs" :opened-tab="currentTab" @change="tabChangeHandler" />
						<!--						<AppSearch/>-->
					</div>
					<template v-if="selectedTab === '/all' && !getAllFavoritesList.length">
						<h4 class="headers-4 | mt-8 text-gray900">Ваш список избранных пуст</h4>
					</template>
					<div v-if="selectedTab === '/all' || selectedTab === '/education'" class="favorites-block">
						<template v-if="modules?.results?.length">
							<h4 class="headers-4 | mt-8 text-gray900">Доклады</h4>
							<div class="favorites-block__cards">
								<app-module-card v-for="card in modules?.results" :key="card.id"
									class="education-layout__card" :image="card?.object?.image" :tags="card?.object?.tags"
									:name="card?.object?.name" :color-scheme="card?.object?.color_scheme"
									:downloadable-materials="card?.object?.has_downloadable_materials"
									:viewable-materials="card?.object?.has_viewable_materials"
									@click="cardModulesClickHandler(card?.object?.id)" />
							</div>
							<div class="favorites-block__footer">
								<BasePagination :length="paginationLength(modules?.count)" :current-page="modules?.page"
									:has-next-button="!!modules?.next" :next-button-text="'Далее'"
									:has-prev-button="!!modules?.previous" :prev-button-text="'Назад'"
									@on-next-page="favoritesStore.fetchFavoritesModules(getPage(modules?.next))"
									@on-change-page="favoritesStore.fetchFavoritesModules($event)"
									@on-prev-page="favoritesStore.fetchFavoritesModules(getPage(modules?.previous))" />
							</div>
						</template>
						<template v-else-if="selectedTab === '/modules'">
							<h4 class="headers-4 | mt-8 text-gray900">Ваш список избранных докладов пуст</h4>
						</template>
					</div>
					<div v-if="selectedTab === '/all' || selectedTab === '/media'" class="favorites-block">
						<template v-if="articles?.results?.length">
							<h4 class="headers-4 | mt-8 text-gray900">Рекомендуемые медиа</h4>
							<div class="favorites-block__cards">
								<router-link v-for="card in articles?.results" :key="card?.id"
									:to="`/media/${card?.object?.id}`" class="media-layout__card-link">
									<app-media-card class="media-layout__media-card" :viewed="card?.object?.viewed"
										:topic="card?.object?.name" :img="card?.object?.image"
										:badges="badgesText(card?.object?.tags)" />
								</router-link>
							</div>
							<div class="favorites-block__footer">
								<BasePagination :length="paginationLength(articles?.count)" :current-page="articles?.page"
									:has-next-button="!!articles?.next" :next-button-text="'Далее'"
									:has-prev-button="!!articles?.previous" :prev-button-text="'Назад'"
									@on-next-page="favoritesStore.fetchFavoritesArticles(getPage(articles?.next))"
									@on-change-page="favoritesStore.fetchFavoritesArticles($event)"
									@on-prev-page="favoritesStore.fetchFavoritesArticles(getPage(articles?.previous))" />
							</div>
						</template>
						<template v-else-if="selectedTab === '/media'">
							<h4 class="headers-4 | mt-8 text-gray900">Ваш список избранных медиа пуст</h4>
						</template>
					</div>
					<div v-if="selectedTab === '/all' || selectedTab === '/courses'" class="favorites-block">
						<template v-if="courses?.results?.length">
							<h4 class="headers-4 | mt-8 text-gray900">Треки</h4>
							<div v-if="courses?.results?.length" class="favorites-block__cards">
								<app-course-card v-for="card in courses?.results" :key="card.id"
									class="education-layout__card" :image="card?.object?.image" :tags="card?.object?.tags"
									:name="card?.object?.name" :color-scheme="card?.object?.color_scheme"
									:modules-count="card?.object?.modules_count"
									@click="cardCoursesClickHandler(card?.object?.id)" />
							</div>
							<div class="favorites-block__footer">
								<BasePagination :length="paginationLength(courses?.count)" :current-page="courses?.page"
									:has-next-button="!!courses?.next" :next-button-text="'Далее'"
									:has-prev-button="!!courses?.previous" :prev-button-text="'Назад'"
									@on-next-page="favoritesStore.fetchFavoritesCourses(getPage(courses?.next))"
									@on-change-page="favoritesStore.fetchFavoritesCourses($event)"
									@on-prev-page="favoritesStore.fetchFavoritesCourses(getPage(courses?.previous))" />
							</div>
						</template>
						<template v-else-if="selectedTab === '/courses'">
							<h4 class="headers-4 | mt-8 text-gray900">Ваш список избранных треков пуст</h4>
						</template>
					</div>
					<!--                <div v-if="selectedTab === '/all' || selectedTab === '/events'" class="favorites-block">-->
					<!--                    <h4 class="headers-4 | mt-8 text-gray900">Мероприятия</h4>-->
					<!--                    <div class="favorites-block__cards">-->
					<!--                        					<AppAnnouncementCard-->
					<!--                        						v-for="(announcement, index) in modulesEvents"-->
					<!--                        						:key="index"-->
					<!--                        						:tags="announcement.tags"-->
					<!--                        						:name="announcement.name"-->
					<!--                        						:badges="announcement.badges"-->
					<!--                        						:link="announcement.link"-->
					<!--                        						@on-button-click="router.push(`/events/${$event}`)"-->
					<!--                        					/>-->
					<!--                    </div>-->
					<!--                    <div class="favorites-block__footer">-->
					<!--                        <BasePagination :length="3" @on-change-page="changePage($event)" has-next-button :next-button-text="'Далее'"  has-prev-button :prev-button-text="'Назад'" />-->
					<!--                    </div>-->
					<!--                </div>-->
				</template>
			</div>
		</template>
	</PageLayout>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import AppHeader from '@/components/AppHeader.vue'
import PageLayout from '@/views/layouts/PageLayout.vue'
import AppSearch from '@/components/AppSearch.vue'
import AppTabsList from '@/components/AppTabsList.vue'

import { useFavoritesStore } from '@/stores/favorites'
import { useRoute, useRouter } from 'vue-router'
import AppModuleCard from '@/components/materials/AppModuleCard.vue'
import AppCourseCard from '@/components/materials/AppCourseCard.vue'
import AppMediaCard from '@/components/AppMediaCard.vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const router = useRouter()
const route = useRoute()

const {
	getAllFavoritesList,
	getFavoritesArticles,
	getFavoritesModules,
	getFavoritesCourses,
	getDataLoadingStatus,
} = storeToRefs(useFavoritesStore())
const favoritesStore = useFavoritesStore()

onMounted(() => {
	favoritesStore.fetchFavoritesList()
})

const breadcrumbs = [
	{
		name: t('Home'),
		url: '/main',
	},
	{
		name: t('Personal account'),
		url: '/personal',
	},
	{
		name: t('Favorites'),
		url: '',
	},
]

const selectedTab = ref('/all')

const tabs = [
	{
		name: t('All'),
		url: '/all',
	},
	{
		name: t('Lessons'),
		url: '/education',
	},
	{
		name: t('News'),
		url: '/media',
	},
	{
		name: t('Courses'),
		url: '/courses',
	},
	// {
	//     name: 'Мероприятия',
	//     url: '/events',
	// },
]
const currentTab = computed(() => `/${route.params.type}`)

const articles = ref(getFavoritesArticles)
const courses = ref(getFavoritesCourses)
const modules = ref(getFavoritesModules)

const cardModulesClickHandler = (id) => {
	if (!id) {
		console.warn('Отсутствует id')
		return
	}
	router.push(`/education/module/${id}`)
}

const cardCoursesClickHandler = (id) => {
	if (!id) {
		console.warn('Отсутствует id')
		return
	}
	router.push(`/education/course/${id}`)
}

const changePage = (page) => console.log(`You change page to ${page}`)

const badgesText = (badges) => badges.map((item) => item.name)

const tabChangeHandler = (url) => {
	selectedTab.value = url
	router.push(`/favorites${url}`)
}

const paginationLength = (count) => Math.ceil(count / 3)
const getPage = (link) => link.split('?page=')[1]
</script>

<style lang="scss" scoped>
.favorites-page {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
}

.filters-block {
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: center;
	gap: 20px;
}

.favorites-block {
	&__cards {
		margin: 32px 0 0;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 30px;

		@media (max-width: 2200px) {
			grid-template-columns: repeat(3, 1fr);
		}

		@media (max-width: 1920px) {
			grid-template-columns: repeat(2, 1fr);
		}

		@media (max-width: 1200px) {
			grid-template-columns: 1fr;
		}
	}

	&__footer {
		margin: 32px 0 0;
		display: flex;
		align-items: center;
		gap: 30px;

		@media (max-width: 1200px) {
			align-items: flex-start;
			flex-direction: column;
			gap: 15px;
		}
	}
}
</style>
color_scheme:"L"
id:2
image:null
is_favorite:true
modules_count:2
name:"A/B - тесты. Все доклады в одном месте"
tags:[{id: 8, name: "Аналитика", label: "Аналитика"},…]
themes:[]
type:"course"

color_scheme:"L"
id:2
image:null
is_favorite:true
modules_count:2
name:"A/B - тесты. Все доклады в одном месте"
tags:[{id: 8, name: "Аналитика", label: "Аналитика"},…]
themes:[]
type:"course"
