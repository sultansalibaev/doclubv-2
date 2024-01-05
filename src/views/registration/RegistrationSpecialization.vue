<template>
	<form ref="workPlaceForm" class="workPlaceForm" @submit.prevent>
		<p class="caption-2-regular | text-gray800">Интересующая отрасль</p>
		<v-autocomplete
			v-model="friends"
			:disabled="isUpdating"
			:items="people"
			chips
			class="mt-4"
			closable-chips
			item-title="name"
			item-value="id"
			multiple
			variant="outlined"
		>
			<template v-slot:chip="{ props, item }">
				<v-chip
					v-bind="props"
					:text="item?.raw?.name"
					color="primary"
					text-color="white100"
					variant="elevated"
				/>
			</template>

			<template v-slot:item="{ props, item }">
				<v-list-item v-bind="props" :title="item?.raw?.name" />
			</template>
		</v-autocomplete>
		<v-row class="mt-7">
			<v-col cols="6">
				<AppButton
					:block="true"
					:disabled="isLoading"
					:text="'Назад'"
					:theme="'black'"
					@click="emit('go-prev-step')"
				/>
			</v-col>
			<v-col cols="6">
				<AppButton
					:block="true"
					:loading="isLoading"
					:disabled="isDisabled"
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
	isLoading: {
		type: Boolean,
		default: false,
	},
	info: {
		type: Object,
	},
	people: {
		type: Array,
		require: true,
	},
})

const emit = defineEmits(['go-next-step', 'go-prev-step'])

const friends = ref([])
const isUpdating = ref(false)

const isDisabled = ref(true)

const workPlaceForm = ref(null)
const validationStatus = computed(() => !!friends.value.length)
watch(validationStatus, (newValue) => (isDisabled.value = !newValue))

const goNextStep = () => emit('go-next-step', friends.value)
</script>

<style scoped></style>
