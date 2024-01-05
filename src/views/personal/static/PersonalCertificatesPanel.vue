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
				Сертификаты
			</h4>
			<div class="mt-7 certificates">
				<BaseCard
						v-for="certificate in certificates"
						:key="certificate.id"
						class="certificates__item certificate"
						color="background"
						@click="openOnFullScreen(certificate)"
				>
					<BaseSkeletonPath v-if="isLoading" :width="'100%'" :height="160" />
					<img v-else :src="certificate.file" :alt="certificate.file" />
				</BaseCard>
			</div>
			<AppButton
					class="mt-7"
					theme="outline"
					:text="certificates.length ? 'Edit' : 'Добавить'"
					@click="emit('on-edit')"
			/>
		</template>
		<BaseModal
				:show-modal="showModal"
				:persistent="true"
				:max-width="1050"
				:max-height="705"
				@on-close="closeModal()"
		>
			<div class="single-certificate">
				<div class="single-certificate__img-wrapper">
					<img
							:src="modalContent.file"
							:alt="modalContent.file"
							class="single-certificate__img"
					/>
				</div>
				<div class="single-certificate__buttons mt-6">
					<AppButton
							:disabled="modalContent.id === firstCertificate"
							theme="outline"
							text="Назад"
							@click="prevCertificate(modalContent.id)"
					/>
					<AppButton
							theme="outline"
							text="Удалить сертификат"
							@click="deleteItem(modalContent.id)"
					/>
					<AppButton
							:disabled="modalContent.id === lastCertificate"
							theme="outline"
							text="Вперёд"
							@click="nextCertificate(modalContent.id)"
					/>
				</div>
			</div>
		</BaseModal>
	</BaseCard>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useCertificatesStore } from '@/stores/certificates'
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import AppButton from '@/components/AppButton.vue'
import PersonalInfoPanelSkeleton from '@/views/personal/skeletons/PersonalInfoPanelSkeleton.vue'

const certificatesStore = useCertificatesStore()

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
	certificates: {
		type: Array,
		default: [],
	},
})

const emit = defineEmits(['on-edit'])

const showModal = ref(false)
const modalContent = ref({})
const openOnFullScreen = (event) => {
	modalContent.value = event
	showModal.value = true
	document.querySelector('.page-layout__main-content').style.zIndex = 1000
}
const closeModal = () => {
	modalContent.value = {}
	showModal.value = false
	document.querySelector('.page-layout__main-content').style.zIndex = ''
}
const prevCertificate = (id) => {
	const current = props.certificates.findIndex((item) => item.id === id)
	modalContent.value = props.certificates[current - 1]
}
const nextCertificate = (id) => {
	const current = props.certificates.findIndex((item) => item.id === id)
	modalContent.value = props.certificates[current + 1]
}

const firstCertificate = computed(() => props.certificates[0]?.id)
const lastCertificate = computed(() => props.certificates[props.certificates.length - 1]?.id)

const deleteItem = async (event) => await certificatesStore.deleteCertificate(event).then(() => closeModal())
</script>

<style lang="scss" scoped>
.certificates {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(3, 1fr);

	@media (max-width: 2000px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (max-width: 1599px) {
		grid-template-columns: 1fr;
	}

	&__item {
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: var(--base-transition);
		cursor: pointer;

		&:hover,
		&:focus {
			box-shadow: var(--hover-shadow);
		}

		img {
			width: 100%;
			height: auto;
		}
	}
}
.certificate {
	padding: 12px;
	position: relative;
	flex-direction: column;

	@media (min-width: 600px) {
		padding: 32px;
	}

	&__add-icon {
		max-width: 24px;
		max-height: 24px;
	}

	&__button {
		position: absolute;
		top: 20px;
		right: 20px;
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid rgb(var(--v-theme-gray400));
		border-radius: 12px;
		background: rgb(var(--v-theme-background-primary));

		& img {
			width: 24px;
			height: 24px;
		}
	}
}

.single-certificate {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;

	&__img {
		width: 100%;

		&__wrapper {
			width: 100%;
		}
	}
	&__buttons {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
}
</style>