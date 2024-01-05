<template>
	<BaseModal
			:show-modal="showModal"
			:max-width="680"
			:max-height="1100"
			title="Персональная информация"
			@on-close="cancelEditMode()"
	>
		<div>
			<p class="caption-2-regular | text-gray800">Фамилия</p>
			<BaseInput2
					v-model="local.last_name"
					class="mt-4"
			/>
		</div>
		<div class="mt-7">
			<p class="caption-2-regular | text-gray800">Имя</p>
			<BaseInput2
					v-model="local.first_name"
					class="mt-4"
			/>
		</div>
		<div class="mt-7">
			<span class="caption-2-regular | text-gray800">Отчество</span>
			<span class="small-regular | ml-2 gray-secondary">Необязательно</span>
			<BaseInput2
					v-model="local.middle_name"
					class="mt-4"
			/>
		</div>
		<div class="mt-7 info-block--duo">
			<div>
				<span class="caption-2-regular | text-gray800">Город</span>
				<BaseDropdown
						v-model="local.city"
						:items="citiesList"
						:placeholder="local?.city?.name || 'Введите город'"
						class="mt-4"
				/>
			</div>
			<div>
				<span class="caption-2-regular | text-gray800">Страна</span>
				<BaseInput2
						v-model="props.country"
						disabled
						class="mt-4"
				/>
			</div>
		</div>
		<div class="mt-7 margin-fx">
			<h5 class="headers-5 | ">О себе</h5>
			<BaseTextarea
					v-model="local.about"
					:min-height="152"
					placeholder="Расскажите о себе"
					class="mt-4"
			/>
		</div>
		<div class="mt-7 info-block--duo">
			<div>
				<h5 class="headers-5 | ">Должность</h5>
				<BaseInput2
						v-model="local.position_str"
						class="mt-4"
				/>
			</div>
			<div>
				<h5 class="headers-5 | ">Экспертиза</h5>
				<v-autocomplete
						v-model="local.specialization"
						:items="specializations"
						bg-color="white100"
						chips
						class="mt-4"
						closable-chips
						density="compact"
						hide-details
						item-title="name"
						item-value="id"
						multiple
						variant="outlined"
				>
					<template v-slot:chip="{ props, item }">
						<v-chip
								v-bind="props"
								:text="item?.raw?.name"
								color="primary"
								text-color="white100"
								variant="elevated"
						/>
					</template>

					<template v-slot:item="{ props, item }">
						<v-list-item v-bind="props" :title="item?.raw?.name" />
					</template>
				</v-autocomplete>
			</div>
		</div>
		<div class="mt-7 buttons-block">
			<AppButton
					:disabled="isLoading"
					theme="primary"
					text="Сохранить"
					@click="saveChanges()"
			/>
			<AppButton
					:loading="isLoading"
					theme="outline"
					text="Отменить"
					@click="cancelEditMode()"
			/>
		</div>
	</BaseModal>
</template>

<script setup>
import { ref } from 'vue'
import AppButton from '@/components/AppButton.vue'

const props = defineProps({
	isLoading: {
		type: Boolean,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	middleName: {
		type: String,
		default: '',
	},
	country: {
		type: String,
		required: true,
	},
	city: {
		type: Object,
	},
	citiesList: {
		type: Array,
		require: true,
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
	specializations: {
		type: Array,
		default: [],
	},
})

const emit = defineEmits(['on-save', 'on-cancel'])

const showModal = ref(true)

const defaultLocal = () => ({
	first_name: props.firstName,
	last_name: props.lastName,
	middle_name: props.middleName,
	city: props.city,
	specialization: props.specialization,
	position_str: props.job,
	about: props.about,
})
const local = ref(defaultLocal())

const saveChanges = () => {
	const data = local.value
	const changedData = {
		about: data.about,
		city: data.city.id,
		first_name: data.first_name,
		last_name: data.last_name,
		middle_name: data.middle_name,
		position_str: data.position_str,
		specialization: data.specialization.map((item) => (item.id ? item.id : item)),
	}
	emit('on-save', changedData)
	cancelEditMode()
}
const cancelEditMode = () => {
	emit('on-cancel')
	local.value = defaultLocal()
}
</script>

<style lang="scss" scoped>
.info-block--duo {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20px;

	@media screen and (max-width: 729px) {
		grid-template-columns: 1fr;
	}
}
.buttons-block {
	display: flex;
	gap: 16px;
}
.margin-fx {
	margin-left: 1px;
	margin-right: 1px;
}
</style>