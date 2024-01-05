<template>
	<BaseCard class="pa-8" width="100%">
		<AppRating class="pa-0" />
		<AppButton :text="t('Open')" :theme="'outline'" class="mt-7" @click="" />
	</BaseCard>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue'
import AppRating from '@/components/AppRating.vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
	isLoading: {
		type: Boolean,
		required: true,
	},
})

const ratings = ['Общий', 'Регион', 'Специализация']
</script>

<style lang="scss" scoped>
.gray-secondary {
	color: rgba(var(--v-theme-gray900), 0.5);
}
</style>
