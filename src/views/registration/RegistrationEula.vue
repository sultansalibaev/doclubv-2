<template>
	<div class="d-flex mt-4">
		<v-checkbox-btn v-model="checkbox" color="green300" />
		<div class="caption-2-regular | mt-4 text-gray800">
			Я даю свое согласие на
			<a target="_blank" href="#" class="caption-2-regular | text-gray800">
				обработку персональных данных
			</a>
		</div>
	</div>
	<AppButton
		:disabled="!checkbox"
		block
		class="mt-7"
		text="Продолжить"
		theme="primary"
		@click="goNextStep()"
	/>
	<router-link class="text-decoration-none" to="/auth">
		<AppButton
			block
			class="mt-4"
			text="К авторизации"
			theme="black"
		/>
	</router-link>
</template>

<script setup>
import { ref } from 'vue'
import AppButton from '@/components/AppButton.vue'
import { isDisabled } from 'jsdom/lib/jsdom/living/helpers/form-controls'

const emit = defineEmits(['go-next-step'])

const checkbox = ref(false)

const goNextStep = () => emit('go-next-step', JSON.parse(localStorage.phone))

const phone = ref({
	phoneInput: '',
	phonePrefix: '+7',
})
const isLoading = ref(false)
</script>

<style scoped></style>
