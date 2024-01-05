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
				Опыт
			</h4>
			<div v-if="workPlaces.length" class="mt-7 experiences-list">
				<div v-for="place in workPlaces" :key="place?.id" class="experiences-list__item work-place">
					<div class="work-place__logo-wrapper">
						<img v-if="place?.logo" :src="place.logo" alt="" class="work-place__logo">
						<img v-else src="@/assets/default-work-place-logo.png" alt="" class="work-place__logo" />
					</div>
					<div>
						<p class="body-regular | text-gray800">
							{{ place?.position_str }}, {{ place?.work_place_str }}
						</p>
						<p class="body-regular | mt-1 gray-secondary">
							{{ datesPeriod(place?.date_from) }} – {{ datesPeriod(place?.date_to) }}
						</p>
					</div>
				</div>
			</div>
			<p v-else class="body-regular | mt-7 gray-secondary">
				Добавьте информацию о своём прежнем опыте работы
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
	workPlaces: {
		type: Array,
		default: [],
	},
})

const emit = defineEmits(['on-edit'])

const datesPeriod = (date) => {
	if (!date) return 'Некорректная дата'

	const options = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		timezone: 'UTC',
	}

	return new Date(date).toLocaleString('ru', options).split(' г.')[0]
}
</script>

<style lang="scss" scoped>
.experiences-list {
	display: grid;
	gap: 20px;
}

.work-place {
	display: flex;
	gap: 16px;

	&__logo-wrapper {
		display: flex;
		position: relative;
		width: 52px;
		min-width: 52px;
		max-width: 52px;
		height: 52px;
		min-height: 52px;
		max-height: 52px;
		overflow: hidden;
		border-radius: 12px;
	}

	&__logo {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
}
</style>