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
				Работа
			</h4>
			<h5 class="headers-5 | mt-7">
				Организация
			</h5>
			<p class="body-regular | mt-2 text-gray800">
				{{ workPlace?.name ? workPlace?.name : 'Добавьте название организации' }}
			</p>
			<h5 class="headers-5 | mt-7">
				Сайт
			</h5>
			<p class="body-regular | mt-2 text-gray800">
				{{ workPlace?.address ? workPlace?.address : 'Добавьте сайт организации' }}
			</p>
			<h5 class="headers-5 | mt-7">
				Рабочий телефон
			</h5>
			<p class="body-regular | mt-2 text-gray800">
				{{ workPhone ? workPhone : 'Добавьте рабочий телефон' }}
			</p>
			<AppButton class="mt-7" theme="outline" :text="t('Edit')" @click="emit('on-edit')" />
		</template>
	</BaseCard>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue'
import PersonalInfoPanelSkeleton from '@/views/personal/skeletons/PersonalInfoPanelSkeleton.vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

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
	workPlace: {
		type: Object,
		default: {},
	},
	workPhone: {
		type: String,
		default: '',
	},
})

const emit = defineEmits(['on-edit'])
</script>

<style scoped></style>
<script setup>
</script>