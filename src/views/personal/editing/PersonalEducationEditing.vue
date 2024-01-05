<template>
	<BaseModal
			:show-modal="showModal"
			:max-width="680"
			:max-height="1100"
			title="Образование"
			@on-close="cancelEditMode()"
	>
		<div class="header-block">
			<AppButton
				:text="addNew ? 'Выбрать из базы данных' : 'Добавить новое'"
				theme="primary"
				@click="addNew = !addNew"
			/>
		</div>
		<div class="mt-7">
			<h5 class="headers-5 | ">
				Название учебного заведения
			</h5>
			<BaseInput2
				v-if="addNew"
				v-model="localNew.name"
				class="mt-4"
				placeholder="Введите название ВУЗа"
			/>
			<BaseDropdown
				v-else
				v-model="local.university.id"
				:placeholder="local.university.name || 'Выберите учебное заведение'"
				:items="universitiesList"
				class="mt-4"
			/>
		</div>
		<div class="mt-7">
			<h5 class="headers-5 | ">
				Кафедра
			</h5>
			<BaseInput2
				v-if="addNew"
				v-model="localNew.university_department"
				class="mt-4"
				placeholder="Введите название кафедры"
			/>
			<BaseInput2
				v-else
				v-model="local.university_department.name"
				:placeholder="local.university_department.name || 'Введите название кафедры'"
				class="mt-4"
			/>
		</div>
		<div class="mt-7">
			<h5 class="headers-5 | ">
				Специальность
			</h5>
			<BaseInput2
				v-if="addNew"
				v-model="localNew.university_speciality"
				class="mt-4"
				placeholder="Введите название специальности"
			/>
			<BaseInput2
				v-else
				v-model="local.university_speciality"
				:placeholder="local.university_department.university_speciality || 'Введите название специальности'"
				class="mt-4"
			/>
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
	university: {
		type: Object,
		default: {},
	},
	university_department: {
		type: Object,
		default: {},
	},
	university_speciality: {
		type: String,
		default: '',
	},
	universitiesList: {
		type: Array,
		require: true,
	},
})

const emit = defineEmits(['on-save', 'on-cancel'])

const showModal = ref(true)

const defaultLocal = () => ({
	university: props.university,
	university_department: props.university_department,
	university_speciality: props.university_speciality,
})
const local = ref(defaultLocal())

const addNew = ref(false)
const localNew = ref({
	name: '',
	university_department: '',
	university_speciality: '',
})

const saveChanges = () => {
	const data = local.value
	const changedData = {
		university: { id: data.university.id.id },
		university_department: { name: data.university_department.name },
		university_speciality: data.university_speciality,
	}

	const addedNew = localNew.value
	const addedData = {
		university: { name: addedNew.name },
		university_department: { name: addedNew.university_department },
		university_speciality: addedNew.university_speciality,
	}

	emit('on-save', addNew.value ? addedData : changedData)
	cancelEditMode()
}
const cancelEditMode = () => {
	emit('on-cancel')
	local.value = defaultLocal()
}
</script>

<style scoped>
.buttons-block {
	display: flex;
	gap: 16px;
}
.header-block {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;

	@media screen and (max-width: 599px){
		flex-direction: column;
		align-items: flex-start;
	}
}
</style>