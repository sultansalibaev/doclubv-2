<template>
	<div class="auth__bg">
		<div class="auth-wrapper">
			<div class="auth-block">
				<div>
					<AppLogo
						:logo-theme="theme.global.name === 'dark' ? 'white' : 'black'"
						class="sidebar__logo"
					/>
					<h1 class="headers-1 | mt-8 text-gray900">
						<span class="text-purple-brand"> Закрытый </span>
						клуб маркетинговой и продуктовой аналитики
					</h1>
					<template v-if="currentStep === 'phoneNumber'">
						<AuthPhoneNumber @go-next-step="currentStep = 'OTPCode'" />
					</template>
					<template v-if="currentStep === 'OTPCode'">
						<AuthOTPCode
							:otp-default-timer="60"
							@go-prev-step="currentStep = 'phoneNumber'"
							@go-next-step="finishAuth($event)"
						/>
					</template>
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
							class="caption-2-regular | ml-6 gray-secondary text-decoration-none"
						>
							8 (800) 222-55-67
						</a>
					</div>
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
import { ref, onMounted } from 'vue'
import { useTheme } from 'vuetify'
import { setCookie } from '@/plugins/cookie'
import router from '@/router'

import AppLogo from '@/components/AppLogo.vue'
import AuthPhoneNumber from '@/views/auth/AuthPhoneNumber.vue'
import AuthOTPCode from '@/views/auth/AuthOTPCode.vue'

const theme = useTheme()

const currentStep = ref('phoneNumber')

const finishAuth = (data) => {
	setCookie('accessToken', data?.access_token, {})
	setCookie('refreshToken', data?.refresh_token, {})
	const location = localStorage.getItem('location')
	if (location) {
		router.push(location)
		localStorage.removeItem('location')
	}
	else router.push('/')

	theme.global.name.value = 'light'
}

const isShowCookieModal = ref(false)

onMounted(() => {
	theme.global.name.value = 'dark'
	setTimeout(() => (isShowCookieModal.value = true), 1000)
})
</script>

<style lang="scss" scoped>
.auth-wrapper {
	max-width: 1440px;
	margin: 0 auto;
}
.auth-block {
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

.auth__bg {
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
