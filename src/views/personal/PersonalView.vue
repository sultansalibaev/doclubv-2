<template>
	<PageLayout :aside="true" :no-sticky="true" class="personal-page">
		<template #header>
			<AppHeader :breadcrumbs="breadcrumbs" heading="Personal account" />
		</template>
		<template #main>
			<div class="personal-layout__main">
				<PersonalControls :photo="userStore?.user?.photo" :first-name="getUserData?.first_name"
					:last-name="getUserData?.last_name" :middle-name="getUserData?.middle_name"
					:city="getUserData?.city?.name" :country="'Россия'" :controls="controls" :is-loading="loadings"
					@on-change-control="changeControl($event)" @on-photo-select="handleEditUserData($event)" />
				<PersonalMobileInfoPanel :about="getUserData?.about" :job="getUserData?.position_str"
					:specialization="getUserData?.specialization" :contact_email="getUserData?.contact_email"
					:contact_phone="getUserData?.personal_phone" :facebook="getUserData?.facebook"
					:instagram="getUserData?.instagram" :telegram="getUserData?.telegram" :whatsapp="getUserData?.whatsapp"
					:university="getUserData?.university" :university_department="getUserData?.university_department"
					:university_speciality="getUserData?.university_speciality" :work-place="getUserData?.work_place"
					:work-phone="getUserData?.work_phone" :work-places="getUserData?.work_places"
					:certificates="getUserData?.certificates" :courses="getCoursesCertificates" class="mobile"
					@on-edit-info="changeMobileControl(0), controls[0].isEditing = true, hideMobileMenu()"
					@on-edit-contacts="changeMobileControl(1), controls[1].isEditing = true, hideMobileMenu()"
					@on-edit-education="changeMobileControl(2), controls[2].isEditing = true, hideMobileMenu()"
					@on-edit-work="changeMobileControl(3), controls[3].isEditing = true, hideMobileMenu()"
					@on-edit-experience="changeMobileControl(4), controls[4].isEditing = true, hideMobileMenu()"
					@on-edit-certificates="changeMobileControl(5), controls[5].isEditing = true, hideMobileMenu()" />
				<transition-group name="personal-fade">
					<template v-if="controls[0].value">
						<PersonalInfoPanel v-if="!controls[0].isEditing" :city="getUserData?.city?.name" :country="'Россия'"
							:first-name="getUserData?.first_name" :last-name="getUserData?.last_name"
							:middle-name="getUserData?.middle_name" :photo="getUserData?.photo" :about="getUserData?.about"
							:job="getUserData?.position_str" :specialization="getUserData?.specialization"
							:is-loading="loadings" class="not-mobile"
							@on-edit="controls[0].isEditing = true, hideMobileMenu()" />
						<PersonalInfoEditing v-else :city="userStore?.user?.city" :cities-list="cities" :country="'Россия'"
							:first-name="userStore?.user?.first_name" :last-name="userStore?.user?.last_name"
							:middle-name="userStore?.user?.middle_name" :about="userStore?.user?.about"
							:job="userStore?.user?.position_str" :specialization="userStore?.user?.specialization"
							:specializations="specializations" :is-loading="loadings"
							@on-save="handleEditUserData($event), controls[0].isEditing = false, showMobileMenu()"
							@on-cancel="controls[0].isEditing = false, showMobileMenu()" />
					</template>
					<template v-if="controls[1].value">
						<PersonalContactsPanel v-if="!controls[1].isEditing" :contact_email="getUserData?.contact_email"
							:contact_phone="getUserData?.personal_phone" :facebook="getUserData?.facebook"
							:instagram="getUserData?.instagram" :telegram="getUserData?.telegram"
							:whatsapp="getUserData?.whatsapp" :is-loading="loadings" class="not-mobile"
							@on-edit="controls[1].isEditing = true, hideMobileMenu()" />
						<PersonalContactsEditing v-else :contact_email="userStore?.user?.contact_email"
							:contact_phone="userStore?.user?.personal_phone" :facebook="userStore?.user?.facebook"
							:instagram="userStore?.user?.instagram" :telegram="userStore?.user?.telegram"
							:whatsapp="userStore?.user?.whatsapp" :is-loading="loadings"
							@on-save="handleEditUserData($event), controls[1].isEditing = false, showMobileMenu()"
							@on-cancel="controls[1].isEditing = false, showMobileMenu()" />
					</template>
					<template v-if="controls[2].value">
						<PersonalEducationPanel v-if="!controls[2].isEditing" :university="getUserData?.university"
							:university_department="getUserData?.university_department"
							:university_speciality="getUserData?.university_speciality" :is-loading="loadings"
							class="not-mobile" @on-edit="controls[2].isEditing = true, hideMobileMenu()" />
						<PersonalEducationEditing v-else :university="userStore?.user?.university"
							:university_department="userStore?.user?.university_department"
							:university_speciality="userStore?.user?.university_speciality"
							:universities-list="universities" :is-loading="loadings"
							@on-save="handleEditUserData($event), controls[2].isEditing = false, showMobileMenu()"
							@on-cancel="controls[2].isEditing = false, showMobileMenu()" />
					</template>
					<template v-if="controls[3].value">
						<PersonalWorkPanel v-if="!controls[3].isEditing" :city="getUserData?.city?.name" :country="'Россия'"
							:first-name="getUserData?.first_name" :last-name="getUserData?.last_name"
							:middle-name="getUserData?.middle_name" :work-place="getUserData?.work_place"
							:work-phone="getUserData?.work_phone" :is-loading="loadings" class="not-mobile"
							@on-edit="controls[3].isEditing = true, hideMobileMenu()" />
						<PersonalWorkEditing v-else :organization="userStore?.user?.work_place"
							:work-place-list="workPlaces" :work-phone="userStore?.user?.work_phone" :is-loading="loadings"
							@on-save="handleEditUserData($event), controls[3].isEditing = false, showMobileMenu()"
							@on-cancel="controls[3].isEditing = false, showMobileMenu()" />
					</template>
					<template v-if="controls[4].value">
						<PersonalExperiencePanel v-if="!controls[4].isEditing" :city="getUserData?.city?.name"
							:country="'Россия'" :first-name="getUserData?.first_name" :last-name="getUserData?.last_name"
							:middle-name="getUserData?.middle_name" :work-places="getUserData?.work_places"
							:is-loading="loadings" class="not-mobile"
							@on-edit="controls[4].isEditing = true, hideMobileMenu()" />
						<PersonalExperienceEditing v-else :places="userStore?.user?.work_places" :is-loading="loadings"
							@on-save="handleEditUserData($event), controls[4].isEditing = false, showMobileMenu()"
							@on-cancel="controls[4].isEditing = false, showMobileMenu()"
							@on-save-new-work-place="saveNewPlaces($event), controls[4].isEditing = false, showMobileMenu()"
							@on-delete="deleteWorkPlace($event), controls[4].isEditing = false, showMobileMenu()"
							@on-edit="editWorkPlace($event), controls[4].isEditing = false, showMobileMenu()"
							@on-edit-with-new-photo="editWorkPlaceWithNewPhoto($event), controls[4].isEditing = false, showMobileMenu()" />
					</template>
					<template v-if="controls[5].value">
						<PersonalCertificatesPanel v-if="!controls[5].isEditing" :city="getUserData?.city?.name"
							:country="'Россия'" :first-name="getUserData?.first_name" :last-name="getUserData?.last_name"
							:middle-name="getUserData?.middle_name" :certificates="getUserData?.certificates"
							:is-loading="loadings" class="not-mobile"
							@on-edit="controls[5].isEditing = true, hideMobileMenu()" />
						<PersonalCertificatesEditing v-else :certificates="getUserData?.certificates" :is-loading="loadings"
							@on-save="handleEditUserData($event), controls[5].isEditing = false, showMobileMenu()"
							@on-cancel="controls[5].isEditing = false, showMobileMenu()" />
					</template>
					<template v-if="controls[6].value">
						<PersonalCoursesPanel v-if="!controls[6].isEditing" :city="getUserData?.city?.name"
							:country="'Россия'" :first-name="getUserData?.first_name" :last-name="getUserData?.last_name"
							:middle-name="getUserData?.middle_name" :certificates="getCoursesCertificates"
							:is-loading="loadings" class="not-mobile" />
					</template>
				</transition-group>
			</div>
			<!--				&lt;!&ndash;			<PersonalStats :is-loading="isLoading" :info="userInfo.stats" />&ndash;&gt;-->
		</template>
		<template #aside>
			<div class="personal-layout__aside">
				<PersonalFillingProfile :is-loading="loadings" :percent="userStore?.user?.fill_percentage"
					:empty_fields="userStore?.user?.empty_fields" @open-editing-mode="openFillingProfileLink($event)" />
				<PersonalProfileStatus :is-active="userStore?.user?.is_published"
					:profile-link="userStore?.user?.profile_url" :is-loading="loadings"
					@change-profile-status="changeProfileStatus($event)" />
				<!--			<PersonalReferralLink-->
				<!--				:is-loading="isLoading"-->

				<!--				class="mt-8"-->
				<!--			/>-->
				<!--			<PersonalRating :is-loading="isLoading" class="mt-8" />-->
				<PersonalFillingCourses v-if="userStore?.user?.uncompleted_courses?.length" :is-loading="loadings"
					:courses="userStore?.user?.uncompleted_courses" />
			</div>
		</template>
	</PageLayout>
