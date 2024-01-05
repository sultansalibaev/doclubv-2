<template>
	<BaseCard class="pa-8">
		<v-row>
			<v-col cols="12" md="6">
				<p class="caption-2-regular | mt-4 text-gray800">Имя</p>
				<BaseInput2
					v-model="local.firstName"
					:rules="[(v) => !!v || 'Необходимо заполнить']"
					class="mt-4"
				/>
			</v-col>
			<v-col cols="12" md="6">
				<p class="caption-2-regular | mt-4 text-gray800">Фамилия</p>
				<BaseInput2
					v-model="local.lastName"
					:rules="[(v) => !!v || 'Необходимо заполнить']"
					class="mt-4"
				/>
			</v-col>
			<v-col cols="12" md="6">
				<span class="caption-2-regular | mt-4 text-gray800"> Отчество </span>
				<span class="small-regular | ml-2 gray-secondary"> Необязательно </span>
				<BaseInput2
					v-model="local.middleName"
					class="mt-4"
				/>
			</v-col>
		</v-row>
		<v-row>
			<v-col cols="12" md="6">
				<span class="caption-2-regular | mt-4 text-gray800"> Город </span>
				<span class="small-regular | ml-2 gray-secondary"> Необязательно </span>
				<BaseDropdown
						v-model="local.city"
						:items="citiesList"
						:placeholder="local?.city?.name || 'Введите город'"
						class="mt-4"
				/>
			</v-col>
			<v-col cols="12" md="6">
				<span class="caption-2-regular | mt-4 text-gray800"> Страна </span>
				<span class="small-regular | ml-2 gray-secondary"> Необязательно </span>
				<BaseInput2
					v-model="local.country"
					disabled
					class="mt-4"
				/>
			</v-col>
		</v-row>
	</BaseCard>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	middleName: {
		type: String,
		default: '',
	},
	country: {
		type: String,
		required: true,
	},
	city: {
		type: Object,
	},
	citiesList: {
		type: Array,
		require: true,
	},
})

const emit = defineEmits([
	'change-first-name',
	'change-last-name',
	'change-middle-name',
	'change-country',
	'change-city',
])

const defaultLocal = () => ({
	firstName: props.firstName,
	lastName: props.lastName,
	middleName: props.middleName,
	country: props.country,
	city: props.city,
})
const local = ref(defaultLocal())

watch(() => local.value.firstName, () => emit('change-first-name', local.value.firstName))
watch(() => local.value.lastName, () => emit('change-last-name', local.value.lastName))
watch(() => local.value.middleName, () => emit('change-middle-name', local.value.middleName))
watch(() => local.value.country, () => emit('change-country', local.value.country))
watch(() => local.value.city, () => emit('change-city', local.value.city?.id))
</script>

<style lang="scss" scoped>
.gray-secondary {
	color: rgba(var(--v-theme-gray900), 0.5);
}
</style>
