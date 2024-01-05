<template>
	<BaseCard>
		<template v-if="isLoading">
			<PersonalInfoPanelSkeleton />
		</template>
		<template v-else>
			<h2 class="headers-2 | ">
				{{ firstName }} {{ lastName }} {{ middleName }}
			</h2>
			<p v-if="city" class="small-regular | mt-2 text-gray800">{{ country }}, {{ city }}</p>
			<h4 class="headers-4 | mt-7">
				Образование
			</h4>
			<h5 class="headers-5 | mt-7">
				Название учебного заведения
			</h5>
			<p class="body-regular | mt-2 text-gray800">
				{{ university?.name ? university?.name : 'Добавьте специальность' }}
			</p>
			<h5 class="headers-5 | mt-7">
				Кафедра
			</h5>
			<p class="body-regular | mt-2 text-gray800">
				{{ university_department?.name ? university_department.name : 'Добавьте специальность' }}
			</p>
			<h5 class="headers-5 | mt-7">
				Специальность
			</h5>
			<p class="body-regular | mt-2 text-gray800">
				{{ university_speciality ? university_speciality : 'Добавьте специальность' }}
			</p>
			<AppButton class="mt-7" theme="outline" :text="t('Edit')" @click="emit('on-edit')" />
		</template>
	</BaseCard>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import PersonalInfoPanelSkeleton from '@/views/personal/skeletons/PersonalInfoPanelSkeleton.vue'

const props = defineProps({
	isLoading: {
		type: Boolean,
		default: false,
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
	country: {
		type: String,
		default: '',
	},
	city: {
		type: String,
		default: '',
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
})

const emit = defineEmits(['on-edit'])
</script>

<style scoped></style>