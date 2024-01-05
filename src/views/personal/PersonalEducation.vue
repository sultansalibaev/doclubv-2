<template>
	<BaseCard class="pa-8 width-fix" heigth="100%">
		<h4 class="headers-4 | text-gray900">Образование</h4>
		<h5 class="headers-5 | mt-7 text-gray900">Название учебного заведения</h5>
		<BaseSkeletonPath v-if="isLoading" :width="215" :height="16" class="mt-2" />
		<div v-else-if="isEditingMode" class="d-flex flex-column w-100">
			<span class="small-regular | gray-secondary"> Необязательно </span>
			<template v-if="!addNew">
				<BaseDropdown v-model="local.universityId"
					:placeholder="local.universityName || 'Выберите учебное заведение'" :items="universitiesList"
					class="mt-4" />
				<AppButton @click="addNew = true" theme="outline" class="mt-4" :text="'Добавить новое'" />
			</template>
			<template v-else>
				<AppButton @click="addNew = false" theme="outline" class="mt-4" :text="'Выбрать из базы данных'" />
				<BaseInput2 v-model="localNew.name" class="mt-4" placeholder="Введите название" />
			</template>
		</div>
		<p v-else class="body-regular | mt-2 text-gray800">
			{{ local.universityName ? local.universityName : 'Добавьте название учебного заведения' }}
		</p>
		<h5 class="headers-5 | mt-7 text-gray900">Кафедра</h5>
		<BaseSkeletonPath v-if="isLoading" :width="215" :height="16" class="mt-2" />
		<div v-else-if="isEditingMode" class="d-flex flex-column w-100">
			<span class="small-regular | gray-secondary"> Необязательно </span>
			<template v-if="addNew">
				<BaseInput2 v-model="localNew.universityDepartment" class="mt-4" />
			</template>
			<template v-else>
				<BaseInput2 v-model="local.universityDepartmentName" class="mt-4" />
			</template>
		</div>
		<p v-else class="body-regular | mt-2 text-gray800">
			{{ local.universityDepartmentName ? local.universityDepartmentName : 'Добавьте кафедру' }}
		</p>
		<h5 class="headers-5 | mt-7 text-gray900">Специальность</h5>
		<BaseSkeletonPath v-if="isLoading" :width="215" :height="16" class="mt-2" />
		<div v-else-if="isEditingMode" class="d-flex flex-column w-100">
			<span class="small-regular | gray-secondary"> Необязательно </span>
			<template v-if="addNew">
				<BaseInput2 v-model="localNew.universitySpeciality" class="mt-4" />
			</template>
			<template v-else>
				<BaseInput2 v-model="local.universitySpeciality" class="mt-4" />
			</template>
		</div>
		<p v-else class="body-regular | mt-2 text-gray800">
			{{ local.universitySpeciality ? local.universitySpeciality : 'Добавьте специальность' }}
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
import AppButton from '@/components/AppButton.vue'
import { ref, watch } from 'vue'
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

const emit = defineEmits(['activate-edit-mode', 'on-save', 'on-cancel'])

const defaultLocal = () => ({
	universityId: props.university?.id,
	universityName: props.university?.name,
	universityDepartmentId: props.university_department?.id,
	universityDepartmentName: props.university_department?.name,
	universitySpeciality: props.university_speciality,
})
const local = ref(defaultLocal())
const localNew = ref({
	name: '',
	universityDepartment: '',
	universitySpeciality: '',
})

const update = (data) => {
	if (data.universityId)
		return {
			university: { id: data.universityId.id },
			university_department: { name: data.universityDepartmentName },
			university_speciality: data.universitySpeciality,
		}
	else
		return {
			university: { name: data.name },
			university_department: { name: data.universityDepartment },
			university_speciality: data.universitySpeciality,
		}
}

const cancelEditMode = () => {
	emit('on-cancel')
	local.value = defaultLocal()
}

const addNew = ref(false)

watch(() => props.isLoading, (newValue) => { if (newValue === false) local.value = defaultLocal() })
</script>

<style lang="scss">
.width-fix {
	width: 100%;
	max-width: 968px;
}

.gray-secondary {
	color: rgba(var(--v-theme-gray900), 0.5);
}
</style>
