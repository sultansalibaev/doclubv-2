<template>
	<div class="mt-8">
		<span class="caption-2-regular | text-gray800"> Отправили код. </span>
		<span
			class="caption-2-regular | text-purple-brand cursor-pointer"
			@click="emit('go-prev-step')"
		>
			Изменить номер
		</span>
	</div>
	<BaseInput2
		v-model="otp"
		autocomplete="one-time-code"
		autofocus
		black
		class="mt-4"
		inputmode="numeric"
		maxlength="4"
		v-maska="'####'"
	/>
	<AppButton
		:block="true"
		:loading="loading"
		:disabled="isDisabled"
		:text="buttonText"
		:theme="'primary'"
		class="mt-7"
		@click="getMorePin()"
	/>
	<AppButton
		v-if="showButton"
		:block="true"
		:text="'Код не приходит'"
		:theme="'black'"
		class="mt-2"
		@click="isOpenedModal = true"
	/>
	<p v-if="isError" class="caption-2-regular | mt-7 text-red">Неверный код</p>
<!--    <BaseModal-->
<!--        :show-modal="isOpenedModal"-->
<!--        :persistent="true"-->
<!--        :max-width="700"-->
<!--        :title="'Что делать если код не приходит?'"-->
<!--        @on-close="isOpenedModal = false"-->
<!--    >-->
<!--        <template #content>-->
<!--            <div>-->
<!--                <p class="caption-2-regular | caption-2-regular text-white100">-->
<!--                    1. Возможно, вы ввели не тот номер или ошиблись в цифре. Проверьте всё ещё раз.-->
<!--                </p>-->
<!--                <p class="caption-2-regular | mt-4 caption-2-regular text-white100">-->
<!--                    2. Проблема может быть со стороны вашего оператора сотовой связи. Обратитесь в службу-->
<!--                    поддержки.-->
<!--                </p>-->
<!--            </div>-->
<!--            <div class="mt-8">-->
<!--                <a-->
<!--                    href="mailto:mm.support@doclub.tech"-->
<!--                    class="caption-2-regular | gray-secondary text-decoration-none"-->
<!--                >-->
<!--                    <v-icon icon="mdi-email" />-->
<!--                    mm.support@doclub.tech-->
<!--                </a>-->
<!--                <a-->
<!--                    href="tel:88002225567"-->
<!--                    class="caption-2-regular | ml-6 gray-secondary text-decoration-none"-->
<!--                >-->
<!--                    8 (800) 222-55-67-->
<!--                </a>-->
<!--            </div>-->
<!--        </template>-->
<!--    </BaseModal>-->
	<BaseDialog v-model="isOpenedModal" :max-width="770">
		<BaseCard class="pa-10" color="white100">
			<div class="d-flex align-end justify-space-between">
				<h4 class="headers-4 | text-gray100">Что делать если код не приходит?</h4>
				<v-icon icon="mdi-close" color="gray100" size="28" @click="isOpenedModal = false" />
			</div>
			<div class="mt-8">
				<p class="caption-2-regular | caption-2-regular text-gray100">
					1. Возможно, вы ввели не тот номер или ошиблись в цифре. Проверьте всё ещё раз.
				</p>
				<p class="caption-2-regular | mt-4 caption-2-regular text-gray100">
					2. Проблема может быть со стороны вашего оператора сотовой связи. Обратитесь в службу
					поддержки.
				</p>
			</div>
			<div class="mt-8">
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
		</BaseCard>
	</BaseDialog>
</template>

<script setup>
import { ref, computed, watch, inject, onUnmounted } from 'vue'
import { useSnackbar } from '@/composables/snackbar'
import AppButton from '@/components/AppButton.vue'
import router from '@/router'

const { showSnackbar } = useSnackbar()

const props = defineProps({
	otpDefaultTimer: {
		type: Number,
		default: 60,
	},
})
const emit = defineEmits(['go-next-step', 'go-prev-step'])

const http_client = inject('http_client')

const otpInput = ref(null)
const bindModal = ref('')
const handleOnChange = () => {
    // console.log('change')
}
const handleOnComplete = () => {
    // console.log('qwe')
}

const otp = ref('')
const isDisabled = ref(false)
const loading = ref(false)
const isError = ref(false)
const showButton = ref(false)

const getMorePin = async () => {
	showButton.value = true

	try {
		loading.value = true

		const fullPhone = Object.assign({}, JSON.parse(localStorage.phone))

		const response = await http_client.post('/auth/resend/', {
			username: `${fullPhone.phonePrefix}${fullPhone.phoneInput}`,
		})

		if (response.status === 200) initCountdown(props.otpDefaultTimer)
		else console.log(response)
	} catch (error) {
		showSnackbar(error.message)
	} finally {
		loading.value = false
	}
}

const goNextStep = async () => {
	try {
		loading.value = true
		isError.value = false

		const fullPhone = Object.assign({}, JSON.parse(localStorage.phone))

		const response = await http_client.post('/auth/check/', {
			pin: otp.value,
			username: `${fullPhone.phonePrefix}${fullPhone.phoneInput}`,
		})

		if (response.status === 200) {
			if (response.data.id) emit('go-next-step', response.data)
			else await router.replace('/register')
		} else {
			isError.value = true
            otp.value = ''
		}
	} catch (error) {
		isError.value = true
        otp.value = ''
		showSnackbar(error.response.status === 401 ? 'Неверный код' : '')
	} finally {
		loading.value = false
	}
}

const otpTimer = ref(null)
const otpTimerId = ref(null)

const buttonText = computed(() =>
	otpTimer.value ? `Новый код через ${otpTimer.value} сек.` : 'Получить новый код',
)

const isTimerDone = computed(() => otpTimer.value <= 0)
const initCountdown = (time) => {
	isDisabled.value = true
	otpTimer.value = time
	otpTimerId.value = setInterval(() => {
		otpTimer.value -= 1

		if (isTimerDone.value) {
			clearInterval(otpTimerId.value)
			isDisabled.value = false
		}
	}, 1000)
}

watch(
	() => props.otpDefaultTimer,
	(newValue) => {
		if (newValue) initCountdown(newValue)
	},
)

watch(
	() => otp.value,
	(newValue) => {
		if (newValue.length === 4) goNextStep()
	},
)

onUnmounted(() => clearInterval(otpTimerId.value))

const isOpenedModal = ref(false)
</script>

<style>
.otp {
    display: flex;
    align-items: center;
    gap: 12px;
}
.otp-input {
    width: 100%;
    height: 44px;
    gap: 12px;
    border-radius: 5px;
    border: 1px solid white;
    display: flex;
    text-align: center;
    justify-content: center;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
input::placeholder {
    font-size: 15px;
    text-align: center;
    font-weight: 600;
}
</style>