</template>

<script setup>
import { useUserWorkPlacesStore } from '@/stores/userWorkPlaces'
import { useUtilsStore } from '@/stores/utils'
import { useUserStore } from '@/stores/user'
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'

import PersonalControls from '@/views/personal/static/PersonalControls.vue'
import PersonalInfoPanel from '@/views/personal/static/PersonalInfoPanel.vue'
import PersonalContactsPanel from '@/views/personal/static/PersonalContactsPanel.vue'
import PersonalEducationPanel from '@/views/personal/static/PersonalEducationPanel.vue'
import PersonalWorkPanel from '@/views/personal/static/PersonalWorkPanel.vue'
import PersonalExperiencePanel from '@/views/personal/static/PersonalExperiencePanel.vue'
import PersonalCertificatesPanel from '@/views/personal/static/PersonalCertificatesPanel.vue'
import PersonalCoursesPanel from '@/views/personal/static/PersonalCoursesPanel.vue'
import PersonalInfoEditing from '@/views/personal/editing/PersonalInfoEditing.vue'
import PersonalContactsEditing from '@/views/personal/editing/PersonalContactsEditing.vue'
import PersonalEducationEditing from '@/views/personal/editing/PersonalEducationEditing.vue'
import PersonalWorkEditing from '@/views/personal/editing/PersonalWorkEditing.vue'
import PersonalExperienceEditing from '@/views/personal/editing/experience/PersonalExperienceEditing.vue'
import PersonalCertificatesEditing from '@/views/personal/editing/PersonalCertificatesEditing.vue'

