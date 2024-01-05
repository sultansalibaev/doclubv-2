<template>
	<section class="modules">
		<div class="modules__header">
			<h3 class="modules__heading">{{ t('Lessons') }}</h3>
		</div>
		<template v-if="loading">
			<ul class="modules__list mt-8">
				<li class="modules__item" v-for="skelet in 2" :key="skelet">
					<BaseSkeletonPath
						:width="'100%'"
						:height="216"
					/>
				</li>
			</ul>
		</template>
		<template v-else>
			<div class="modules__list-wrapper" v-if="modules.length > 0">
				<ul class="modules__list">
					<li class="modules__item" v-for="(module, index) in modules" :key="index">
						<app-module-card
							:viewable-materials="module?.viewable_materials ? module.viewable_materials : null"
							:downloadable-materials="module?.downloadable_materials ? module.downloadable_materials : null"
							:color-scheme="module?.color_scheme ? module.color_scheme : 'L'"
							:name="module['name']"
							:tags="module['tags']"
							:image="module['image']"
							@click="moduleCardClickHandler(module['id'])"
						/>
					</li>
				</ul>
				<BasePagination
					class="modules__pagination"
					:length="pagesCount"
					:current-page="dashboardStore.getModulesPaginationCurrentPage"
					:has-next-button="!!dashboardStore?.getModulesPaginationNextLink"
					:next-button-text="'Далее'"
					:has-prev-button="!!dashboardStore?.getModulesPaginationPrevLink"
					:prev-button-text="'Назад'"
					@on-next-page="dashboardStore.fetchModules(getPage(dashboardStore.getModulesPaginationNextLink))"
					@on-change-page="dashboardStore.fetchModules($event)"
					@on-prev-page="dashboardStore.fetchModules(getPage(dashboardStore.getModulesPaginationPrevLink))"
				/>
			</div>
			<div v-else class="modules__fallback">{{ t('You haven\'t started studying the reports yet') }}</div>
		</template>
	</section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

import AppModuleCard from '@/components/materials/AppModuleCard.vue'
import BasePagination from '@/components/base/BasePagination.vue'

const props = defineProps({
	modules: {
		required: true,
		type: Array,
	},
	loading: {
		type: Boolean,
		default: false,
	},
})

const router = useRouter()
const dashboardStore = useDashboardStore()

const getPage = (link) => {
	const page = link.split('?page=')[1]
	if (page) return Number(page)
	else return 1
}

const pagesCount = computed(() => Math.ceil(dashboardStore.getModulesTotal / 2))

const moduleCardClickHandler = (id) => router.push(`/education/module/${id}`)

onMounted(() => {
	dashboardStore.fetchModules(1)
})
</script>

<style>
.modules {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}

.modules__header {
	margin: 0;
	padding: 0;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.modules__heading {
	margin: 0;
	padding: 0;

	font-family: var(--headings-font);
	font-weight: 700;
	font-style: normal;
	font-size: 24px;
	line-height: 28px;
	color: var(--headings-font);
}

.modules__link {
	margin: 0;
	padding: 0;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	text-decoration: underline;
	color: var(--links-color);
}

.modules__list-wrapper {
	margin: 32px 0 0;
	padding: 0;
	width: 100%;
}

.modules__list {
	margin: 0;
	padding: 0;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 32px;

	list-style: none;
}

.modules__pagination {
	margin: 32px 0 0;
}

.modules__item {
	margin: 0;
	padding: 0;
	display: flex;
}

.modules__announcement {
	flex-grow: 1;
}

.modules__fallback {
	box-sizing: border-box;
	margin: 32px 0 0;
	padding: 32px;
	align-self: stretch;
	display: flex;
	justify-content: center;
	align-items: center;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 14px;
	line-height: 16px;
	color: var(--text-secondary-color);

	background: var(--background-secondary);
	border-radius: 16px;
}

@media screen and (max-width: 1366px) {
	.modules__list {
		grid-template-columns: 1fr 1fr;
	}
}

@media screen and (max-width: 768px) {
	.modules__list {
		grid-template-columns: 1fr;
	}

	.modules__header {
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.modules__link {
		margin-top: 12px;
	}
}
</style>
