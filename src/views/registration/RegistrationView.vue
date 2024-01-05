<template>
	<div class="registration__bg">
		<div class="registration-wrapper">
			<div class="registration-block">
				<div>
					<AppLogo
						:logo-theme="theme.global.name === 'dark' ? 'white' : 'black'"
						class="sidebar__logo"
					/>
					<p class="small-regular | mt-8 gray-secondary">Шаг {{ currentStepNumber }} из 2</p>
					<h1 class="headers-4 | mt-2 text-gray900">
						{{ currentStepDescription }}
					</h1>
					<RegistrationEula
						v-if="currentStep === 'eula'"
						@go-next-step="goToRegistrationInfo($event)"
					/>

					<RegistrationInfo
						v-if="currentStep === 'info'"
						:city-list="cities"
                        :is-loading="isLoading"
						class="mt-8"
						@go-prev-step="currentStep = 'eula'"
						@go-next-step="goToFinishRegister($event)"
                        @open-modal="goToApplicationRegister($event)"
					/>

					<BaseModal
						:show-modal="showModal"
						:persistent="true"
						:max-width="700"
						:title="'Спасибо, мы пришлем вам СМС и письмо на почту, когда будем готовы показать вам весь контент.'"
						@on-close="closeModal()"
					>
						<div class="mt-4 d-flex flex-wrap gap-4">
							<AppButton :disabled="isLoading" theme="black" text="У меня есть код" @click="showModal = false" />
							<AppButton :loading="isLoading" theme="primary" text="Буду ждать" @click="applicateRegister()" />
						</div>
					</BaseModal>

<!--					<RegistrationWorkPlace-->
<!--						v-if="currentStep === 'workPlace'"-->
<!--						:work-place-list="workPlaces"-->
<!--						class="mt-8"-->
<!--						@go-prev-step="currentStep = 'info'"-->
<!--						@go-next-step="goToSpecialization($event)"-->
<!--					/>-->

<!--					<RegistrationSpecialization-->
<!--						v-if="currentStep === 'specialization'"-->
<!--						:info="registrationUserInfo"-->
<!--						:is-loading="isLoading"-->
<!--						:people="specializations"-->
<!--						class="mt-8"-->
<!--						@go-prev-step="currentStep = 'workPlace'"-->
<!--						@go-next-step="finishRegister($event)"-->
<!--					/>-->
				</div>
				<div class="social-links">
					<div class="d-flex flex-wrap gap-4">
						<a
							href="mailto:mm.support@doclub.tech"
							class="caption-2-regular | gray-secondary text-decoration-none"
						>
							<v-icon icon="mdi-email" />
                            mm.support@doclub.tech
						</a>
                        <a
                            href="tel:88002225567"
                            class="caption-2-regular | gray-secondary text-decoration-none"
                        >
                            8 (800) 222-55-67
                        </a>
					</div>
					<!--					<div class="mt-6">-->
					<!--						<a href="#" class="caption-2-regular | gray-secondary text-decoration-none">-->
					<!--							Обработка персональных данных-->
					<!--						</a>-->
					<!--					</div>-->
				</div>
				<v-snackbar
					v-model="isShowCookieModal"
					class="mb-10"
					location="bottom right"
					max-width="370"
					rounded="xl"
					timeout="-1"
					color="white100"
					transition="slide-y-reverse-transition"
					vertical
				>
					<div class="d-flex align-end justify-space-between">
						<h5 class="headers-5 | text-gray100">🍪 Мы используем cookie</h5>
						<v-icon icon="mdi-close" size="28" @click="isShowCookieModal = false" />
					</div>
					<p class="small-regular | mt-2 text-gray100">
						Файлы cookie помогают нам обеспечить наилучший доступ к нашему веб-сайту. Используя наш
						веб-сайт, вы соглашаетесь на использование файлов cookie.
					</p>
				</v-snackbar>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useSnackbar } from '@/composables/snackbar'
import { ref, onMounted, computed, inject } from 'vue'
import { useTheme } from 'vuetify'
import { useUtilsStore } from '@/stores/utils'
import { storeToRefs } from 'pinia'
import AppLogo from '@/components/AppLogo.vue'
import RegistrationEula from '@/views/registration/RegistrationEula.vue'
import RegistrationInfo from '@/views/registration/RegistrationInfo.vue'
import RegistrationWorkPlace from '@/views/registration/RegistrationWorkPlace.vue'
import RegistrationSpecialization from '@/views/registration/RegistrationSpecialization.vue'
import router from '@/router'
import { setCookie } from '@/plugins/cookie'
import AppButton from '@/components/AppButton.vue';
const http_client = inject('http_client')

const { getCitiesData, getWorkPlacesData, getSpecializationsData } = storeToRefs(useUtilsStore())

const { showSnackbar } = useSnackbar()

const theme = useTheme()