import PersonalStats from '@/views/personal/PersonalStats.vue'
import PersonalFillingProfile from '@/views/personal/PersonalFillingProfile.vue'
import PersonalProfileStatus from '@/views/personal/PersonalProfileStatus.vue'
import PersonalReferralLink from '@/views/personal/PersonalReferralLink.vue'
import PersonalRating from '@/views/personal/PersonalRating.vue'
import PersonalFillingCourses from '@/views/personal/PersonalFillingCourses.vue'
import AppHeader from '@/components/AppHeader.vue'
import PageLayout from '@/views/layouts/PageLayout.vue'
import PersonalMobileInfoPanel from '@/views/personal/static/PersonalMobileInfoPanel.vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const userStore = useUserStore()
const { getUserData, getCoursesCertificates } = storeToRefs(useUserStore())

const utilsStore = useUtilsStore()
const { getCitiesData, getWorkPlacesData, getSpecializationsData, getUniversitiesData } = storeToRefs(useUtilsStore())
const userWorkPlacesStore = useUserWorkPlacesStore()

onMounted(async () => {
	await userStore.fetchCoursesCertificates()
})

const isLoading = ref(false)
const loadings = computed(
	() =>
		isLoading.value ||
		userStore.getDataLoadingStatus ||
		utilsStore.getDataLoadingStatus ||
		userWorkPlacesStore.getDataLoadingStatus,
)

