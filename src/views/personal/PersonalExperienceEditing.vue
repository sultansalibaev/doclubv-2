<template>
	<div class="work-places mt-6">
		<div v-for="place in oldPlaces" :key="place.id">
			<h5 class="headers-5 | mb-4 text-grey900">{{ place.work_place_str }}</h5>
			<div class="work-place">
				<div class="work-place__top">
					<p class="caption-2-regular | d-sm-block text-gray800">Организация</p>
					<BaseInput
						v-model="place.work_place_str"
						:rules="[(v) => !!v || 'Необходимо заполнить']"
						bg-color="white100"
						class="mt-4"
						hide-details="true"
						variant="outlined"
					/>
				</div>
				<div class="work-place__bottom">
					<div class="work-place__logo">
						<p class="caption-2-regular | d-sm-block text-gray800">Лого</p>
						<div
							class="logo-wrapper"
							@click="updateLogo($refs.fileInputOldPlace.click(), place.id)"
						>
							<img
								v-if="place.logo"
								:src="place.logo.fileUrl ? place.logo.fileUrl : place.logo"
								alt=""
								class="logo"
							/>
							<img v-else src="@/assets/default-work-place-logo.png" alt="" class="logo" />
							<img src="@/assets/icons/edit-alt.svg" alt="" class="edit-logo" />
						</div>
					</div>
					<div class="work-place__position">
						<p class="caption-2-regular | d-sm-block text-gray800">Должность</p>
						<BaseInput
							v-model="place.position_str"
							:rules="[(v) => !!v || 'Необходимо заполнить']"
							bg-color="white100"
							class="mt-4"
							hide-details="true"
							variant="outlined"
						/>
					</div>
					<div class="work-place__dates">
						<div class="work-place__date">
							<p class="caption-2-regular | d-sm-block text-gray800">Начало работы</p>
							<BaseInput
								v-model="place.date_from"
								bg-color="white100"
								class="mt-4"
								hide-details="true"
								variant="outlined"
								type="date"
								@input="place.date_from = $event.target.value"
							/>
						</div>
						<div class="work-place__date">
							<p class="caption-2-regular | d-sm-block text-gray800">Окончание работы</p>
							<BaseInput
								v-model="place.date_to"
								bg-color="white100"
								class="mt-4"
								hide-details="true"
								variant="outlined"
								type="date"
								@input="place.date_to = $event.target.value"
							/>
						</div>
					</div>
					<div class="work-place__buttons-group">
						<p class="caption-2-regular | d-sm-block d-none text-gray800">Действие</p>
						<div class="work-place__buttons">
							<AppButton theme="outline" text="" class="edit-button" @click="editOldPlace(place)" />
							<AppButton
								theme="outline"
								text=""
								class="ml-2 delete-button"
								@click="emit('on-delete', place.id)"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div v-for="(place, index) in newPlaces" :key="place">
			<h5 class="headers-5 | mb-4 text-grey900">Новая организация {{ index + 1 }}</h5>
			<div class="work-place">
				<div class="work-place__top">
					<p class="caption-2-regular | d-sm-block text-gray800">Организация</p>
					<BaseInput
						v-model="place.work_place_str"
						:rules="[(v) => !!v || 'Необходимо заполнить']"
						bg-color="white100"
						class="mt-4"
						hide-details="true"
						variant="outlined"
					/>
				</div>
				<div class="work-place__bottom">
					<div class="work-place__logo">
						<p class="caption-2-regular | d-sm-block text-gray800">Лого</p>
						<div
							class="logo-wrapper"
							@click="updateNewLogo($refs.fileInputNewPlace.click(), index)"
						>
							<img v-if="place.logo.fileUrl" :src="place.logo.fileUrl" alt="" class="logo" />
							<img v-else src="@/assets/default-work-place-logo.png" alt="" class="logo" />
							<img src="@/assets/icons/edit-alt.svg" alt="" class="edit-logo" />
						</div>
					</div>
					<div class="work-place__position">
						<p class="caption-2-regular | d-sm-block text-gray800">Должность</p>
						<BaseInput
							v-model="place.position_str"
							:rules="[(v) => !!v || 'Необходимо заполнить']"
							bg-color="white100"
							class="mt-4"
							hide-details="true"
							variant="outlined"
						/>
					</div>
					<div class="work-place__dates">
						<div class="work-place__date">
							<p class="caption-2-regular | d-sm-block text-gray800">Начало работы</p>
							<BaseInput
								bg-color="white100"
								class="mt-4"
								hide-details="true"
								variant="outlined"
								type="date"
								@input="place.date_from = $event.target.value"
							/>
						</div>
						<div class="work-place__date">
							<p class="caption-2-regular | d-sm-block text-gray800">Окончание работы</p>
							<BaseInput
								bg-color="white100"
								class="mt-4"
								hide-details="true"
								variant="outlined"
								type="date"
								@input="place.date_to = $event.target.value"
							/>
						</div>
					</div>
					<div v-if="newPlaces.length > 1" class="work-place__buttons-group">
						<p class="caption-2-regular | d-sm-block d-none text-gray800">Действие</p>
						<div class="work-place__buttons">
							<AppButton
								theme="outline"
								text=""
								class="delete-button mt-4"
								@click="newPlaces.splice(index, 1)"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
		<input
			ref="fileInputNewPlace"
			type="file"
			class="d-none"
			accept="image/*"
			@change="handleFileUploadNewPlace"
			@click="$event.target.value = ''"
		/>
		<input
			ref="fileInputOldPlace"
			type="file"
			class="d-none"
			accept="image/*"
			@change="handleFileUploadOldPlace"
			@click="$event.target.value = ''"
		/>
	</div>
	<div class="mt-7 d-flex align-center gap-2 flex-wrap">
		<AppButton
			:disabled="isLoading"
			:text="'Добавить ещё'"
			:theme="'primary'"
			@click="addNewPlace()"
		/>
		<AppButton
			v-if="newPlaces.length"
			:theme="'outline'"
			:text="'Сохранить'"
			@click="pushNewPlace()"
		/>
		<AppButton theme="outline" text="Отменить" @click="emit('on-cancel')" />
	</div>
