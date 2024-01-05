<template>
	<BaseCard class="personal-controls">
		<template v-if="isLoading">
			<BaseSkeletonPath
				:width="266"
				:height="266"
				:border-radius="16"
			/>
		</template>
		<template v-else>
			<div
					:class="['logo-wrapper']"
					class="personal-controls__avatar-container"
					@click="openModal()"
			>
				<img
						v-if="photo"
						:src="photo"
						:alt="`${firstName} ${lastName} ${middleName}`"
						class="personal-controls__avatar logo"
				/>
				<img
						v-else
						src="@/assets/profile-avatars/avatar.png"
						alt="no photo"
						class="personal-controls__avatar logo"
				/>
				<img src="@/assets/icons/camera.svg" alt="" class="edit-logo" />
			</div>
			<div class="personal-controls__personal-info">
				<h2 class="headers-2 | ">
					{{ firstName }} {{ lastName }} {{ middleName }}
				</h2>
				<p v-if="city" class="small-regular | mt-2 text-gray800">{{ country }}, {{ city }}</p>
			</div>
			<div class="personal-controls__control-buttons">
				<ul class="controls-list">
					<li
						v-for="control in controls"
						:key="control.name"
						:class="[
								'caption-1-regular | controls-item',
								control.value ? 'controls-item--isActive' : ''
						]"
						@click="emit('on-change-control', control)"
					>
						{{ control.name }}
					</li>
				</ul>
			</div>
      <BaseModal
          :show-modal="isOpenedModal"
          :persistent="true"
          :max-width="450"
          title="Фото профиля"
          @on-close="closeModal()"
      >
				<p class="body-regular | text-gray800">
					{{ t('Upload your photo or choose from the provided templates') }}
				</p>
				<BaseCropper
						:cropper-event="cropperEvent"
						@on-save="setCropperFile($event)"
				/>
				<div class="avatars">
					<div
							v-if="uploadedFile.file.size"
							:class="uploadedFile.fileUrl === selectedFile?.fileUrl ? 'avatar--selected' : ''"
							class="avatars__avatar avatar"
							@click="uploadedFile.file.size ? avatarEntered(uploadedFile) : $refs.fileInput.click()"
					>
						<img :src="uploadedFile.fileUrl" :alt="`photo-`" class="avatar__photo" />
					</div>
					<input
							ref="fileInput"
							type="file"
							accept="image/*"
							class="d-none"
							@change="handleFileUpload"
							@click="$event.target.value = ''"
					/>
					<div
							:class="[(!selectedFile || photo === selectedFile?.fileUrl) ? 'avatar--selected' : '']"
							class="avatars__avatar avatar"
							@click="avatarEntered({file: 'current', fileUrl: photo})"
					>
						<img
								:src="photo"
								:alt="`photo-${imageAvatar?.file}`"
								class="avatar__photo"
						/>
					</div>
					<div
							:class="[imageAvatar?.fileUrl === selectedFile?.fileUrl ? 'avatar--selected' : '']"
							class="avatars__avatar avatar"
							@click="avatarEntered(imageAvatar)"
					>
						<img
								src="@/assets/profile-avatars/avatar.png"
								:alt="`photo-${imageAvatar?.file}`"
								class="avatar__photo"
						/>
					</div>
					<div
							:class="[imageMale?.fileUrl === selectedFile?.fileUrl ? 'avatar--selected' : '']"
							class="avatars__avatar avatar"
							@click="avatarEntered(imageMale)"
					>
						<img
								src="@/assets/profile-avatars/male.png"
								:alt="`photo-${imageMale?.file}`"
								class="avatar__photo"
						/>
					</div>
					<div
							:class="[imageFemale?.fileUrl === selectedFile?.fileUrl ? 'avatar--selected' : '']"
							class="avatars__avatar avatar"
							@click="avatarEntered(imageFemale)"
					>
						<img
								src="@/assets/profile-avatars/female.png"
								:alt="`photo-${imageFemale?.file}`"
								class="avatar__photo"
						/>
					</div>
				</div>
				<div class="mt-5 avatars__buttons">
					<AppButton
							:loading="isLoading"
							:disabled="!selectedFile"
							block
							theme="primary"
							:text="t('Save')"
							@click="saveNewPhoto()"
					/>
					<AppButton
							:disabled="isLoading"
							block
							theme="outline"
							:text="selectedFile ? t('Upload new') : t('Download')"
							@click="$refs.fileInput.click()"
					/>
				</div>
      </BaseModal>
		</template>
	</BaseCard>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import AppButton from '@/components/AppButton.vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const userStore = useUserStore()