const breadcrumbs = [
	{
		name: t('Home'),
		url: '/main',
	},
	{
		name: t('Personal account'),
		url: '',
	},
]

const controls = ref([
	{
		id: 0,
		name: t('Personal information'),
		value: true,
		isEditing: false,
	},
	{
		id: 1,
		name: t('Contacts'),
		value: false,
		isEditing: false,
	},
	{
		id: 2,
		name: t('Education'),
		value: false,
		isEditing: false,
	},
	{
		id: 3,
		name: t('Work'),
		value: false,
		isEditing: false,
	},
	{
		id: 4,
		name: t('Experience'),
		value: false,
		isEditing: false,
	},
	{
		id: 5,
		name: t('Certificates'),
		value: false,
		isEditing: false,
	},
	{
		id: 6,
		name: t('Courses certificates'),
		value: false,
		isEditing: false,
	},
])
const changeControl = (control) => {
	for (let item of controls.value) {
		item.isEditing = false
		item.value = item.name === control.name
	}
}
const changeMobileControl = (control) => {
	for (let item of controls.value) {
		item.isEditing = false
		item.value = item.id === control
	}
}

const handleEditUserData = async (data) => userStore.editUserData(data)

const changeProfileStatus = (status) => {
	const statusData = ref({
		is_published: status,
		profile_url: status
			? `https://lms.matemarketing.ru/public/${getUserData.value.id}`
			: null,
	})
	handleEditUserData(statusData.value)
}

const openFillingProfileLink = (link) => {
	for (let item of controls.value) {
		if (item.id === link.id) {
			item.isEditing = true
			item.value = true
		} else {
			item.isEditing = false
			item.value = false
		}
	}
}

const saveNewPlaces = (places) => userWorkPlacesStore.addWorkPlaces(places)
const deleteWorkPlace = (id) => userWorkPlacesStore.deleteWorkPlace(id)
const editWorkPlace = (data) => userWorkPlacesStore.editWorkPlace(data)
const editWorkPlaceWithNewPhoto = (data) => userWorkPlacesStore.editWorkPlaceWithNewPhoto(data)

const specializations = ref(getSpecializationsData)
const workPlaces = ref(getWorkPlacesData)
const cities = ref(getCitiesData)
const universities = ref(getUniversitiesData)

const hideMobileMenu = () => document.querySelector('.mobile-menu').style.opacity = 0
const showMobileMenu = () => document.querySelector('.mobile-menu').style.opacity = 1
</script>

<style lang="scss" scoped>
.personal-layout {

	&__main {
		position: sticky;
		bottom: 60px;
		display: grid;
		grid-template-columns: 330px 1fr;
		height: auto;
		scroll-behavior: smooth;
		overflow-y: scroll;
		gap: 32px;
		z-index: 1;

		@media screen and (max-width: 1599px) {
			grid-template-columns: 1fr;
		}
	}

	&__aside {
		display: flex;
		flex-direction: column;
		scroll-behavior: smooth;
		overflow-y: scroll;
		gap: 32px;

		@media screen and (max-width: 1366px) {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
		}

		@media screen and (max-width: 1024px) {
			display: flex;
			flex-direction: column;
		}
	}
}

.personal__two-column-block {
	display: flex;
	align-items: stretch;
	justify-content: space-between;

	@media (max-width: 1200px) {
		flex-direction: column;
	}
}

.personal-fade-enter-active {
	transition: opacity 0.4s ease;
}

.personal-fade-leave-active {
	opacity: 0;
}

.personal-fade-enter-from,
.personal-fade-leave-to {
	opacity: 0;
}

.mobile {
	display: none;

	@media screen and (max-width: 1024px) {
		display: block;
	}
}

.not-mobile {
	display: block;

	@media screen and (max-width: 1024px) {
		display: none;
	}
}
</style>
