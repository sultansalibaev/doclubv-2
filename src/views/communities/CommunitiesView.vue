<template>
	<page-layout class="communities-layout" :aside="false" :aside-first="false" :no-sticky="true">
		<template #header>
			<app-header class="communities-layout__header" heading="Community" :breadcrumbs="breadcrumbs" />
		</template>
		<template #main>
			<div class="communities-layout__main-content">
				<div class="communities-card__tabs-block">
					<AppTabsList :is-disabled="loadings" :tabs="tabs" :opened-tab="currentTab" @change="tabChangeHandler" />
					<div class="communities-layout__filter-block">
						<div class="communities-layout__filter-button"
							@click="loadings ? false : (showFiltersModal = true)">
							<img src="@/assets/icons/icon-filter.svg" alt="filter icon" />
						</div>
						<BaseInput2 v-model.trim="filters.q" class="communities-layout__filter-search" prepend-inner
							@keydown.enter="handleSearch()">
							<template #prepend-inner>
								<img src="@/assets/icons/icon-search.svg" alt="search icon">
							</template>
						</BaseInput2>
						<AppButton :disabled="!filters.q" :loading="loadings" :text="t('Find')" :theme="'outline'"
							@click="handleSearch()" />
					</div>
				</div>
				<div class="mt-8 communities-card__wrapper">
					<template v-if="loadings">
						<CommunitiesCardSkeleton v-for="i in 3" :key="i" />
					</template>
					<template v-else>
						<template v-if="currentTab === '/all'">
							<template v-if="publishedUsersList.length">
								<CommunitiesCard v-for="member in publishedUsersList" :key="member.id" :member="member"
									@on-open-profile="goTo($event)" @on-open-modal="openModal($event)" />
							</template>
							<template v-else>
								<p class="small-regular | text-gray800">{{ t('List empty') }}</p>
							</template>
						</template>
						<template v-if="currentTab === '/experts'">
							<template v-if="expertsList.length">
								<CommunitiesCard v-for="member in expertsList" :key="member.id" :member="member"
									@on-open-profile="goTo($event)" @on-open-modal="openModal($event)" />
							</template>
							<template v-else>
								<p class="small-regular | text-gray800">{{ t('List empty') }}</p>
							</template>
						</template>
						<template v-if="currentTab === '/mentors'">
							<template v-if="mentorsList.length">
								<CommunitiesCard v-for="member in mentorsList" :key="member.id" :member="member"
									@on-open-profile="goTo($event)" @on-open-modal="openModal($event)" />
							</template>
							<template v-else>
								<p class="small-regular | text-gray800">{{ t('List empty') }}</p>
							</template>
						</template>
					</template>
				</div>
			</div>
			<BaseModal :show-modal="showModal" :max-width="700" :max-height="795"
				:title="'Расскажите нам о своей задаче и мы свяжемся с вами для её решения'" @on-close="closeModal()">
				<form action="#" @submit.prevent>
					<div class="form-block">
						<p class="caption-2-regular | gray-secondary">Имя и Фамилия</p>
						<BaseInput2 v-model.trim="form.name" :disabled="loadings" class="mt-4" />
					</div>
					<div class="mt-4 form-block form-block--duo">
						<div>
							<p class="caption-2-regular | gray-secondary">Email</p>
							<BaseInput2 v-model.trim="form.email" :disabled="loadings" class="mt-4" />
						</div>
						<div>
							<p class="caption-2-regular | gray-secondary">{{ t('Telephone') }}</p>
							<BaseInput2 v-model.trim="form.phone" :disabled="loadings" class="mt-4" inputmode="numeric"
								variant="outlined" v-maska="'### ###-##-##'">
								<template v-slot:prepend-inner>
									<p class="top-05">+7</p>
								</template>
							</BaseInput2>
						</div>
					</div>
					<div class="mt-4 form-block">
						<p class="caption-2-regular | gray-secondary">Задача</p>
						<BaseTextarea v-model="form.description"
							:placeholder="'Чего вы хотите достичь и какой ваш текущий уровень знаний в данном направлении?   '"
							:min-height="120" class="mt-4" />
					</div>
					<p class="body-regular | mt-6 gray-secondary">
						Нажимая на кнопку, я соглашаюсь с
						<a href="https://matemarketing.ru/privacy" target="_blank" class="gray-secondary">политикой
							обработки персональных данных</a>.
					</p>
					<AppButton :disabled="isFormButtonDisabled" theme="primary" text="Отправить" class="mt-6"
						@click="enterForm()" />
				</form>
			</BaseModal>
			<BaseModal :show-modal="showFiltersModal" :max-width="925" :max-height="'auto'" :title="t('Filter')"
				@on-close="showFiltersModal = false">
				<div class="filters-wrapper">
					<div class="filters-block">
						<div>
							<p class="caption-2-regular | text-gray800">
								{{ t('City') }}
							</p>
							<BaseDropdown v-model="filters.city" :placeholder="getFilters?.city?.name || t('Enter city')"
								:items="cities" class="mt-4" @on-reset="filters.city = null" />
						</div>
						<div>
							<p class="caption-2-regular | text-gray800">
								{{ t('Company') }}
							</p>
							<BaseDropdown v-model="filters.work_place"
								:placeholder="getFilters?.specialization?.name || t('Enter company')" :items="workPlaces"
								class="mt-4" @on-reset="filters.work_place = null" />
						</div>
						<div>
							<p class="caption-2-regular | text-gray800">
								{{ t('Specialization') }}
							</p>
							<BaseDropdown v-model="filters.specialization"
								:placeholder="getFilters?.work_place?.name || t('Enter special')" :items="specializations"
								class="mt-4" @on-reset="filters.specialization = null" />
						</div>
					</div>
					<h5 class="headers-5 | mt-10 text-gray900">{{ t('Sort') }}</h5>
					<div class="mt-6">
						<v-radio-group v-model="filters.ordering">
							<v-radio value="fill_percentage" :label="t('By profile completion')" />
							<v-radio value="user__date_joined" :label="t('By registration date')" />
						</v-radio-group>
					</div>
					<div class="d-flex gap-2">
						<BaseChip v-if="filters?.city?.name" clearable @on-clear="filters.city = null">
							{{ filters?.city?.name }}
						</BaseChip>
						<BaseChip v-if="filters?.specialization?.name" clearable @on-clear="filters.specialization = null">
							{{ filters?.specialization?.name }}
						</BaseChip>
						<BaseChip v-if="filters?.work_place?.name" clearable @on-clear="filters.work_place = null">
							{{ filters?.work_place?.name }}
						</BaseChip>
					</div>
					<div class="filters-block__buttons">
						<AppButton :loading="loadings" block theme="outline" :text="t('Clear')"
							@click="resetFilters(), showFiltersModal = false" />
						<AppButton :loading="loadings" block theme="primary" :text="t('Apply')"
							@click="handleSearch(), showFiltersModal = false" />
					</div>
				</div>
			</BaseModal>
		</template>
	</page-layout>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useUtilsStore } from '@/stores/utils'
