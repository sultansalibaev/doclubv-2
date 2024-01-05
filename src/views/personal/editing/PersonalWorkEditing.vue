<template>
	<BaseModal
			:show-modal="showModal"
			:max-width="680"
			:max-height="1100"
			title="Работа"
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
				Организация
			</h5>
			<BaseInput2
				v-if="addNew"
				v-model="localNew.name"
				class="mt-4"
				placeholder="Введите название организации"
			/>
			<BaseDropdown
				v-else
				v-model="local.organization.id"
				:placeholder="local.organization.name || 'Введите название организации'"
				:items="workPlaceList"
				class="mt-4"
			/>
		</div>
		<div class="mt-7">
			<h5 class="headers-5 | ">
				Сайт
			</h5>
			<BaseInput2
				v-if="addNew"
				v-model="localNew.address"
				class="mt-4"
				placeholder="Введите адрес сайта"
			/>
			<BaseInput2
				v-else
				v-model="local.address"
				class="mt-4"
				:placeholder="local.address || 'Введите адрес сайта'"
			/>
		</div>
		<div class="mt-7">
			<h5 class="headers-5 | ">
				Рабочий телефон
			</h5>
			<BaseInput2
				v-if="addNew"
				v-model="localNew.workPhone"
				class="mt-4"
				placeholder="Введите рабочий телефон"
			/>
			<BaseInput2
				v-else
				v-model="local.workPhone"
				class="mt-4"
				:placeholder="local.workPhone || 'Введите рабочий телефон'"
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

const props = defineProps({
	isLoading: {
		type: Boolean,
		required: true,
	},
	workPhone: {
		type: String,
		default: '',
	},
	organization: {
		type: Object,
		default: {},
	},
	workPlaceList: {
		type: Array,
		require: true,
	},
})

const emit = defineEmits(['activate-edit-mode', 'on-save', 'on-cancel'])

const showModal = ref(true)

const defaultLocal = () => ({
	organization: props.organization,
	address: props.organization?.address,
	workPhone: props.workPhone,
})
const local = ref(defaultLocal())

const addNew = ref(false)
const localNew = ref({
	name: '',
	address: '',
	workPhone: '',
})

const saveChanges = () => {
	const data = local.value
	const changedData = {
		work_place: {
			id: data.organization.id.id,
			address: data.address,
		},
		work_phone: data.workPhone,
	}

	const addedNew = localNew.value
	const addedData = {
		work_place: {
			name: addedNew.name,
			address: addedNew.address,
		},
		work_phone: addedNew.workPhone,
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