const props = defineProps({
	isEditingMode: {
		type: Boolean,
		default: false,
	},
	isLoading: {
		type: Boolean,
		default: false,
	},
	photo: {
		type: String,
		default: '',
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
	controls: {
		type: Array,
		required: true,
	},
	country: {
		type: String,
		default: '',
	},
	city: {
		type: String,
		default: '',
	},
})

const emit = defineEmits(['on-editing', 'on-save', 'on-cancel', 'on-photo-select', 'on-change-control'])

const isOpenedModal = ref(false)

const openModal = () => {
  isOpenedModal.value = true
  document.querySelector('.page-layout__main-content').style.zIndex = 1000
}
const closeModal = () => {
  isOpenedModal.value = false
  document.querySelector('.page-layout__main-content').style.zIndex = 0
  deleteUploadedFile()
  deleteSelectedFile()
}

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

const selectedFile = ref(null)
const avatarEntered = (image) => {
  selectedFile.value = null
  selectedFile.value = image
}

const fileInput = ref(null)

const defaultUploadedFile = () => ({
  file: {},
  fileUrl: '',
})
const uploadedFile = ref(defaultUploadedFile())
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return
  uploadedFile.value.file = file
  uploadedFile.value.type = file.type.split('/')[1]
  uploadedFile.value.fileUrl = URL.createObjectURL(file)
  selectedFile.value = uploadedFile.value
	cropperEvent.value = event
}

const cropperEvent = ref(null)
const setCropperFile = (event) => {
  uploadedFile.value.file = event
  uploadedFile.value.type = event.type.split('/')[1]
  uploadedFile.value.fileUrl = URL.createObjectURL(event)
  selectedFile.value = uploadedFile.value
}

const deleteUploadedFile = () => (uploadedFile.value = defaultUploadedFile())
const deleteSelectedFile = () => (selectedFile.value = null)

const saveNewPhoto = async () => {
  if (selectedFile.value.file === 'current') {
    closeModal()
    deleteUploadedFile()
    deleteSelectedFile()
  } else if (uploadedFile.value.fileUrl === selectedFile.value.fileUrl) {
    try {
      let formData = new FormData()
      formData.append('photo', uploadedFile.value.file, uploadedFile.value.file.name)
      await userStore.editUserData(formData).then(() => closeModal())
    } catch (error) {
      console.error(error)
    } finally {
      emit('on-cancel')
    }
  } else {
    emit('on-photo-select', { photo: selectedFile.value.file })
  }
}
</script>

<style lang="scss" scoped>
.personal-controls {
	display: flex;
	flex-direction: column;
	gap: 40px;

	@media screen and (max-width: 1599px) {
		flex-direction: row;
	}
	@media screen and (max-width: 1024px) {
		flex-direction: column;
	}

	&__control-buttons {
		@media screen and (max-width: 1024px) {
			display: none;
		}
	}
	&__personal-info {
		display: none;

		@media screen and (max-width: 1024px) {
			display: block;
		}
	}

	&__avatar-container {
		min-width: 266px;
		max-width: 266px;
		width: 266px;
		min-height: 266px;
		max-height: 266px;
		height: 266px;
		display: flex;
		justify-content: center;
		align-items: center;

		overflow: hidden;
		border-radius: 16px;

		@media screen and (max-width: 1599px){
			min-width: 266px;
			max-width: 440px;
			width: 100%;
			min-height: 266px;
			max-height: 440px;
			height: 100%;
		}
	}
	&__avatar {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
}

.controls {

	&-list {
		display: flex;
		flex-direction: column;
		gap: 16px;
		margin: 0 0 0 -16px;

		@media screen and (max-width: 699px){
			flex-direction: row;
			flex-wrap: wrap;
		}
	}
	&-item {
		width: fit-content;
		padding: 8px 16px;
		color: #1e1e1e;
		border-radius: 12px;
		list-style: none;
		cursor: pointer;
		text-wrap: nowrap;
		transition: var(--base-transition);

		&--isActive {
			background: #5C34F6;
			color: #FFFFFF;
		}

		&:hover {
			background: #D8D1FF;
		}
	}
}

.logo-wrapper:hover {
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
  max-height: 230px;
  overflow-x: scroll;
  flex-wrap: wrap;
  gap: 13px;

	&__buttons {
		display: flex;
		gap: 16px;

		@media (max-width: 455px) {
			flex-direction: column;
		}
	}
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
        outline: 2px solid #5ba85a;
      }
    }
  }
}


.cropper {
	height: 600px;
	width: 600px;
	background: #DDD;
}
</style>