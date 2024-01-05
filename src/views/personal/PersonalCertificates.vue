<template>
	<BaseCard class="pa-8">
		<h4 class="headers-4 | text-gray-800">Сертификаты</h4>
		<div class="certificates mt-7">
			<template v-if="info.length">
				<BaseCard v-for="certificate in info" :key="certificate.id" class="certificates__item certificate"
					color="background" @click="isEditingMode ? false : openOnFullScreen(certificate)">
					<BaseSkeletonPath v-if="isLoading || localLoading" :width="'100%'" :height="160" />
					<img v-else :src="certificate.file" :alt="certificate.file" />
					<button v-if="isEditingMode && !localLoading" class="certificate__button"
						@click="deleteItem(certificate.id)">
						<img src="@/assets/delete.svg" alt="delete icon" />
					</button>
				</BaseCard>
			</template>
			<BaseCard v-if="uploadedFile.file.size && isEditingMode" class="certificates__item certificate"
				color="background">
				<BaseSkeletonPath v-if="isLoading || localLoading" :width="'100%'" :height="160" />
				<img v-else :src="uploadedFile.fileUrl" class="certificate__img" />
				<template v-if="!localLoading">
					<button class="certificate__button" @click="deleteUploadedFile()">
						<img src="@/assets/delete.svg" alt="delete icon" />
					</button>
					<div class="mt-2d-flex align-center gap-2 w-100">
						<p class="body-regular | gray-secondary">Название:</p>
						<BaseInput2 v-model="uploadedFile.fileName" class="uploaded-file__input" />
					</div>
					<p class="body-regular | gray-secondary">
						Размер: {{ fileSize(uploadedFile.file.size) }}
					</p>
				</template>
			</BaseCard>
			<BaseCard v-if="!uploadedFile.file.size" class="certificates__item certificate" color="background"
				:disabled="isLoading || uploadedFile.file.size || localLoading" @click="
					$refs.fileInput.click(),
					emit('activate-edit-mode')
					">
				<img src="@/assets/icons/plus.svg" class="certificate__add-icon" alt="" />
				<p class="caption-2-regular | mt-2 text-primary">Добавить сертификат</p>
			</BaseCard>
			<input ref="fileInput" type="file" class="d-none" accept="image/*" @change="handleFileUpload"
				@click="$event.target.value = ''" />
		</div>
		<template v-if="isEditingMode">
			<div class="mt-8 d-flex gap-2 align-center">
				<AppButton :disabled="!uploadedFile.file.size" :loading="isLoading" theme="primary" text="Сохранить"
					@click="saveNewCertificate(uploadedFile)" />
				<AppButton :disabled="isLoading" theme="outline" text="Отменить" @click="emit('on-cancel')" />
			</div>
		</template>
		<template v-else>
			<AppButton :disabled="isLoading" theme="outline" :text="t('Edit')" class="mt-8"
				@click="emit('activate-edit-mode')" />
		</template>
		<BaseModal :show-modal="showModal" :max-width="1050" :max-height="705" @on-close="closeModal()">
			<div class="single-certificate">
				<div class="single-certificate__img-wrapper">
					<img :src="modalContent.file" :alt="modalContent.file" class="single-certificate__img" />
				</div>
				<div class="single-certificate__buttons mt-6">
					<AppButton :disabled="modalContent.id === firstCertificate" theme="outline" text="Назад"
						@click="prevCertificate(modalContent.id)" />
					<AppButton theme="outline" text="Удалить сертификат" @click="deleteItem(modalContent.id)" />
					<AppButton :disabled="modalContent.id === lastCertificate" theme="outline" text="Вперёд"
						@click="nextCertificate(modalContent.id)" />
				</div>
			</div>
		</BaseModal>
	</BaseCard>
</template>

<script setup>
import { ref, inject, computed } from 'vue'
import AppButton from '@/components/AppButton.vue'
import { getCookie } from '@/plugins/cookie'
import { useUserStore } from '@/stores/user'
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
	info: {
		type: Array,
		default: [],
	},
})

