<template>
	<template v-if="!isError">
		<section class="public-page__wrapper">
			<div class="public-page">
				<div class="public-page__info">
					<PublicMainInfo
						:is-loading="isLoading"
						:tags="[]"
						:photo="localData.photo"
						:city="localData.city"
						:middle-name="localData.middle_name"
						:last-name="localData.last_name"
						:first-name="localData.first_name"
						:specializations="localData.specialization"
						:about-me="localData.about"
						:country="'Россия'"
					/>
					<v-row class="mt-8">
						<v-col sm="12" md="6">
							<PublicEducation
								:is-loading="isLoading"
								:university="localData.university"
								:university_speciality="localData.university_speciality"
								:university_department="localData.university_department"
							/>
						</v-col>
						<v-col sm="12" md="6">
							<PublicJob
								:is-loading="isLoading"
								:address="localData.work_place?.address"
								:organization="localData.work_place?.name"
								:work-phone="localData.work_phone"
							/>
						</v-col>
					</v-row>
					<PublicContacts
						:is-loading="isLoading"
						:contact_email="localData.contact_email"
						:contact_phone="localData.phone"
						:facebook="localData.facebook"
						:instagram="localData.instagram"
						:telegram="localData.telegram"
						:whatsapp="localData.whatsapp"
						class="mt-8"
					/>
				</div>
				<!--			<BaseCard color="background-primary" class="public-page__qr">-->
				<!--				<img src="@/assets/public-qr.svg" alt="" />-->
				<!--				<h5 class="headers-5 | ml-8 text-gray900">Откройте эту страницу на другом устройстве</h5>-->
				<!--			</BaseCard>-->
			</div>
		</section>
	</template>
	<template v-if="isError">
		<section class="public-page__wrapper public-page__wrapper--error">
			<div class="public-page public-page--error">
				<h4 class="headers-4 | text-gray900">Ошибка {{ errorStatus }}</h4>
				<p class="body-regular">
					{{ errorText }}
				</p>
				<router-link to="/" class="text-decoration-none">
					<AppButton theme="outline" text="Перейти на главную" />
				</router-link>
			</div>
		</section>
	</template>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue'
import { useRoute } from 'vue-router'
import PublicMainInfo from '@/views/public/PublicMainInfo.vue'
import PublicEducation from '@/views/public/PublicEducation.vue'
import PublicJob from '@/views/public/PublicJob.vue'
import PublicContacts from '@/views/public/PublicContacts.vue'
import AppButton from '@/components/AppButton.vue'

const http_client = inject('http_client')

const route = useRoute()

const localData = ref({})

const isLoading = ref(true)
const isError = ref(false)
const errorStatus = ref(0)
const errorText = computed(() =>
	errorStatus.value === 404
		? 'Кажется, что-то пошло не так! Ресурс не найден'
		: 'Сервис недоступен',
)

onMounted(() => getUserInfo())

const getUserInfo = async () => {
	try {
		isError.value = false
		isLoading.value = true
		const response = await http_client.get(`/profile/${route.params.id}/`)

		if (response.status === 200) localData.value = response.data
		else {
			console.log(response.message)
			isError.value = true
			errorStatus.value = response.status
		}
	} catch (error) {
		isError.value = true
		errorStatus.value = error.response.status
	} finally {
		isLoading.value = false
	}
}
</script>

<style lang="scss" scoped>
.public-page {
	width: 100%;
	max-width: 1470px;
	margin: 32px auto;
	padding: 24px;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	gap: 30px;

	&--error {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	&__wrapper {
		width: 100%;
		min-height: 100vh;
		background: rgb(var(--v-theme-background-secondary));

		&--error {
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	&__info {
		//max-width: 970px;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	&__qr {
		max-width: 470px;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
}
@media (max-width: 1220px) {
	.public-page {
		flex-direction: column-reverse;

		&__info,
		&__qr {
			max-width: 100%;
		}
	}
}
</style>
