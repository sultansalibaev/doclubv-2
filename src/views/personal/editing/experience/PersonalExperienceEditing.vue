<template>
	<BaseModal
			:show-modal="showModal"
			:max-width="680"
			:max-height="1100"
			title="Опыт"
			@on-close="emit('on-cancel')"
	>
		<div class="header-block">
			<AppButton
					:text="addNew ? 'Редактировать предыдущие' : 'Добавить новые'"
					theme="primary"
					@click="addNew = !addNew"
			/>
		</div>
		<div class="mt-7 work-places">
			<template v-if="!addNew">
				<OldPlaces
					:is-loading="isLoading"
					:places="places"
					@on-delete="emit('on-delete', $event)"
					@on-edit="emit('on-edit', $event)"
					@on-edit-with-new-photo="emit('on-edit-with-new-photo', $event)"
				/>
			</template>
			<template v-else>
				<NewPlaces
					:is-loading="isLoading"
					@on-save-new-work-place="emit('on-save-new-work-place', $event)"
				/>
			</template>
		</div>
		<AppButton
			theme="outline"
			text="Отменить"
			class="mt-8"
			@click="emit('on-cancel')"
		/>
	</BaseModal>
</template>

<script setup>
import { ref } from 'vue'
import AppButton from '@/components/AppButton.vue'
import OldPlaces from '@/views/personal/editing/experience/OldPlaces.vue'
import NewPlaces from '@/views/personal/editing/experience/NewPlaces.vue'

const props = defineProps({
	isLoading: {
		type: Boolean,
		required: true,
	},
	places: {
		type: Array,
		default: [],
	},
})

const emit = defineEmits(['on-edit-with-new-photo', 'on-edit', 'on-delete', 'on-cancel'])

const showModal = ref(true)

const addNew = ref(false)
</script>

<style lang="scss" scoped>
.work-places {
	display: flex;
	flex-direction: column;
	gap: 32px;
}

.header-block {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;

	@media screen and (max-width: 599px){
		flex-direction: column;
		align-items: flex-start;
	}
}
</style>