const emit = defineEmits(['activate-edit-mode', 'on-save', 'on-cancel'])

const store = useUserStore()

const url = ref('')

const fileInput = ref(null)
const defaultUploadedFile = () => ({
	file: {},
	fileName: '',
	fileUrl: '',
})
const uploadedFile = ref(defaultUploadedFile())

const handleFileUpload = (event) => {
	const file = event.target.files[0]
	if (!file) return
	uploadedFile.value.file = file
	const type = file.type.split('/')[1]
	uploadedFile.value.type = type
	uploadedFile.value.fileUrl = URL.createObjectURL(file)
}

const fileSize = (size) => {
	if (!size) return ''
	const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))
	return (size / Math.pow(1000, i)).toFixed(2) * 1 + ' ' + ['Б', 'Кб', 'Мб', 'Гб', 'Тб'][i]
}

const localLoading = ref(false)
const http_client = inject('http_client')
const saveNewCertificate = async (event) => {
	try {
		localLoading.value = true
		const accessToken = getCookie('accessToken')
		let formData = new FormData()
		formData.append('file', event.file, `${event.fileName}.${event.type}`)
		formData.append('name', `${event.fileName}.${event.type}`)

		const response = await http_client.post('/profile/my/certificates/', formData, {
			headers: { Authorization: `Bearer ${accessToken}` },
		})

		if (response.status === 200) {
			emit('on-save')
			deleteUploadedFile()
			await store.fetchUserData()
		} else {
			console.log(response.message)
		}
	} catch (error) {
		console.error(error)
	} finally {
		localLoading.value = false
	}
}

const deleteItem = async (event) => {
	closeModal()
	try {
		localLoading.value = true
		const accessToken = getCookie('accessToken')

		const response = await http_client.delete(`/profile/my/certificates/${event}`, {
			headers: { Authorization: `Bearer ${accessToken}` },
		})

		if (response.status === 204) {
			await store.fetchUserData()
		} else {
			console.log(response.message)
		}
	} catch (error) {
		console.error(error)
	} finally {
		localLoading.value = false
	}
}

const deleteUploadedFile = () => (uploadedFile.value = defaultUploadedFile())

const showModal = ref(false)
const modalContent = ref({})
const openOnFullScreen = (event) => {
	modalContent.value = event
	showModal.value = true
	document.querySelector('.personal-layout').style.zIndex = 1000
}
const closeModal = () => {
	showModal.value = false
	document.querySelector('.personal-layout').style.zIndex = ''
}
const prevCertificate = (id) => {
	const current = props.info.findIndex((item) => item.id === id)
	modalContent.value = props.info[current - 1]
	console.log(current)
}
const nextCertificate = (id) => {
	const current = props.info.findIndex((item) => item.id === id)
	modalContent.value = props.info[current + 1]
	console.log(current)
}

const firstCertificate = computed(() => props.info[0].id)
const lastCertificate = computed(() => props.info[props.info.length - 1].id)
</script>

<style lang="scss" scoped>
.certificates {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(3, 1fr);

	@media (max-width: 1770px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 767px) {
		grid-template-columns: 1fr;
	}

	&__item {
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: var(--base-transition);
		cursor: pointer;
		max-width: 500px;

		@media (max-width: 767px) {
			max-width: none;
		}

		&:hover,
		&:focus {
			box-shadow: var(--hover-shadow);
		}

		img {
			width: 100%;
			height: auto;
		}
	}
}

.certificate {
	padding: 12px;
	position: relative;
	flex-direction: column;

	@media (min-width: 600px) {
		padding: 32px;
	}

	&__add-icon {
		max-width: 24px;
		max-height: 24px;
	}

	&__button {
		position: absolute;
		top: 20px;
		right: 20px;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid rgb(var(--v-theme-gray400));
		border-radius: 12px;
		background: rgb(var(--v-theme-background-primary));

		& img {
			width: 24px;
			height: 24px;
		}
	}
}

.single-certificate {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;

	&__img {
		width: 100%;

		&__wrapper {
			width: 100%;
		}
	}

	&__buttons {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
}
</style>
