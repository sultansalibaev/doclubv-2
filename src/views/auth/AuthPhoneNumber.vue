<template>
	<p class="caption-2-regular | mt-8 gray-secondary">Номер телефона</p>
	<BaseInput2
		v-model="phone.phoneInput"
		black
		:disabled="isLoading"
		:prepend-inner="true"
		class="mt-4"
		inputmode="numeric"
		v-maska="'### ###-##-##'"
		@keydown.enter="goNextStep()"
	>
		<template #prepend-inner>
			{{ phone.phonePrefix }}
		</template>
	</BaseInput2>
	<AppButton
		:block="true"
		:loading="isLoading"
		:disabled="isDisabled"
		:text="'Отправить код'"
		:theme="'primary'"
		class="mt-7"
		@click="goNextStep()"
	/>
	<p class="body-regular | mt-7 gray-secondary">
		Cоглашаюсь с условиями
		<a href="https://matemarketing.ru/privacy" target="_blank" class="gray-secondary"> обработки моих персональных данных </a>.
	</p>
</template>

<script setup>
import { computed, ref, watch, inject } from 'vue'
import AppButton from '@/components/AppButton.vue'

const emit = defineEmits(['go-next-step'])

const http_client = inject('http_client')

const phone = ref({
	phoneInput: '',
	phonePrefix: '+7',
})

const unFormattedPhone = computed(() => {
	const formatted = phone.value.phoneInput
	const [cityCode, digits = ''] = formatted.split(' ')
	const [firstDigits, secondDigits, thirdDigits] = digits?.split('-')

	return `${cityCode}${firstDigits}${secondDigits}${thirdDigits}`
})

const isLoading = ref(false)
const isDisabled = ref(true)

const goNextStep = async () => {
	isLoading.value = true

	try {
		isLoading.value = true

		const fullPhone = `${phone.value.phonePrefix}${unFormattedPhone.value}`
		const response = await http_client.post('/auth/login/', { username: fullPhone })

		console.log('goNextStep response', response);

		localStorage.setItem(
			'phone',
			JSON.stringify({
				phoneInput: unFormattedPhone.value,
				phonePrefix: phone.value.phonePrefix,
			}),
		)

		if (response.status === 200) {
			if (response.data.pin) {
				// alert(response.data.pin)
				// console.log(response.data.pin)
			}
			emit('go-next-step')
		} else {
			console.log(response?.message)
		}
	} catch (error) {
		console.error(error)
	} finally {
		isLoading.value = false
	}
}
watch(() => phone.value.phoneInput, (newValue) => (newValue.length === 13 ? (isDisabled.value = false) : (isDisabled.value = true)))
</script>

<style lang="scss" scoped>
.gray-secondary {
	color: rgba(var(--v-theme-gray900), 0.5);
}
.top-05 {
	margin-top: 2px;
}
</style>
