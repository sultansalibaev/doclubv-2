<template>
	<BaseCard class="pa-8 width-fix" heigth="100%">
		<h4 class="headers-4 | text-gray900">Работа</h4>
		<h5 class="headers-5 | mt-7 text-gray900">Организация</h5>
		<BaseSkeletonPath v-if="isLoading" :width="215" :height="16" class="mt-2" />
		<div v-else-if="isEditingMode" class="d-flex flex-column w-100">
			<span class="small-regular | gray-secondary"> Необязательно </span>
			<template v-if="!addNew">
				<BaseDropdown v-model="local.id" :placeholder="local.name || 'Введите название'" :items="workPlaceList"
					class="mt-4" />
				<AppButton @click="addNew = true" theme="outline" class="mt-4" :text="'Добавить новое'" />
			</template>
			<template v-else>
				<AppButton @click="addNew = false" theme="outline" class="mt-4" :text="'Выбрать из базы данных'" />
				<BaseInput2 v-model="localNew.name" class="mt-4" placeholder="Введите название" />
			</template>
		</div>
		<p v-else class="body-regular | mt-2 text-gray800">
			{{ local.name ? local.name : 'Добавьте название организации' }}
		</p>
		<h5 class="headers-5 | mt-7 text-gray900">Сайт</h5>
		<BaseSkeletonPath v-if="isLoading" :width="215" :height="16" class="mt-2" />
		<div v-else-if="isEditingMode" class="d-flex flex-column w-100">
			<span class="small-regular | gray-secondary"> Необязательно </span>
			<template v-if="addNew">
				<BaseInput2 v-model="localNew.address" class="mt-4" />
			</template>
			<template v-else>
				<BaseInput2 v-model="local.address" class="mt-4" />
			</template>
		</div>
		<p v-else class="body-regular | mt-2 text-gray800">
			{{ local.address ? local.address : 'Добавьте сайт организации' }}
		</p>
		<h5 class="headers-5 | mt-7 text-gray900">Рабочий телефон</h5>
		<BaseSkeletonPath v-if="isLoading" :width="215" :height="16" class="mt-2" />
		<div v-else-if="isEditingMode" class="d-flex flex-column w-100">
			<span class="small-regular | gray-secondary"> Необязательно </span>
			<template v-if="addNew">
				<BaseInput2 v-model="localNew.workPhone" class="mt-4" />
			</template>
			<template v-else>
				<BaseInput2 v-model="local.workPhone" class="mt-4" />
			</template>
		</div>
		<p v-else class="body-regular | mt-2 text-gray800">
			{{ local.workPhone ? local.workPhone : 'Добавьте рабочий телефон' }}
		</p>
		<template v-if="isEditingMode">
			<div class="mt-8 d-flex gap-2 align-center">
				<AppButton :loading="isLoading" theme="outline" text="Сохранить"
					@click="emit('on-save', update(addNew ? localNew : local))" />
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

const defaultLocal = () => ({
	id: props.organization?.id,
	name: props.organization?.name,
	address: props.organization?.address,
	workPhone: props.workPhone,
})
const local = ref(defaultLocal())
const localNew = ref({
	name: '',
	address: '',
	workPhone: '',
})

const update = (data) => {
	if (data.id)
		return {
			work_place: {
				id: data.id.id,
				address: data.address,
			},
			work_phone: data.workPhone,
		}
	else
		return {
			work_place: {
				name: data.name,
				address: data.address,
			},
			work_phone: data.workPhone,
		}
}

const cancelEditMode = () => {
	emit('on-cancel')
	local.value = defaultLocal()
}

const addNew = ref(false)

watch(() => props.isLoading, (newValue) => { if (newValue === false) local.value = defaultLocal() })
</script>

<style>
.width-fix {
	width: 100%;
	max-width: 968px;
}
</style>
