<template>
	<BaseModal :show-modal="showModal" :max-width="680" :max-height="1100" :title="t('Contacts')"
		@on-close="cancelEditMode()">
		<div>
			<p class="caption-2-regular | text-gray800">{{ t('Telephone') }}</p>
			<BaseInput2 v-model="local.personal_phone" class="mt-4" placeholder="Введите номер телефона" prepend-inner
				v-maska="'# ### ###-##-##'">
				<template #prepend-inner>
					<img src="@/assets/contact-icons/phone-call.svg" alt="" />
				</template>
			</BaseInput2>
		</div>
		<div class="mt-7">
			<p class="caption-2-regular | text-gray800">{{ t('Mail') }}</p>
			<BaseInput2 v-model="local.contact_email" class="mt-4" placeholder="Введите свою электронную почту"
				prepend-inner>
				<template #prepend-inner>
					<img src="@/assets/contact-icons/mail.svg" alt="" />
				</template>
			</BaseInput2>
		</div>
		<h5 class="headers-5 | mt-7">
			{{ t('Messengers') }}
		</h5>
		<div class="mt-7">
			<p class="caption-2-regular | text-gray800">Telegram</p>
			<BaseInput2 v-model="local.telegram" class="mt-4" placeholder="Укажите никнейм или ссылку на профиль"
				prepend-inner>
				<template #prepend-inner>
					<img src="@/assets/contact-icons/tg.svg" alt="" />
				</template>
			</BaseInput2>
		</div>
		<div class="mt-7">
			<p class="caption-2-regular | text-gray800">Whatsapp</p>
			<BaseInput2 v-model="local.whatsapp" class="mt-4" placeholder="Укажите никнейм или свой номер телефона"
				prepend-inner>
				<template #prepend-inner>
					<img src="@/assets/contact-icons/whatsapp.svg" alt="" />
				</template>
			</BaseInput2>
		</div>
		<h5 class="headers-5 | mt-7">
			{{ t('Social media') }}
		</h5>
		<div class="mt-7">
			<p class="caption-2-regular | text-gray800">Facebook</p>
			<BaseInput2 v-model="local.facebook" class="mt-4" placeholder="Укажите никнейм или ссылку на профиль"
				prepend-inner>
				<template #prepend-inner>
					<img src="@/assets/contact-icons/facebook.svg" alt="" />
				</template>
			</BaseInput2>
		</div>
		<div class="mt-7">
			<p class="caption-2-regular | text-gray800">Instagram</p>
			<BaseInput2 v-model="local.instagram" class="mt-4" placeholder="Укажите никнейм или ссылку на профиль"
				prepend-inner>
				<template #prepend-inner>
					<img src="@/assets/contact-icons/instagram.svg" alt="" />
				</template>
			</BaseInput2>
		</div>
		<div class="mt-7 buttons-block">
			<AppButton :disabled="isLoading" theme="primary" text="Сохранить" @click="saveChanges()" />
			<AppButton :loading="isLoading" theme="outline" text="Отменить" @click="cancelEditMode()" />
		</div>
	</BaseModal>
</template>
<script setup>
import { ref, watch } from 'vue'
import AppButton from '@/components/AppButton.vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
	isLoading: {
		type: Boolean,
		required: true,
	},
	contact_phone: {
		type: String,
		default: '',
	},
	telegram: {
		type: String,
		default: '',
	},
	facebook: {
		type: String,
		default: '',
	},
	contact_email: {
		type: String,
		default: '',
	},
	whatsapp: {
		type: String,
		default: '',
	},
	instagram: {
		type: String,
		default: '',
	},
})

const emit = defineEmits(['on-save', 'on-cancel'])

const showModal = ref(true)

const defaultLocal = () => ({
	personal_phone: props.contact_phone,
	telegram: props.telegram,
	facebook: props.facebook,
	contact_email: props.contact_email,
	whatsapp: props.whatsapp,
	instagram: props.instagram,
})
const local = ref(defaultLocal())

const saveChanges = () => {
	emit('on-save', local.value)
	cancelEditMode()
}
const cancelEditMode = () => {
	emit('on-cancel')
	local.value = defaultLocal()
}
</script>

<style scoped>
.buttons-block {
	display: flex;
	gap: 16px;
}
</style>