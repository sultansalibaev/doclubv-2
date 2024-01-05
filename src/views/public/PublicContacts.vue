<template>
	<BaseCard color="background-primary">
		<h5 class="headers-5 | text-gray900">{{ t('Contacts') }}</h5>
		<v-row class="mt-5">
			<v-col sm="12" md="6" class="d-flex flex-column gap-5">
				<div v-if="contact_phone" class="d-flex align-end">
					<div class="pa-3 d-flex align-center bg-purple100 rounded-lg">
						<img src="@/assets/contact-icons/phone-call.svg" alt="" />
					</div>
					<div class="ml-4">
						<BaseSkeletonPath v-if="isLoading" :width="127" :height="16" class="mt-2" />
						<p v-else class="body-regular | mt-2 text-gray800">
							{{ contact_phone ? contact_phone : 'Данные не заполнены' }}
						</p>
						<p class="body-regular | mt-1 gray-secondary">{{ t('Telephone') }}</p>
					</div>
				</div>
				<div v-if="telegram" class="d-flex align-end">
					<div class="pa-3 d-flex align-center bg-purple100 rounded-lg">
						<img src="@/assets/contact-icons/tg.svg" alt="" />
					</div>
					<div class="ml-4">
						<BaseSkeletonPath v-if="isLoading" :width="127" :height="16" class="mt-2" />
						<p v-else class="body-regular | mt-2 text-gray800">
							{{ telegram ? telegram : 'Данные не заполнены' }}
						</p>
						<p class="body-regular | mt-1 gray-secondary">Telegram</p>
					</div>
				</div>
				<div v-if="facebook" class="d-flex align-end">
					<div class="pa-3 d-flex align-center bg-purple100 rounded-lg">
						<img src="@/assets/contact-icons/facebook.svg" alt="" />
					</div>
					<div class="ml-4">
						<BaseSkeletonPath v-if="isLoading" :width="127" :height="16" class="mt-2" />
						<p v-else class="body-regular | mt-2 text-gray800">
							{{ facebook ? facebook : 'Данные не заполнены' }}
						</p>
						<p class="body-regular | mt-1 gray-secondary">Facebook</p>
					</div>
				</div>
			</v-col>
			<v-col v-if="contact_email" sm="12" md="6" class="d-flex flex-column gap-5">
				<div class="d-flex align-end">
					<div class="pa-3 d-flex align-center bg-purple100 rounded-lg">
						<img src="@/assets/contact-icons/mail.svg" alt="" />
					</div>
					<div class="ml-4">
						<BaseSkeletonPath v-if="isLoading" :width="127" :height="16" class="mt-2" />
						<p v-else class="body-regular | mt-2 text-gray800">
							{{ contact_email ? contact_email : 'Данные не заполнены' }}
						</p>
						<p class="body-regular | mt-1 gray-secondary">{{ t('Mail') }}</p>
					</div>
				</div>
				<div v-if="whatsapp" class="d-flex align-end">
					<div class="pa-3 d-flex align-center bg-purple100 rounded-lg">
						<img src="@/assets/contact-icons/whatsapp.svg" alt="" />
					</div>
					<div class="ml-4">
						<BaseSkeletonPath v-if="isLoading" :width="127" :height="16" class="mt-2" />
						<p v-else class="body-regular | mt-2 text-gray800">
							{{ whatsapp ? whatsapp : 'Данные не заполнены' }}
						</p>
						<p class="body-regular | mt-1 gray-secondary">Whatsapp</p>
					</div>
				</div>
				<div v-if="instagram" class="d-flex align-end">
					<div class="pa-3 d-flex align-center bg-purple100 rounded-lg">
						<img src="@/assets/contact-icons/instagram.svg" alt="" />
					</div>
					<div class="ml-4">
						<BaseSkeletonPath v-if="isLoading" :width="127" :height="16" class="mt-2" />
						<p v-else class="body-regular | mt-2 text-gray800">
							{{ instagram ? instagram : 'Данные не заполнены' }}
						</p>
						<p class="body-regular | mt-1 gray-secondary">Instagram</p>
					</div>
				</div>
			</v-col>
		</v-row>
	</BaseCard>
</template>

<script setup>
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
</script>