</template>

<script setup>
import { computed, onBeforeUpdate, ref } from 'vue'
import AppButton from '@/components/AppButton.vue'

const props = defineProps({
	isLoading: {
		type: Boolean,
		required: true,
	},
	places: {
		type: Array,
		default: [],
	},
})

const emit = defineEmits([
	'on-save-new-work-place',
	'activate-edit-mode',
	'on-delete',
	'on-edit',
	'on-edit-with-new-photo',
	'on-cancel',
])

const oldPlaces = ref(props.places)
const newPlaces = ref([])
const defaultNewPlace = () => ({
	logo: {},
	work_place_str: '',
	position_str: '',
	date_from: '',
	date_to: '',
})

const addNewPlace = () => newPlaces.value.push(defaultNewPlace())
const pushNewPlace = () => {
	emit('on-save-new-work-place', newPlaces.value)
	newPlaces.value = []
}

const fileInputOldPlace = ref(null)
const fileInputNewPlace = ref(null)

const localIndex = ref(0)
const localId = ref(0)
const updateLogo = (func, id) => {
	;() => func
	localId.value = id
}
const updateNewLogo = (func, index) => {
	;() => func
	localIndex.value = index
}
const handleFileUploadNewPlace = (event) => {
	const file = event.target.files[0]
	if (!file) return
	newPlaces.value[localIndex.value].logo.file = file
	newPlaces.value[localIndex.value].logo.fileUrl = URL.createObjectURL(file)
}

const editedOldPlace = ref({})
const handleFileUploadOldPlace = (event) => {
	const file = event.target.files[0]
	if (!file) return
	const edited = oldPlaces.value.filter((place) => place.id === localId.value)[0]
	edited.logo = {}
	edited.logo.file = file
	edited.logo.fileUrl = URL.createObjectURL(file)
	editedOldPlace.value = edited
}

const editOldPlace = (place) => {
	if (editedOldPlace.value?.logo?.fileUrl) emit('on-edit-with-new-photo', editedOldPlace.value)
	else emit('on-edit', place)
	editedOldPlace.value = {}
}
</script>

<style lang="scss" scoped>
.logo-wrapper {
	display: flex;
	margin: 16px 0 0;
	position: relative;
	width: 52px;
	min-width: 52px;
	max-width: 52px;
	height: 52px;
	min-height: 52px;
	max-height: 52px;
	overflow: hidden;
	border-radius: 12px;
	cursor: pointer;
	transition: var(--base-transition);

	&:hover {
		background-color: rgba(0, 0, 0, 0.7);

		& .logo {
			opacity: 0.3;
		}
		& .edit-logo {
			opacity: 1;
		}
	}
}
.logo {
	object-fit: cover;
	width: 100%;
	height: 100%;
	opacity: 1;
	transition: var(--base-transition);
}
.edit-logo {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	opacity: 0;
	transition: var(--base-transition);
}

.delete-button {
	width: 20px;
	height: 20px;
	background: url('/src/assets/delete.svg') no-repeat center center;
}
.edit-button {
	width: 20px;
	height: 20px;
	background: url('/src/assets/icons/edit-alt.svg') var(--button-primary-default-color) no-repeat
		center center;
}

.work-place {
	&__bottom {
		display: grid;
		grid-template-columns: 1fr 4fr 6fr 1fr;
		gap: 28px;
		margin: 16px 0 0;

		@media (max-width: 1709px) {
			display: flex;
			flex-direction: column;
		}
	}

	&__dates {
		display: grid;
		grid-template-columns: repeat(2, 6fr);
		gap: 28px;
		@media (max-width: 599px) {
			display: flex;
			flex-direction: column;
		}
	}

	&__buttons {
		display: flex;
		align-items: center;
		gap: 20px;
		margin: 16px 0 0;

		& button {
			@media (max-width: 599px) {
				width: 100%;
			}
		}

		&-group {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			width: 112px;
		}
	}
}

.work-places {
	display: grid;
	gap: 20px;
}
</style>
