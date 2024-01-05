<template>
	<BaseCard class="pa-8" width="100%">
		<h4 class="headers-4 | text-gray900">Реферальная ссылка</h4>
		<p class="body-regular | mt-7 gray-secondary">
			Приглашайте своих коллег и получайте бонусы на свой бонусный счет за их регистрацию
		</p>
		<div class="mt-7 d-flex flex-wrap align-center justify-space-between">
			<BaseInput2 v-model="referral"/>
			<AppButton
				:loading="load"
				:text="'Копировать'"
				:theme="'primary'"
				class="ml-5"
				@click="doCopy()"
			/>
		</div>
	</BaseCard>
</template>

<script setup>
import { ref, watch } from 'vue'
import AppButton from '@/components/AppButton.vue'

const props = defineProps({
	isLoading: {
		type: Boolean,
		required: true,
	},
	referralLink: {
		type: String,
		default: '',
	},
})

const load = ref(false)
const referral = ref('')
const doCopy = () => {
	load.value = true
	navigator.clipboard.writeText(referral.value)
	setTimeout(() => (load.value = false), 1000)
}

watch(
	() => props.referralLink,
	(newValue) => (referral.value = newValue),
)
</script>

<style lang="scss" scoped>
.gray-secondary {
	color: rgba(var(--v-theme-gray900), 0.5);
}
</style>
