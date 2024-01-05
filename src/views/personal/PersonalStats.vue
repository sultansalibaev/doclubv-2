<template>
	<BaseCard class="pa-8">
		<h4 class="headers-4 | text-gray-800">Статистика личной страницы</h4>
		<div class="mt-7">
			<AppTabsList :tabs="periods" class="rating__tabs-list" />
			<v-row class="mt-5">
				<v-col cols="12" md="6">
					<BaseSkeletonPath v-if="isLoading" :width="'100%'" :height="147" />
					<BaseCard v-else class="pa-6" color="background">
						<h5 class="headers-5 | text-gray900">Посетители</h5>
						<div class="mt-4 d-flex align-center">
							<h4 class="headers-4">
								{{ info.visitors.count }}
							</h4>
							<h5 :class="getColor(info.visitors.percent)" class="headers-5 | ml-3">
								{{ getPercentText(info.visitors.percent) }}%
							</h5>
						</div>
						<p class="caption-2-regular | mt-2 gray-secondary">За вчера</p>
					</BaseCard>
				</v-col>
				<v-col cols="12" md="6">
					<BaseSkeletonPath v-if="isLoading" :width="'100%'" :height="147" />
					<BaseCard v-else class="pa-6" color="background">
						<h5 class="headers-5 | text-gray900">Новые регистрации</h5>
						<div class="mt-4 d-flex align-center">
							<h4 class="headers-4">12</h4>
							<h5 :class="getColor(info.newRegisters.percent)" class="headers-5 | ml-3">
								{{ getPercentText(info.newRegisters.percent) }}%
							</h5>
						</div>
						<p class="caption-2-regular | mt-2 gray-secondary">За вчера</p>
					</BaseCard>
				</v-col>
			</v-row>
		</div>
	</BaseCard>
</template>

<script setup>
import AppTabsList from '@/components/AppTabsList.vue'

const props = defineProps({
	isLoading: {
		type: Boolean,
		required: true,
	},
	info: {
		type: Object,
		required: true,
	},
})

const periods = ['День', 'Неделя', 'Месяц', 'Год']

const getPercentText = (value) => (value > 0 ? `+${value}` : value)
const getColor = (value) => (value > 0 ? 'text-green400' : 'text-red500')
</script>

<style lang="scss" scoped>
.gray-secondary {
	color: rgba(var(--v-theme-gray900), 0.5);
}
</style>
