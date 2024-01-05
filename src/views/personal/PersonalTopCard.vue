<template>
	<BaseCard class="pa-8 d-flex align-center justify-space-between">
		<div class="user-card">
			<template v-if="isLoading">
				<PersonalTopCardSkeleton />
			</template>
			<template v-else>
				<div class="user-card__info">
					<div :class="isEditingMode ? 'logo-wrapper' : ''" class="user-card__avatar-container"
						@click="isEditingMode ? (isOpenedModal = true) : false">
						<img v-if="photo" :src="photo" :alt="`${firstName} ${lastName} ${middleName}`"
							class="user-card__avatar logo" />
						<img v-else src="/src/assets/profile-avatars/avatar.png" alt="no photo"
							class="user-card__avatar logo" />
						<img v-if="isEditingMode" src="@/assets/icons/edit-alt.svg" alt="" class="edit-logo" />
					</div>
					<div class="ml-5">
						<h5 class="headers-5 | text-gray900">
							{{ firstName }} {{ lastName }} {{ middleName }}
						</h5>
						<p v-if="city?.name" class="small-regular | text-gray800">{{ country }}, {{ city?.name }}</p>
					</div>
				</div>
				<div class="user-card__buttons">
					<template v-if="isEditingMode">
						<AppButton :loading="isLoading" :text="'Сохранить'" :theme="'primary'" target="_blank"
							@click="emit('on-save')" />
						<AppButton :disabled="isLoading" :text="'Отмена'" :theme="'outline'" class="ml-4"
							@click="emit('on-cancel')" />
					</template>
					<template v-else>
						<AppButton :disabled="isLoading" :text="t('Edit')" :theme="'outline'" @click="emit('on-editing')" />
					</template>
				</div>
			</template>
		</div>
		<BaseDialog v-model="isOpenedModal" :max-width="400">
			<BaseCard class="pa-6">
				<div class="d-flex align-end justify-space-between">
					<h4 class="headers-4 | text-gray900">Новый аватар</h4>
					<v-icon icon="mdi-close" size="28" @click="isOpenedModal = false" />
				</div>
				<p class="body-regular | mt-5 text-gray800">
					Загрузите своё фото или выберите аватар из представленных шаблонов
				</p>
				<div class="avatars">
					<div v-if="uploadedFile.file.size"
						:class="uploadedFile.fileUrl === selectedFile?.fileUrl ? 'avatar--selected' : ''"
						class="avatars__avatar avatar" @click="avatarEntered(uploadedFile)">
						<img :src="uploadedFile.fileUrl" :alt="`photo-`" class="avatar__photo" />
					</div>
					<div v-else :class="uploadedFile.fileUrl === selectedFile?.fileUrl ? 'avatar--selected' : ''"
						class="avatars__avatar avatar" @click="$refs.fileInput.click()">
						<img src="@/assets/default-work-place-logo.png" :alt="`photo-`" class="avatar__photo" />
					</div>
					<input ref="fileInput" type="file" accept="image/*" class="d-none" @change="handleFileUpload"
						@click="$event.target.value = ''" />
					<!--                    <div-->
					<!--                        v-for="(image, index) in images"-->
					<!--                        :key="image"-->
					<!--                        :class="[-->
					<!--                            image.fileUrl === selectedFile?.fileUrl ? 'avatar&#45;&#45;selected' : '',-->
					<!--                            // photo.includes(image.file) && image.fileUrl === selectedFile?.fileUrl ? 'avatar&#45;&#45;selected' : ''-->
					<!--                        ]"-->
					<!--                        class="avatars__avatar avatar"-->
					<!--                        @click="avatarEntered(image)"-->
					<!--                    >-->
					<!--                        <img-->
					<!--                            :src="buildType === 'development' ? `/src${image.fileUrl}` : `${image.fileUrl}`"-->
					<!--                            :alt="`photo-${index}`"-->
					<!--                            class="avatar__photo"-->
					<!--                        />-->
					<!--                    </div>-->
					<div :class="[imageAvatar?.fileUrl === selectedFile?.fileUrl ? 'avatar--selected' : '']"
						class="avatars__avatar avatar" @click="avatarEntered(imageAvatar)">
						<img src="@/assets/profile-avatars/avatar.png" :alt="`photo-${imageAvatar?.file}`"
							class="avatar__photo" />
					</div>
					<div :class="[imageMale?.fileUrl === selectedFile?.fileUrl ? 'avatar--selected' : '']"
						class="avatars__avatar avatar" @click="avatarEntered(imageMale)">
						<img src="@/assets/profile-avatars/male.png" :alt="`photo-${imageMale?.file}`"
							class="avatar__photo" />
					</div>
					<div :class="[imageFemale?.fileUrl === selectedFile?.fileUrl ? 'avatar--selected' : '']"
						class="avatars__avatar avatar" @click="avatarEntered(imageFemale)">
						<img src="@/assets/profile-avatars/female.png" :alt="`photo-${imageFemale?.file}`"
							class="avatar__photo" />
					</div>
				</div>
				<div class="mt-5 d-flex gap-4">
					<AppButton :loading="isLoading" :disabled="!selectedFile" block theme="primary" text="Сохранить"
						@click="saveNewPhoto()" />
					<AppButton :disabled="isLoading" block theme="outline" text="Загрузить"
						@click="$refs.fileInput.click()" />
				</div>
			</BaseCard>
		</BaseDialog>
	</BaseCard>
