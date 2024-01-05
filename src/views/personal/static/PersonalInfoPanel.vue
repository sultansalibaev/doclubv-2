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
			<h5 class="headers-5 | mt-7">
				{{ t('About me') }}
			</h5>
			<p class="body-regular | mt-2 text-gray800 text-pre-wrap">
				{{ about ? about : t('Fill in your information') }}
			</p>
			<h5 class="headers-5 | mt-7">
				{{ t('Job title') }}
			</h5>
			<p class="body-regular | mt-2 text-gray800 text-pre-wrap">
				{{ job ? job : t('Fill in your information') }}
			</p>
			<h5 class="headers-5 | mt-7">
				{{ t('Expertise') }}
			</h5>
			<template v-if="specialization.length">
				<p
					v-for="item in specialization"
					:key="item.id"
					class="body-regular | mt-2 text-gray800"
				>
					{{ item.name }}
				</p>
			</template>
			<template v-else>
				<p class="body-regular | mt-2 text-gray800 text-pre-wrap">
					{{ t('Fill in your information') }}
				</p>
			</template>
			<AppButton
				class="mt-7"
				theme="outline"
				:text="t('Edit')"
				@click="emit('on-edit')"
			/>
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
	about: {
		type: [String, Number],
		default: '',
	},
	job: {
		type: [String, Number],
		default: '',
	},
	specialization: {
		type: Array,
		default: [],
	},
})

const emit = defineEmits(['on-edit'])
</script>

<style scoped>

</style>