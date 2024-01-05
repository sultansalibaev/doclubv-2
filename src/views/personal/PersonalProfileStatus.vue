<template>
	<BaseCard class="pa-8" width="100%">
		<BaseSkeletonPath v-if="isLoading" :width="'100%'" :height="28" />
		<div v-else class="d-flex align-end">
			<h4 class="headers-4 | text-gray900">
				{{ statusText }}
			</h4>
			<v-icon
				v-if="isActive"
				class="ml-2"
				color="primary"
				icon="mdi-check-circle-outline"
				size="24"
			/>
		</div>
		<p class="body-regular | mt-7 gray-secondary">
			{{ statusSubtext }}
		</p>
		<div class="mt-7 block">
			<AppButton
				:disabled="!isActive"
				:text="t('Open')"
				:theme="'primary'"
				target="_blank"
				@click="goTo()"
			/>
			<AppButton
				:text="isActive ? t('Remove from publication') : t('Publish')"
				:loading="load || isLoading"
				:theme="'outline'"
				@click="emit('change-profile-status', !isActive)"
			/>
		</div>
		<h5 class="headers-5 | mt-7 text-gray900">{{ t('Link to your profile') }}</h5>
		<div class="mt-7 block">
			<BaseInput2
				v-model="link"
				disabled
			/>
			<AppButton
				:disabled="!isActive"
				:loading="load"
				:text="'Копировать'"
				:theme="'primary'"
				@click="doCopy()"
			/>
		</div>
	</BaseCard>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { computed, ref, watch } from 'vue'
import AppButton from '@/components/AppButton.vue'

const props = defineProps({
	isLoading: {
		type: Boolean,
		required: true,
	},
	profileLink: {
		type: String,
		default: '',
	},
	isActive: {
		type: Boolean,
		default: false,
	},
})

const emit = defineEmits(['change-profile-status'])

const load = ref(false)
const defaultLink = () => props.profileLink
const link = ref(defaultLink())
const doCopy = () => {
	load.value = true
	navigator.clipboard.writeText(link.value)
	setTimeout(() => (load.value = false), 1000)
}

const statusText = computed(() =>
	props.isActive ? t('Profile published') : t('Profile not published'),
)
const statusSubtext = computed(() =>
	props.isActive
		? t('Your public profile is unpublished! The published profile can be posted on social networks and instant messengers and shared with friends.')
		: t('Your public profile is unpublished! The published profile can be posted on social networks and instant messengers and shared with friends.'),
)

const goTo = () => window.open(link.value, '_blank')

watch(
	() => props.isLoading,
	(newValue) => {
		if (newValue === false) link.value = defaultLink()
	},
)
</script>

<style lang="scss" scoped>
.gray-secondary {
	color: rgba(var(--v-theme-gray900), 0.5);
}

.block {
	display: flex;
	gap: 16px;
	flex-direction: column;

	@media (min-width: 1601px) {
		flex-direction: row;
	}
}
</style>