</template>

<script setup>
import { computed, ref } from 'vue'
import AppButton from '@/components/AppButton.vue'
import PersonalTopCardSkeleton from '@/views/personal/PersonalTopCardSkeleton.vue'
import { useUserStore } from '@/stores/user'
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const userStore = useUserStore()

const props = defineProps({
	isLoading: {
		type: Boolean,
		required: true,
	},
	isEditingMode: {
		type: Boolean,
	},
	firstName: {
		type: String,
		default: '',
	},
	lastName: {
		type: String,
		default: '',
	},
	middleName: {
		type: String,
		default: '',
	},
	country: {
		type: String,
		default: '',
	},
	city: {
		type: Object,
		default: {},
	},
	photo: {
		type: String,
		default: '',
	},
})

const emit = defineEmits(['on-editing', 'on-save', 'on-cancel', 'on-photo-select'])

const imageAvatar = {
	file: 'nogender.png',
	fileUrl: '/assets/profile-avatars/avatar.png',
}
const imageMale = {
	file: 'male.png',
	fileUrl: '/assets/profile-avatars/male.png',
}
const imageFemale = {
	file: 'female.png',
	fileUrl: '/assets/profile-avatars/female.png',
}

const isOpenedModal = ref(false)

const selectedFile = ref(null)
const avatarEntered = (image) => {
	selectedFile.value = null
	selectedFile.value = image
}
const saveNewPhoto = async () => {
	if (uploadedFile.value.fileUrl === selectedFile.value.fileUrl) {
		try {
			let formData = new FormData()
			formData.append('photo', uploadedFile.value.file, uploadedFile.value.file.name)
			await userStore.editUserData(formData)
		} catch (error) {
			console.error(error)
		} finally {
			emit('on-cancel')
		}
	} else emit('on-photo-select', { photo: selectedFile.value.file })

	isOpenedModal.value = false
	deleteUploadedFile()
	deleteSelectedFile()
}

const fileInput = ref(null)

const defaultUploadedFile = () => ({
	file: {},
	fileUrl: '',
})
const uploadedFile = ref(defaultUploadedFile())
const deleteUploadedFile = () => (uploadedFile.value = defaultUploadedFile())
const deleteSelectedFile = () => (selectedFile.value = null)
const handleFileUpload = (event) => {
	const file = event.target.files[0]
	if (!file) return
	uploadedFile.value.file = file
	uploadedFile.value.type = file.type.split('/')[1]
	uploadedFile.value.fileUrl = URL.createObjectURL(file)
	selectedFile.value = uploadedFile.value
}
</script>

<style lang="scss" scoped>
.user-card {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20px;

	@media (max-width: 768px) {
		flex-direction: column;
		align-items: flex-start;
	}

	&__avatar-container {
		min-width: 60px;
		max-width: 60px;
		width: 60px;
		min-height: 60px;
		max-height: 60px;
		height: 60px;
		display: flex;
		justify-content: center;
		align-items: center;

		overflow: hidden;
		border-radius: 50%;
	}

	&__avatar {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	&__info {
		display: flex;
		align-items: center;
	}

	&__buttons {
		display: flex;
		align-items: flex-end;
	}
}

.logo-wrapper {
	display: flex;
	cursor: pointer;
	position: relative;
	background-color: rgba(0, 0, 0, 0.7);

	& .logo {
		opacity: 0.3;
		transition: var(--base-transition);
	}

	& .edit-logo {
		opacity: 1;
		transition: var(--base-transition);
	}
}

.logo {
	width: 100%;
	opacity: 1;
}

.edit-logo {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	opacity: 0;
}

.avatars {
	margin: 20px 0 0;
	display: flex;
	max-height: 220px;
	overflow-x: scroll;
	flex-wrap: wrap;
	gap: 13px;

	@media (max-width: 455px) {
		justify-content: space-around;
	}

	& .avatar {
		position: relative;
		width: 100px;
		height: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 3px;
		box-sizing: border-box;
		cursor: pointer;

		transition: var(--base-transition);

		&.avatar--selected .avatar__photo {
			outline: 3px solid #5ba85a;
		}

		&.avatar--selected:after {
			position: absolute;
			top: -5px;
			right: -5px;
			content: url('@/assets/icons/alert-success.svg');
			background: #ffffff;
			border-radius: 50%;
			width: 24px;
			height: 24px;
		}

		&__photo {
			overflow: hidden;
			border-radius: 50%;
			object-fit: cover;
			width: 100%;
			height: 100%;

			&:hover {
				outline: 1px solid #5ba85a;
			}
		}
	}
}
</style>
