<template>
	<BaseCard class="pa-8">
		<h4 class="headers-4 | text-gray900">{{ t('Filling out your profile') }}</h4>
		<AppLinearProgressBar :percent-value="percent" class="mt-7" />
		<p v-if="empty_fields.length" class="body-regular | mt-7 gray-secondary">
			{{ t('To make the page as effective as possible, we recommend filling out all the information. To do this, just fill out') }}:
		</p>
		<BaseCard
			v-if="empty_fields.length"
			class="mt-7 pa-4 d-flex align-center flex-wrap"
			color="purple100"
			rounded="lg"
		>
			<div
				v-for="(link, index) in translatedFieldsList"
				:key="link.id"
				@click="emit('open-editing-mode', link)"
			>
				<span class="body-regular | cursor-pointer text-decoration-underline text-gray800">{{ t(link.name) }}</span>
				<span v-if="index !== translatedFieldsList.length - 1" class="mr-1" >,</span>
			</div>
		</BaseCard>
	</BaseCard>
</template>

<script setup>
import AppLinearProgressBar from '@/components/AppLinearProgressBar.vue'
import { computed } from 'vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
	isLoading: {
		type: Boolean,
		required: true,
	},
	percent: {
		type: Number,
		default: 0,
	},
	empty_fields: {
		type: Array,
		default: [],
	},
})

const emit = defineEmits(['open-editing-mode'])

const translatedFieldsList = computed(() => {
	const translateList = {
		about: { name: 'About me', id: 0 },
		certificates: { name: 'Certificates', id: 5 },
		contact_email: { name: 'Mail', id: 1 },
		city: { name: 'City', id: 0 },
		facebook: { name: 'Facebook', id: 1 },
		first_name: { name: 'Name', id: 0 },
		instagram: { name: 'Instagram', id: 1 },
		last_name: { name: 'Surname', id: 0 },
		middle_name: { name: 'Patronymic', id: 0 },
		personal_phone: { name: 'Telephone', id: 1 },
		photo: { name: 'Profile photo', id: 'photo' },
		position_str: { name: 'Job title', id: 0 },
		profile_url: { name: 'Link to your profile', id: '' },
		specialization: { name: 'Specialization', id: 0 },
		telegram: { name: 'Telegram', id: 1 },
		university: { name: 'University name', id: 2 },
		university_department: { name: 'Department (University)', id: 2 },
		university_speciality: { name: 'Specialty (university)', id: 2 },
		whatsapp: { name: 'Whatsapp', id: 1 },
		work_phone: { name: 'Work phone', id: 3 },
		work_place: { name: 'Workplace', id: 3 },
		work_places: { name: 'Your experience', id: 4 },
	}

	return props.empty_fields.map((item) => translateList[item])
})
</script>

<style lang="scss" scoped>
.gray-secondary {
	color: rgba(var(--v-theme-gray900), 0.5);
}
</style>
