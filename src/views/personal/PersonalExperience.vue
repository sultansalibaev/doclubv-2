<template>
	<BaseCard class="pa-8" width="100%">
		<h4 class="headers-4 | text-gray-800">Опыт</h4>
		<template v-if="isEditingMode">
			<PersonalExperienceEditing :is-loading="isLoading" :places="info"
				@on-save-new-work-place="emit('on-save-new-work-place', $event)" @on-cancel="emit('on-cancel')"
				@on-delete="emit('on-delete', $event)" @on-edit="emit('on-edit', $event)"
				@on-edit-with-new-photo="emit('on-edit-with-new-photo', $event)" />
		</template>
		<template v-else>
			<BaseSkeletonPath v-if="isLoading" :width="375" :height="16" class="mt-7" />
			<p v-else-if="!info?.length" class="body-regular | mt-8 gray-secondary">
				Добавьте информацию о своём прежнем опыте работы
			</p>
			<v-row v-else class="mt-7">
				<!--                <v-col cols="12">-->
				<!--                    <p class="body-regular text-gray800">Общий опыт работы: {{ info?.workTime }}</p>-->
				<!--                </v-col>-->
				<v-col v-for="place in info" :key="place.id" cols="12" md="6">
					<div class="d-flex align-center">
						<div class="logo-wrapper">
							<img :src="place.logo" alt="" class="logo" />
						</div>
						<div class="ml-4">
							<template v-if="isLoading">
								<BaseSkeletonPath :width="215" :height="16" />
								<BaseSkeletonPath :width="215" :height="16" class="mt-1" />
							</template>
							<template v-else>
								<p class="body-regular | text-gray800">
									{{ place.position_str }}, {{ place.work_place_str }}
								</p>
								<p class="body-regular | mt-1 gray-secondary">
									{{ datesPeriod(place.date_from) }} – {{ datesPeriod(place.date_to) }}
								</p>
							</template>
						</div>
					</div>
				</v-col>
			</v-row>
		</template>
		<AppButton v-if="!isEditingMode" :disabled="isLoading" theme="outline" :text="t('Edit')" class="mt-8"
			@click="emit('activate-edit-mode')" />
	</BaseCard>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue'
import { computed, ref } from 'vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import PersonalExperienceEditing from '@/views/personal/PersonalExperienceEditing.vue'

const props = defineProps({
	isLoading: {
		type: Boolean,
		required: true,
	},
	isEditingMode: {
		type: Boolean,
		default: false,
	},
	info: {
		type: Object,
		default: {},
	},
})

const emit = defineEmits([
	'on-save-new-work-place',
	'activate-edit-mode',
	'on-delete',
	'on-edit',
	'on-edit-with-new-photo',
	'on-cancel',
])

const datesPeriod = (date) => {
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
.gray-secondary {
	color: rgba(var(--v-theme-gray900), 0.5);
}

.logo-wrapper {
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

.logo {
	object-fit: cover;
	width: 100%;
	height: 100%;
}
</style>
