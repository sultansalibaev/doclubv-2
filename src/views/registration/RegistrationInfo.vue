<template>
	<form ref="infoForm" class="infoForm" @submit.prevent>
		<p class="caption-2-regular | text-gray800">Имя</p>
		<BaseInput2 v-model.trim="userInfo.name" placeholder="Заполните имя" black class="mt-4" />
		<p class="caption-2-regular | mt-4 text-gray800">Фамилия</p>
		<BaseInput2 v-model.trim="userInfo.surname" placeholder="Заполните фамилию" black class="mt-4" />
		<p class="caption-2-regular | mt-4 text-gray800">{{ t('Mail') }}</p>
		<BaseInput2 v-model.trim="userInfo.email" placeholder="Заполните почту" black class="mt-4" />
		<p class="caption-2-regular | mt-4 text-gray800">Код-приглашение</p>
		<BaseInput2 v-model.trim="userInfo.registrationSource" placeholder="Введите код-приглашение" black class="mt-4" />
		<div class="mt-8 infoForm__buttons">
			<AppButton :disabled="isLoading" :block="true" :text="'Назад'" :theme="'black'" @click="emit('go-prev-step')" />
			<AppButton :block="true" :loading="isLoading" :disabled="!validationStatusWithPromocode" :text="'Продолжить'"
				:theme="'primary'" type="submit" @click.prevent="goNextStep()" />
		</div>
		<div class="mt-8 d-flex flex-column gap-4">
			<p class="caption-2-regular | text-gray800">
				Если у вас отсутствует код-приглашение, то нажмите кнопку «подать запрос»
			</p>
			<AppButton :block="true" :loading="isLoading" :disabled="isDisabled" :text="'Подать запрос'" :theme="'primary'"
				type="submit" @click.prevent="emit('open-modal', userInfo)" />
		</div>
	</form>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useSnackbar } from '@/composables/snackbar'
import AppButton from '@/components/AppButton.vue'

const { showSnackbar } = useSnackbar()

const props = defineProps({
	cityList: {
		type: Array,
		require: true,
	},
	isLoading: {
		type: Boolean,
		required: true,
	},
})

const emit = defineEmits(['go-next-step', 'go-prev-step', 'open-modal'])

const isDisabled = ref(true)

const infoForm = ref(null)
const userInfo = ref({
	name: '',
	surname: '',
	email: '',
	registrationSource: '',
})

const validationStatus = computed(() => !!(userInfo.value.name && userInfo.value.surname))
const validationStatusWithPromocode = computed(() => !!(validationStatus && userInfo.value.registrationSource))


watch(validationStatus, (newValue) => (isDisabled.value = !newValue))
const goNextStep = () => {
	if (!(userInfo.value.email && /\S+@\S+\.\S+/.test(userInfo.value.email))) showSnackbar('Проверьте правильность введённой почты. Например, example@site.ru')
	else if (userInfo.value.registrationSource.toUpperCase() === 'ILOVEMM') emit('go-next-step', userInfo.value)
	else showSnackbar('Введён некорректный промокод. Проверьте правильность ввода')
}
</script>

<style scoped>
.infoForm__buttons {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 8px;
}
</style>