import { useCommunitiesStore } from '@/stores/communities'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useSnackbar } from '@/composables/snackbar'

import AppTabsList from '@/components/AppTabsList.vue'
import AppButton from '@/components/AppButton.vue'
import AppHeader from '@/components/AppHeader.vue'
import PageLayout from '@/views/layouts/PageLayout.vue'
import CommunitiesCard from '@/views/communities/CommunitiesCard.vue'
import CommunitiesCardSkeleton from '@/views/communities/CommunitiesCardSkeleton.vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const { getCitiesData, getWorkPlacesData, getSpecializationsData } = storeToRefs(useUtilsStore())
const { getPublishedUsersList, getExpertsList, getMentorsList, getFilters } = storeToRefs(useCommunitiesStore())
const communitiesStore = useCommunitiesStore()

const router = useRouter()
const route = useRoute()

const { showSnackbar } = useSnackbar()

const loadings = computed(
	() =>
		isLoading.value ||
		useCommunitiesStore().getDataLoadingStatus ||
		useUtilsStore().getDataLoadingStatus,
)

const breadcrumbs = [
	{
		name: t('Home'),
		url: '/main',
	},
	{
		name: t('Community'),
		url: '',
	},
]

const tabs = [
	{
		name: t('All'),
		url: '/all',
	},
	{
		name: t('Teachers'),
		url: '/experts',
	},
	{
		name: t('Mentors'),
		url: '/mentors',
	},
]
const currentTab = computed(() => `/${route.params.type}`)
const tabChangeHandler = (url) => router.push(`/communities${url}`)

