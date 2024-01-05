<template>
	<BaseCard class="width-fix" color="background-primary" height="100%">
		<h4 class="headers-4 | text-gray900">Работа</h4>
		<h5 class="headers-5 | mt-7 text-gray900">Организация</h5>
		<BaseSkeletonPath v-if="isLoading" :width="215" :height="16" class="mt-2" />
		<p v-else class="body-regular | mt-2 text-gray800">
			{{ organization ? organization : 'Данные не заполнены' }}
		</p>
		<h5 class="headers-5 | mt-7 text-gray900">Адрес</h5>
		<BaseSkeletonPath v-if="isLoading" :width="215" :height="16" class="mt-2" />
		<p v-else class="body-regular | mt-2 text-gray800">
			{{ address ? address : 'Данные не заполнены' }}
		</p>
		<h5 class="headers-5 | mt-7 text-gray900">Рабочий телефон</h5>
		<BaseSkeletonPath v-if="isLoading" :width="215" :height="16" class="mt-2" />
		<p v-else class="body-regular | mt-2 text-gray800">
			{{ workPhone ? workPhone : 'Данные не заполнены' }}
		</p>
	</BaseCard>
</template>

<script setup>
const props = defineProps({
	isLoading: {
		type: Boolean,
		required: true,
	},
	workPhone: {
		type: String,
		default: '',
	},
	address: {
		type: String,
		default: '',
	},
	organization: {
		type: String,
		default: '',
	},
})
</script>

<style>
.width-fix {
	width: 100%;
	max-width: 968px;
}
</style>
