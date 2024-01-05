<template>
	<form ref="workPlaceForm" class="workPlaceForm" @submit.prevent>
		<p class="caption-2-regular | text-gray800">Место работы</p>
		<BaseAutocomplete
			v-model="work.workPlace"
			:items="workPlaceList"
			:rules="[(v) => !!v || 'Необходимо заполнить']"
			item-title="name"
			item-value="id"
			class="mt-4"
			variant="outlined"
		/>
		<p class="small-regular | mt-4 gray-secondary">
			Место работы может быть изменено или добавлено позже
		</p>
		<div class="mt-4 d-flex align-center justify-space-between">
			<p class="caption-2-regular | text-gray800">Ссылка на информацию о себе</p>
			<p class="small-regular |gray-secondary">Необязательно</p>
		</div>
		<BaseInput v-model="work.link" class="mt-4" variant="outlined" />
		<v-row class="mt-7">
			<v-col cols="6">
				<AppButton :block="true" :text="'Назад'" :theme="'black'" @click="emit('go-prev-step')" />
			</v-col>
			<v-col cols="6">
				<AppButton
					:block="true"
					:text="'Продолжить'"
					:theme="'primary'"
					@click.prevent="goNextStep()"
				/>
			</v-col>
		</v-row>
	</form>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import AppButton from '@/components/AppButton.vue'

const props = defineProps({
	workPlaceList: {
		type: Array,
		require: true,
	},
})

const emit = defineEmits(['go-next-step', 'go-prev-step'])

const work = ref({
	workPlace: null,
	link: '',
})

// const isDisabled = ref(true)

const workPlaceForm = ref(null)

const validationStatus = computed(() => !!work.value.workPlace)

// watch(validationStatus, (newValue) => (isDisabled.value = !newValue))

const goNextStep = () => emit('go-next-step', work.value)
</script>

<style lang="scss" scoped>
.gray-secondary {
	color: rgba(var(--v-theme-gray900), 0.5);
}
</style>
