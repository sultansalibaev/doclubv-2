<template>
	<BaseCard class="pa-8">
		<h4 class="headers-4 | text-gray900">Персональная информация</h4>
		<div class="mt-7">
			<h5 class="headers-5 | text-gray900">О себе</h5>
			<template v-if="isLoading">
				<BaseSkeletonPath :width="'100%'" :height="16" class="mt-2" />
				<BaseSkeletonPath :width="'100%'" :height="16" class="mt-2" />
				<BaseSkeletonPath :width="'50%'" :height="16" class="mt-2" />
			</template>
			<template v-else-if="isEditingMode">
				<BaseTextarea v-model="local.about" placeholder="Расскажите о себе" class="mt-4" />
			</template>
			<template v-else>
				<p class="body-regular | mt-2 text-gray800 text-pre-wrap">
					{{ local.about ? local.about : 'Заполните информацию о себе' }}
				</p>
			</template>
		</div>
		<v-row class="mt-7">
			<v-col sm="12" md="6">
				<h5 class="headers-5 | text-gray-800">Должность</h5>
				<BaseSkeletonPath v-if="isLoading" :width="'100%'" :height="16" class="mt-2" />
				<template v-else-if="isEditingMode">
					<BaseInput2 v-model="local.job" class="mt-4" />
				</template>
				<template v-else>
					<p class="body-regular | mt-2 text-gray800">
						{{ local.job ? local.job : 'Добавьте должность' }}
					</p>
				</template>
			</v-col>
			<v-col sm="12" md="6">
				<h5 class="headers-5 | text-gray-800">Специализация</h5>
				<BaseSkeletonPath v-if="isLoading" :width="'100%'" :height="16" class="mt-2" />
				<template v-else-if="isEditingMode">
					<!--					<BaseDropdown-->
					<!--						v-model="local.specialization"-->
					<!--						:items="specializations"-->
					<!--						multiply-->
					<!--						class="mt-4"-->
					<!--					/>-->
					<v-autocomplete v-model="local.specialization" :items="specializations" bg-color="white100" chips
						class="mt-4" closable-chips density="compact" item-title="name" item-value="id" multiple
						variant="outlined">
						<template v-slot:chip="{ props, item }">
							<v-chip v-bind="props" :text="item?.raw?.name" color="primary" text-color="white100"
								variant="elevated" />
						</template>

						<template v-slot:item="{ props, item }">
							<v-list-item v-bind="props" :title="item?.raw?.name" />
						</template>
					</v-autocomplete>
				</template>
				<template v-else-if="local.specialization.length">
					<p v-for="item in local.specialization" :key="item.id" class="body-regular | mt-2 text-gray800">
						{{ item.name }}
					</p>
				</template>
				<template v-else>
					<p class="body-regular | mt-2 text-gray800">{{ local.specialization.length ? local.specialization :
						t('Not filled in') }}</p>
				</template>
			</v-col>
		</v-row>
		<div class="mt-7">
			<h5 class="headers-5 | text-gray900">{{ t('Contacts') }}</h5>
			<v-row class="mt-5">
				<v-col cols="12" md="6">
					<div class="d-flex align-end">
						<div v-if="isEditingMode" class="d-flex flex-column w-100">
							<p class="body-regular | gray-secondary">{{ t('Telephone') }}</p>
							<BaseInput2 v-model="local.personal_phone" class="mt-4" />
						</div>
						<template v-else>
							<div class="pa-3 d-flex align-center bg-purple100 rounded-lg">
								<img src="@/assets/contact-icons/phone-call.svg" alt="" />
							</div>
							<div class="ml-4">
								<BaseSkeletonPath v-if="isLoading" :width="127" :height="16" class="mt-2" />
								<p v-else class="body-regular | mt-2 text-gray800">
									{{ local.personal_phone ? local.personal_phone : t('Not filled in') }}
								</p>
								<p class="body-regular | mt-1 gray-secondary">{{ t('Telephone') }}</p>
							</div>
						</template>
					</div>
					<div class="mt-5 d-flex align-end">
						<div v-if="isEditingMode" class="d-flex flex-column w-100">
							<p class="body-regular | gray-secondary">Telegram</p>
							<BaseInput2 v-model="local.telegram" class="mt-4" />
						</div>
						<template v-else>
							<div class="pa-3 d-flex align-center bg-purple100 rounded-lg">
								<img src="@/assets/contact-icons/tg.svg" alt="" />
							</div>
							<div class="ml-4">
								<BaseSkeletonPath v-if="isLoading" :width="127" :height="16" class="mt-2" />
								<p v-else class="body-regular | mt-2 text-gray800">
									{{ local.telegram ? local.telegram : t('Add your nickname or link') }}
								</p>
								<p class="body-regular | mt-1 gray-secondary">Telegram</p>
							</div>
						</template>
					</div>
					<div class="mt-5 d-flex align-end">
						<div v-if="isEditingMode" class="d-flex flex-column w-100">
							<p class="body-regular | gray-secondary">Facebook</p>
							<BaseInput2 v-model="local.facebook" class="mt-4" />
						</div>
						<template v-else>
							<div class="pa-3 d-flex align-center bg-purple100 rounded-lg">
								<img src="@/assets/contact-icons/facebook.svg" alt="" />
							</div>
							<div class="ml-4">
								<BaseSkeletonPath v-if="isLoading" :width="127" :height="16" class="mt-2" />
								<p v-else class="body-regular | mt-2 text-gray800">
									{{ local.facebook ? local.facebook : t('Add your nickname or link') }}
								</p>
								<p class="body-regular | mt-1 gray-secondary">Facebook</p>
							</div>
						</template>
					</div>
				</v-col>
				<v-col cols="12" md="6">
					<div class="d-flex align-end">
						<div v-if="isEditingMode" class="d-flex flex-column w-100">
							<p class="body-regular | gray-secondary">{{ t('Mail') }}</p>
							<BaseInput2 v-model="local.contact_email" class="mt-4" />
						</div>
						<template v-else>
							<div class="pa-3 d-flex align-center bg-purple100 rounded-lg">
								<img src="@/assets/contact-icons/mail.svg" alt="" />
							</div>
							<div class="ml-4">
								<BaseSkeletonPath v-if="isLoading" :width="127" :height="16" class="mt-2" />
								<p v-else class="body-regular | mt-2 text-gray800">
									{{ local.contact_email ? local.contact_email : t('Add email address mail') }}
								</p>
								<p class="body-regular | mt-1 gray-secondary">{{ t('Mail') }}</p>
							</div>
						</template>
					</div>
					<div class="mt-5 d-flex align-end">
						<div v-if="isEditingMode" class="d-flex flex-column w-100">
							<p class="body-regular | gray-secondary">Whatsapp</p>
							<BaseInput2 v-model="local.whatsapp" class="mt-4" />
						</div>
						<template v-else>
							<div class="pa-3 d-flex align-center bg-purple100 rounded-lg">
								<img src="@/assets/contact-icons/whatsapp.svg" alt="" />
							</div>
							<div class="ml-4">
								<BaseSkeletonPath v-if="isLoading" :width="127" :height="16" class="mt-2" />
								<p v-else class="body-regular | mt-2 text-gray800">
									{{ local.whatsapp ? local.whatsapp : 'Добавьте телефон или ссылку' }}
								</p>
								<p class="body-regular | mt-1 gray-secondary">Whatsapp</p>
							</div>
						</template>
					</div>
					<div class="mt-5 d-flex align-end">
						<div v-if="isEditingMode" class="d-flex flex-column w-100">
							<p class="body-regular | gray-secondary">Instagram</p>
							<BaseInput2 v-model="local.instagram" class="mt-4" />
						</div>
						<template v-else>
							<div class="pa-3 d-flex align-center bg-purple100 rounded-lg">
								<img src="@/assets/contact-icons/instagram.svg" alt="" />
							</div>
							<div class="ml-4">
								<BaseSkeletonPath v-if="isLoading" :width="127" :height="16" class="mt-2" />
								<p v-else class="body-regular | mt-2 text-gray800">
									{{ local.instagram ? local.instagram : t('Add your nickname or link') }}
								</p>
								<p class="body-regular | mt-1 gray-secondary">Instagram</p>
							</div>
						</template>
					</div>
				</v-col>
			</v-row>
		</div>
		<template v-if="isEditingMode">
			<div class="mt-8 d-flex gap-2 align-center">
				<AppButton :loading="isLoading" theme="outline" text="Сохранить" @click="emit('on-save', update(local))" />
				<AppButton :disabled="isLoading" theme="outline" text="Отменить" @click="cancelEditMode()" />
			</div>
		</template>
		<template v-else>
			<AppButton :disabled="isLoading" theme="outline" :text="t('Edit')" class="mt-8"
				@click="emit('activate-edit-mode')" />
		</template>
	</BaseCard>
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
	isEditingMode: {
		type: Boolean,
		default: false,
	},
	about: {
		type: String,
		default: '',
	},
	specialization: {
		type: Object,
		default: {},
	},
	job: {
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
	specializations: {
		type: Array,
		default: [],
	},
})

const emit = defineEmits(['activate-edit-mode', 'on-save', 'on-cancel'])

const defaultLocal = () => ({
	about: props.about,
	specialization: props.specialization,
	job: props.job,
	personal_phone: props.contact_phone,
	telegram: props.telegram,
	facebook: props.facebook,
	contact_email: props.contact_email,
	whatsapp: props.whatsapp,
	instagram: props.instagram,
})
const local = ref(defaultLocal())

const cancelEditMode = () => {
	emit('on-cancel')
	local.value = defaultLocal()
}

const update = (data) => {
	return {
		about: data.about,
		contact_email: data.contact_email,
		personal_phone: data.personal_phone,
		facebook: data.facebook,
		instagram: data.instagram,
		position_str: data.job,
		specialization: data.specialization.map((item) => (item.id ? item.id : item)),
		telegram: data.telegram,
		whatsapp: data.whatsapp,
	}
}

watch(
	() => props.isLoading,
	(newValue) => {
		if (newValue === false) local.value = defaultLocal()
	},
)
</script>

<style lang="scss" scoped>
.gray-secondary {
	color: rgba(var(--v-theme-gray900), 0.5);
}
</style>
