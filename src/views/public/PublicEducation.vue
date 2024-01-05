<template>
	<BaseCard class="width-fix" color="background-primary" heigth="100%">
		<h4 class="headers-4 | text-gray900">Образование</h4>
		<h5 class="headers-5 | mt-7 text-gray900">Название учебного заведения</h5>
		<BaseSkeletonPath v-if="isLoading" :width="215" :height="16" class="mt-2" />
		<p v-else class="body-regular | mt-2 text-gray800">
			{{ university?.name ? university?.name : 'Данные не заполнены' }}
		</p>
		<h5 class="headers-5 | mt-7 text-gray900">Кафедра</h5>
		<BaseSkeletonPath v-if="isLoading" :width="215" :height="16" class="mt-2" />
		<p v-else class="body-regular | mt-2 text-gray800">
			{{ university_department?.name ? university_department?.name : 'Данные не заполнены' }}
		</p>
		<h5 class="headers-5 | mt-7 text-gray900">Специальность</h5>
		<BaseSkeletonPath v-if="isLoading" :width="215" :height="16" class="mt-2" />
		<p v-else class="body-regular | mt-2 text-gray800">
			{{ university_speciality ? university_speciality : 'Данные не заполнены' }}
		</p>
	</BaseCard>
</template>

<script setup>
const props = defineProps({
	isLoading: {
		type: Boolean,
		required: true,
	},
	university: {
		type: String,
		default: '',
	},
	university_department: {
		type: String,
		default: '',
	},
	university_speciality: {
		type: String,
		default: '',
	},
})
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
