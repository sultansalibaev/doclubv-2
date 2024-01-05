<template>
	<div
			v-for="(place, index) in newPlaces"
			:key="place"
			class="work-place"
	>
		<div
				v-if="index !== 0"
				class="divider work-place__divider"
		/>
		<div class="work-place__name">
			<p class="caption-2-regular | text-gray800">
				Название организации {{ index + 1 }}
			</p>
			<BaseInput2
					v-model="place.work_place_str"
					class="mt-4"
			/>
		</div>
		<div class="work-place__logo">
			<p class="caption-2-regular | d-sm-block text-gray800">Лого</p>
			<div
					class="logo-wrapper"
					@click="updateLogo($refs.newPlaceLogo.click(), index)"
			>
				<img
						v-if="place.logo?.file"
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
			<BaseInput2
					v-model="place.position_str"
					class="mt-4"
			/>
		</div>
		<div class="work-place__dates">
			<div class="work-place__date">
				<p class="caption-2-regular | d-sm-block text-gray800">Начало работы</p>
				<BaseInput2
						v-model="place.date_from"
						class="mt-4"
						type="date"
						@input="place.date_from = $event.target.value"
				/>
			</div>
			<div class="work-place__date">
				<p class="caption-2-regular | d-sm-block text-gray800">Окончание работы</p>
				<BaseInput2
						v-model="place.date_to"
						class="mt-4"
						type="date"
						@input="place.date_to = $event.target.value"
				/>
			</div>
		</div>
		<div class="work-place__buttons-group">
			<div class="mt-4 work-place__buttons">
				<AppButton
						v-if="newPlaces.length > 1"
						theme="outline"
						text="Удалить"
						class="delete-button"
						@click="newPlaces.splice(index, 1)"
				/>
			</div>
		</div>
	</div>
	<input
			ref="newPlaceLogo"
			type="file"
			class="d-none"
			accept="image/*"
			@change="handleFileUploadNewPlace"
			@click="$event.target.value = ''"
	/>
	<div class="mt-7 d-flex align-center gap-2 flex-wrap">
		<AppButton
				:block="windowWidth <= 599"
				:disabled="isLoading"
				text="Добавить организацию"
				theme="text"
				prepend-inner
				@click="addNewPlace()"
		>
			<template #prepend-inner>
				<img src="@/assets/icons/plus.svg" alt="">
			</template>
		</AppButton>
		<AppButton
				v-if="newPlaces.length"
				:block="windowWidth <= 599"
				theme="primary"
				text="Сохранить"
				@click="pushNewPlace()"
		/>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import AppButton from '@/components/AppButton.vue'

const props = defineProps({
	isLoading: {
		type: Boolean,
		required: true,
	},
})

const emit = defineEmits(['on-save-new-work-place'])

const newPlaces = ref([
	{
		logo: {},
		work_place_str: '',
		position_str: '',
		date_from: '',
		date_to: '',
	},
])

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

const newPlaceLogo = ref(null)
const localIndex = ref(0)

const updateLogo = (func, index) => {
	() => func
	localIndex.value = index
}
const handleFileUploadNewPlace = (event) => {
	const file = event.target.files[0]
	if (!file) return
	newPlaces.value[localIndex.value].logo.file = file
	newPlaces.value[localIndex.value].logo.fileUrl = URL.createObjectURL(file)
}

const windowWidth = computed(() => window.innerWidth)
</script>

<style lang="scss" scoped>
.divider {
	width: 100%;
	height: 1px;
	background: #E7E7EF;
}

.work-place {
	display: grid;
	grid-template-columns: 78px 1fr;
	grid-template-areas:
	'divider divider'
	'name name'
	'logo position'
	'. dates'
	'buttons buttons';
	gap: 16px;

	@media screen and (max-width: 599px){
		grid-template-areas:
		'divider divider'
		'logo name'
		'position position'
		'dates dates'
		'buttons buttons';
	}

	&__divider {
		grid-area: divider;
	}
	&__name {
		grid-area: name;
	}
	&__logo {
		grid-area: logo;
	}
	&__position {
		grid-area: position;
	}
	&__dates {
		grid-area: dates;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;

		@media screen and (max-width: 599px){
			grid-template-columns: 1fr;
		}
	}
	&__date {

	}
	&__buttons-group {
		grid-area: buttons;
	}
	&__buttons {
		display: flex;
		align-items: center;
		gap: 8px;

		@media screen and (max-width: 599px){
			flex-direction: column;
			align-items: flex-start;
		}
	}
}

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
</style>