onMounted(async () => {
	theme.global.name.value = 'dark'
	setTimeout(() => (isShowCookieModal.value = true), 1000)
})

const currentStep = ref('eula')

const isLoading = ref(false)

const currentStepNumber = computed(() => {
	const steps = {
		eula: 1,
		info: 2,
		workPlace: 3,
		specialization: 4,
	}

	return steps[currentStep.value] || 1
})
const currentStepDescription = computed(() => {
	const steps = {
		1: 'Перед регистрацией вам необходимо ознакомиться и подтвердить правила и условия:',
		2: 'Заполните информацию о себе',
		3: 'Где вы работаете?',
		4: 'Укажите интересующую вас отрасль',
	}

	return (
		steps[currentStepNumber.value] ||
		'Перед регистрацией вам необходимо ознакомиться и подтвердить правила и условия:'
	)
})

const isShowCookieModal = ref(false)

const specializations = ref(getSpecializationsData)
const workPlaces = ref(getWorkPlacesData)
const cities = ref(getCitiesData)

const registrationUserInfo = {
	email: '', //почта
	first_name: '', //имя
	last_name: '', //фамилия
	// middle_name: '', //отчество
	// city: 0, //ID города
	// work_place: 0, //ID места работы
	// link: '', //ссылка на информацию о себе
	// specialization: [], //массив из ID специализаций
	phone_prefix: '', //код страны из номера телефона (+7, +998, и т.д.)
	phone_number: '', //номер телефона без кода страны
	registration_source: '', // промокод для авторизации
}

const goToRegistrationInfo = (info) => {
	registrationUserInfo.phone_prefix = info.phonePrefix
	registrationUserInfo.phone_number = info.phoneInput
	currentStep.value = 'info'
}
const goToFinishRegister = (info) => {
    registrationUserInfo.first_name = info.name
    registrationUserInfo.last_name = info.surname
    registrationUserInfo.email = info.email
    registrationUserInfo.registration_source = info.registrationSource.toUpperCase()
    // registrationUserInfo.city = info.city
    // currentStep.value = 'workPlace'

    finishRegister()
}
const goToApplicationRegister = (info) => {
    registrationUserInfo.first_name = info.name
    registrationUserInfo.last_name = info.surname
    registrationUserInfo.email = info.email

    showModal.value = true
}
const goToSpecialization = (info) => {
	registrationUserInfo.work_place = info.workPlace
	registrationUserInfo.link = info.link
	currentStep.value = 'specialization'
}
const finishRegister = async () => {
	// registrationUserInfo.specialization = info

	try {
		isLoading.value = true

		const response = await http_client.post('/auth/registration/', registrationUserInfo)

		if (response.status === 201) {
			theme.global.name.value = 'light'
			setCookie('accessToken', response.data.access_token, { secure: true })
			setCookie('refreshToken', response.data.refresh_token, { secure: true })
			localStorage.removeItem('phone')
			await router.push('/')
		} else {
			console.log(response)
		}
	} catch (error) {
		showSnackbar(error)
	} finally {
		isLoading.value = false
	}
}
const applicateRegister = async () => {
	try {
		isLoading.value = true
			const info = {
				first_name: registrationUserInfo.first_name,
				last_name: registrationUserInfo.last_name,
				phone: `${registrationUserInfo.phone_prefix}${registrationUserInfo.phone_number}`,
				email: registrationUserInfo.email,
			}
		if (!info.email) {
			showSnackbar('Вы не указали почту')
			return
		}
		else if (!(info.email && /\S+@\S+\.\S+/.test(info.email))) {
			showSnackbar('Проверьте правильность введённой почты. Например, example@site.ru')
			return
		}
		const response = await http_client.post('/profile/application/', info)

		if (response.status === 201) {
			showModal.value = false
			showSnackbar('Заявка успешно создана')
			localStorage.removeItem('phone')
			await router.push('/auth')
		} else {
			console.log(response)
		}
	} catch (error) {
		showSnackbar(error)
	} finally {
		isLoading.value = false
	}
}

const showModal = ref(false)
const closeModal = () => showModal.value = false
</script>

<style lang="scss" scoped>
.registration-wrapper {
	max-width: 1440px;
	margin: 0 auto;
}
.registration-block {
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	max-width: 370px;
	height: 94vh;
	padding: 0;

	@media (min-width: 1200px) {
		padding: 64px 0 0 0;
	}
}

.registration__bg {
	padding: 12px;
	height: 100%;

	@media (min-width: 1200px) {
		background-image: url('@/assets/auth_bg_image.svg');
		background-repeat: no-repeat;
		background-size: contain;
		background-position: 100% 0;
	}
}

.social-links {
	margin: auto 0 0;
	padding: 50px 0 0;
}

.gray-secondary {
	color: rgba(var(--v-theme-gray900), 0.5);
}
</style>