const isLoading = ref(false)

onMounted(async () => await useCommunitiesStore().fetchCommunitiesList())

const publishedUsersList = ref(getPublishedUsersList)
const expertsList = ref(getExpertsList)
const mentorsList = ref(getMentorsList)

const filters = ref(getFilters)
const goTo = (id) => window.open(`https://lms.matemarketing.ru/public/${id}`, '_blank')

const handleSearch = () => {
	communitiesStore.updateFilters(filters.value, currentTab.value)
	isDisabled.value = true
}
watch(() => filters.value.q, (newValue, oldValue) => { if (oldValue && !newValue) handleSearch() })

const resetFilters = () => communitiesStore.resetFilters()

const specializations = ref(getSpecializationsData)
const workPlaces = ref(getWorkPlacesData)
const cities = ref(getCitiesData)

const defaultForm = () => ({
	name: '',
	email: '',
	phone: '',
	description: '',
	to: 0,
})
const form = ref(defaultForm())
const showModal = ref(false)
const openModal = (member) => {
	form.value.to = member.id
	showModal.value = true
}
const closeModal = () => {
	showModal.value = false
	form.value = defaultForm()
}
const enterForm = () => {
	if (!(form.value.email && /\S+@\S+\.\S+/.test(form.value.email))) showSnackbar(t('Check that the email you entered is correct. For example, example@site.ru'))
	else {
		showModal.value = false
		communitiesStore.sendTaskToMentor(form.value)
	}
}

const isFormButtonDisabled = computed(
	() =>
		!(
			form.value.name &&
			form.value.email &&
			form.value.phone &&
			form.value.description &&
			form.value.to
		),
)

const showFiltersModal = ref(false)

const isDisabled = ref(false)
</script>

<style lang="scss" scoped>
.filters-wrapper {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.filters-block {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 16px;

	@media (max-width: 729px) {
		grid-template-columns: 1fr;
	}

	&__buttons {
		margin-top: 12px;
		display: flex;
		gap: 8px;

		@media (max-width: 729px) {
			flex-direction: column-reverse;
		}
	}

}

.communities-card__wrapper {
	display: grid;
	grid-template-columns: 1fr;
	gap: 32px;

	@media (min-width: 1023px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (min-width: 1365px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (min-width: 1699px) {
		grid-template-columns: repeat(3, 1fr);
	}

	@media (min-width: 2399px) {
		grid-template-columns: repeat(4, 1fr);
	}

	@media (min-width: 2719px) {
		grid-template-columns: repeat(4, 1fr);
	}
}

.communities-layout__aside {
	position: sticky;
	height: 100vh;
	overflow: scroll;
	top: 0;
	margin: 0;

	@media screen and (max-width: 1366px) {
		display: none;
	}
}

.communities-layout__main-content {
	position: sticky;
	display: flex;
	bottom: 100%;
	flex-direction: column;
}

.top-05 {
	margin-top: 2px;
}

.form-block {
	&--duo {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 24px;

		@media (max-width: 1024px) {
			display: flex;
			flex-direction: column;
			gap: 0;
		}
	}
}

.communities-card__tabs-block {
	display: flex;
	align-items: center;
	justify-content: space-between;

	@media screen and (max-width: 1366px) {
		align-items: flex-start;
		flex-direction: column;
		gap: 16px;
	}
}

.communities-layout__filter-block {
	display: flex;
	gap: 16px;

	& .communities-layout__filter-button {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 5px;
		background: #f1f1f5;
		width: 44px;
		height: 44px;
		cursor: pointer;
	}

	@media screen and (max-width: 1366px) {
		width: 100%;
		display: grid;
		grid-template-columns: 44px 1fr 90px;
		gap: 16px;
	}

	& .communities-layout__filter-search {
		width: 320px;

		@media screen and (max-width: 1366px) {
			width: 100%;
		}
	}
}
</style>
