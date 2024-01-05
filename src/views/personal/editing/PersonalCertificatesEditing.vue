<template>
	<BaseModal
			:show-modal="showModal"
			:max-width="680"
			:max-height="1100"
			title="Сертификаты"
			@on-close="emit('on-cancel')"
	>
		<div class="certificates">
			<BaseCard
					v-for="certificate in certificates"
					:key="certificate.id"
					class="certificates__item certificate"
					color="background"
			>
				<BaseSkeletonPath v-if="isLoading" :width="'100%'" :height="160" />
				<img v-else :src="certificate.file" :alt="certificate.file" />
				<button class="certificate__button" @click="deleteCertificate(certificate.id)">
					<img src="@/assets/delete.svg" alt="delete icon" />
				</button>
			</BaseCard>
			<BaseCard
					v-if="!uploadedFile.file.size"
					class="certificates__item certificate"
					color="background"
					:disabled="isLoading || uploadedFile.file.size"
					@click="$refs.fileInput.click()"
			>
				<img src="@/assets/icons/plus.svg" class="certificate__add-icon" alt="" />
				<p class="caption-2-regular | text-center mt-2 text-primary">Добавить сертификат</p>
			</BaseCard>
			<BaseCard
					v-else
					class="certificates__item certificate"
					color="background"
			>
				<BaseSkeletonPath v-if="isLoading" :width="'100%'" :height="160" />
				<img v-else :src="uploadedFile.fileUrl" class="certificate__img" />
				<button class="certificate__button" @click="deleteUploadedFile()">
					<img src="@/assets/delete.svg" alt="delete icon" />
				</button>
				<div class="mt-2 w-100">
					<p class="body-regular | gray-secondary">Название:</p>
					<BaseInput2
							v-model="uploadedFile.fileName"
							class="mt-2 uploaded-file__input"
					/>
				</div>
				<p class="body-regular | mt-2 gray-secondary">
					Размер: {{ fileSize(uploadedFile.file.size) }}
				</p>
				<AppButton
						:disabled="!uploadedFile.file.size"
						:loading="isLoading"
						theme="primary"
						text="Сохранить"
						block
						class="mt-8"
						@click="saveNewCertificate(uploadedFile)"
				/>
			</BaseCard>
		</div>
		<AppButton
			theme="outline"
			text="Отменить"
			class="mt-8"
			@click="emit('on-cancel')"
		/>
		<input
				ref="fileInput"
				type="file"
				class="d-none"
				accept="image/*"
				@change="handleFileUpload"
				@click="$event.target.value = ''"
		/>
	</BaseModal>
</template>

<script setup>
import { ref } from 'vue'
import { useCertificatesStore } from '@/stores/certificates'
import AppButton from '@/components/AppButton.vue'

const certificatesStore = useCertificatesStore()

const props = defineProps({
	isLoading: {
		type: Boolean,
		default: false,
	},
	certificates: {
		type: Array,
		default: [],
	},
})

const emit = defineEmits(['on-cancel', 'delete-item'])

const showModal = ref(true)

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

const deleteUploadedFile = () => (uploadedFile.value = defaultUploadedFile())

const saveNewCertificate = async (event) => {
	await certificatesStore.saveNewCertificate(event).then(() => {
		deleteUploadedFile()
		emit('on-cancel')
	})
}
const deleteCertificate = async (event) => {
	await certificatesStore.deleteCertificate(event).then(() => {
		deleteUploadedFile()
		emit('on-cancel')
	})
}
</script>

<style lang="scss" scoped>
.certificates {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(3, 1fr);

	@media (max-width: 2000px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (max-width: 1599px) {
		grid-template-columns: 1fr;
	}

	&__item {
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: var(--base-transition);
		cursor: pointer;

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
</style>