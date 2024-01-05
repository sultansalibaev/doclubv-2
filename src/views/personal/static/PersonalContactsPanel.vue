<template>
	<BaseCard>
		<template v-if="isLoading">
			<PersonalInfoPanelSkeleton />
		</template>
		<template v-else>
			<h2 class="headers-2 | ">
				{{ firstName }} {{ lastName }} {{ middleName }}
			</h2>
			<p v-if="city" class="small-regular | mt-2 text-gray800">{{ country }}, {{ city }}</p>
			<h4 class="headers-4 | mt-7">
				{{ t('Contacts') }}
			</h4>
			<div class="mt-7 contact-block">
				<div class="contact-block__image">
					<img src="@/assets/contact-icons/phone-call.svg" alt="" />
				</div>
				<div class="ml-4">
					<p class="body-regular | text-gray800">
						{{ contact_phone ? contact_phone : t('Add your nickname or link') }}
					</p>
					<p class="body-regular | mt-1 gray-secondary">{{ t('Telephone') }}</p>
				</div>
			</div>
			<div class="mt-5 contact-block">
				<div class="contact-block__image">
					<img src="@/assets/contact-icons/mail.svg" alt="" />
				</div>
				<div class="ml-4">
					<p class="body-regular | text-gray800">
						{{ contact_email ? contact_email : t('Add email address mail') }}
					</p>
					<p class="body-regular | mt-1 gray-secondary">{{ t('Mail') }}</p>
				</div>
			</div>
			<h5 class="headers-5 | mt-7">
				{{ t('Messengers') }}
			</h5>
			<div class="mt-7 contact-block">
				<div class="contact-block__image">
					<img src="@/assets/contact-icons/tg.svg" alt="" />
				</div>
				<div class="ml-4">
					<p class="body-regular | text-gray800">
						{{ telegram ? telegram : t('Add your nickname or link') }}
					</p>
					<p class="body-regular | mt-1 gray-secondary">Telegram</p>
				</div>
			</div>
			<div class="mt-5 contact-block">
				<div class="contact-block__image">
					<img src="@/assets/contact-icons/whatsapp.svg" alt="" />
				</div>
				<div class="ml-4">
					<p class="body-regular | text-gray800">
						{{ whatsapp ? whatsapp : t('Add email address mail') }}
					</p>
					<p class="body-regular | mt-1 gray-secondary">Whatsapp</p>
				</div>
			</div>
			<h5 class="headers-5 | mt-7">
				{{ t('Social media') }}
			</h5>
			<div class="mt-7 contact-block">
				<div class="contact-block__image">
					<img src="@/assets/contact-icons/facebook.svg" alt="" />
				</div>
				<div class="ml-4">
					<p class="body-regular | text-gray800">
						{{ facebook ? facebook : t('Add your nickname or link') }}
					</p>
					<p class="body-regular | mt-1 gray-secondary">Facebook</p>
				</div>
			</div>
			<div class="mt-5 contact-block">
				<div class="contact-block__image">
					<img src="@/assets/contact-icons/instagram.svg" alt="" />
				</div>
				<div class="ml-4">
					<p class="body-regular | text-gray800">
						{{ instagram ? instagram : t('Add email address mail') }}
					</p>
					<p class="body-regular | mt-1 gray-secondary">Instagram</p>
				</div>
			</div>
			<AppButton class="mt-7" theme="outline" :text="t('Edit')" @click="emit('on-edit')" />
		</template>
	</BaseCard>
</template>

<script setup>
import PersonalInfoPanelSkeleton from '@/views/personal/skeletons/PersonalInfoPanelSkeleton.vue'
import AppButton from '@/components/AppButton.vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
	isLoading: {
		type: Boolean,
		default: false,
	},
	firstName: {
		type: [String, Number],
		default: '',
	},
	lastName: {
		type: [String, Number],
		default: '',
	},
	middleName: {
		type: [String, Number],
		default: '',
	},
	country: {
		type: String,
		default: '',
	},
	city: {
		type: String,
		default: '',
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

const emit = defineEmits(['on-edit'])
</script>

<style lang="scss" scoped>
.contact-block {
	display: flex;
	gap: 16px;

	&__image {
		width: 52px;
		height: 52px;
		padding: 14px;
		border-radius: 12px;
		background: #F1EDFF;
	}
}
</style>