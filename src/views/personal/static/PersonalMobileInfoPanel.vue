<template>
	<BaseCard>
		<BaseExpansionPanel :title="t('Personal information')">
			<h5 class="headers-5 | ">
				{{ t('About me') }}
			</h5>
			<p class="body-regular | mt-2 text-gray800 text-pre-wrap">
				{{ about ? about : t('Fill in your information') }}
			</p>
			<h5 class="headers-5 | mt-7">
				{{ t('Job title') }}
			</h5>
			<p class="body-regular | mt-2 text-gray800 text-pre-wrap">
				{{ job ? job : t('Fill in your information') }}
			</p>
			<h5 class="headers-5 | mt-7">
				{{ t('Expertise') }}
			</h5>
			<template v-if="specialization.length">
				<p v-for="item in specialization" :key="item.id" class="body-regular | mt-2 text-gray800">
					{{ item.name }}
				</p>
			</template>
			<template v-else>
				<p class="body-regular | mt-2 text-gray800 text-pre-wrap">
					{{ t('Fill in your information') }}
				</p>
			</template>
			<AppButton class="mt-7" theme="outline" :text="t('Edit')" @click="emit('on-edit-info')" />
		</BaseExpansionPanel>
		<BaseDivider class="my-8" />
		<BaseExpansionPanel :title="t('Contacts')">
			<h5 class="headers-5 | mt-7">
				{{ t('Contacts') }}
			</h5>
			<div class="mt-7 contact-block">
				<div class="contact-block__image">
					<img src="@/assets/contact-icons/phone-call.svg" alt="" />
				</div>
				<div class="ml-4">
					<p class="body-regular | text-gray800">
						{{ contact_phone ? contact_phone : t('Add your nickname or link') }}
					</p>
					<p class="body-regular | mt-1 gray-secondary">{{ t('Telephone') }}</p>
				</div>
			</div>
			<div class="mt-5 contact-block">
				<div class="contact-block__image">
					<img src="@/assets/contact-icons/mail.svg" alt="" />
				</div>
				<div class="ml-4">
					<p class="body-regular | text-gray800">
						{{ contact_email ? contact_email : t('Add email address mail') }}
					</p>
					<p class="body-regular | mt-1 gray-secondary">{{ t('Mail') }}</p>
				</div>
			</div>
			<h5 class="headers-5 | mt-7">
				{{ t('Messengers') }}
			</h5>
			<div class="mt-7 contact-block">
				<div class="contact-block__image">
					<img src="@/assets/contact-icons/tg.svg" alt="" />
				</div>
				<div class="ml-4">
					<p class="body-regular | text-gray800">
						{{ telegram ? telegram : t('Add your nickname or link') }}
					</p>
					<p class="body-regular | mt-1 gray-secondary">Telegram</p>
				</div>
			</div>
			<div class="mt-5 contact-block">
				<div class="contact-block__image">
					<img src="@/assets/contact-icons/whatsapp.svg" alt="" />
				</div>
				<div class="ml-4">
					<p class="body-regular | text-gray800">
						{{ whatsapp ? whatsapp : t('Add email address mail') }}
					</p>
					<p class="body-regular | mt-1 gray-secondary">Whatsapp</p>
				</div>
			</div>
			<h5 class="headers-5 | mt-7">
				{{ t('Social media') }}
			</h5>
			<div class="mt-7 contact-block">
				<div class="contact-block__image">
					<img src="@/assets/contact-icons/facebook.svg" alt="" />
				</div>
				<div class="ml-4">
					<p class="body-regular | text-gray800">
						{{ facebook ? facebook : t('Add your nickname or link') }}
					</p>
					<p class="body-regular | mt-1 gray-secondary">Facebook</p>
				</div>
			</div>
			<div class="mt-5 contact-block">
				<div class="contact-block__image">
					<img src="@/assets/contact-icons/instagram.svg" alt="" />
				</div>
				<div class="ml-4">
					<p class="body-regular | text-gray800">
						{{ instagram ? instagram : t('Add email address mail') }}
					</p>
					<p class="body-regular | mt-1 gray-secondary">Instagram</p>
				</div>
			</div>
			<AppButton class="mt-7" theme="outline" :text="t('Edit')" @click="emit('on-edit-contacts')" />
		</BaseExpansionPanel>
		<BaseDivider class="my-8" />
		<BaseExpansionPanel :title="t('Education')">
			<h5 class="headers-5 | mt-7">
				{{ t('School name') }}
			</h5>
			<p class="body-regular | mt-2 text-gray800">
				{{ university?.name ? university?.name : t('Add school') }}
			</p>
			<h5 class="headers-5 | mt-7">
				{{ t('Department') }}
			</h5>
			<p class="body-regular | mt-2 text-gray800">
				{{ university_department?.name ? university_department.name : t('Add department') }}
			</p>
			<h5 class="headers-5 | mt-7">
				{{ t('Specialty') }}
			</h5>
			<p class="body-regular | mt-2 text-gray800">
				{{ university_speciality ? university_speciality : t('Add Specialty') }}
			</p>
			<AppButton class="mt-7" theme="outline" :text="t('Edit')" @click="emit('on-edit-education')" />
		</BaseExpansionPanel>
		<BaseDivider class="my-8" />
		<BaseExpansionPanel :title="t('Work')">
			<h5 class="headers-5 | mt-7">
				{{ t('Organization') }}
			</h5>
			<p class="body-regular | mt-2 text-gray800">
				{{ workPlace?.name ? workPlace?.name : t('Add Organization') }}
			</p>
			<h5 class="headers-5 | mt-7">
				{{ t('Website') }}
			</h5>
			<p class="body-regular | mt-2 text-gray800">
				{{ workPlace?.address ? workPlace?.address : t('Add website') }}
			</p>
			<h5 class="headers-5 | mt-7">
				{{ t('Work phone') }}
			</h5>
			<p class="body-regular | mt-2 text-gray800">
				{{ workPhone ? workPhone : t('Add Work phone') }}
			</p>
			<AppButton class="mt-7" theme="outline" :text="t('Edit')" @click="emit('on-edit-work')" />
		</BaseExpansionPanel>
		<BaseDivider class="my-8" />
		<BaseExpansionPanel :title="t('Experience')">
			<div v-if="workPlaces.length" class="mt-7 experiences-list">
				<div v-for="place in workPlaces" :key="place?.id" class="experiences-list__item work-place">
					<div class="work-place__logo-wrapper">
						<img v-if="place?.logo" :src="place.logo" alt="" class="work-place__logo">
						<img v-else src="@/assets/default-work-place-logo.png" alt="" class="work-place__logo" />
					</div>
					<div>
						<p class="body-regular | text-gray800">
							{{ place?.position_str }}, {{ place?.work_place_str }}
						</p>
						<p class="body-regular | mt-1 gray-secondary">
							{{ datesPeriod(place?.date_from) }} – {{ datesPeriod(place?.date_to) }}
						</p>
					</div>
				</div>
			</div>
			<p v-else class="body-regular | mt-7 gray-secondary">
				{{ t('Add information about your previous work experience') }}
			</p>
			<AppButton class="mt-7" theme="outline" :text="t('Edit')" @click="emit('on-edit-experience')" />
		</BaseExpansionPanel>
		<BaseDivider class="my-8" />
		<BaseExpansionPanel :title="t('Certificates')">
			<div class="mt-7 certificates">
				<BaseCard v-for="certificate in certificates" :key="certificate.id" class="certificates__item certificate"
					color="background" @click="openOnFullScreen(certificate)">
					<BaseSkeletonPath v-if="isLoading" :width="'100%'" :height="160" />
					<img v-else :src="certificate.file" :alt="certificate.file" />
				</BaseCard>
			</div>
			<AppButton class="mt-7" theme="outline" :text="certificates.length ? t('Edit') : t('Add')"
				@click="emit('on-edit-certificates')" />
			<BaseModal :show-modal="showModal" :persistent="true" :max-width="1050" :max-height="705"
				@on-close="closeModal()">
				<div class="single-certificate">
					<div class="single-certificate__img-wrapper">
						<img :src="modalContent.file" :alt="modalContent.file" class="single-certificate__img" />
					</div>
					<div class="single-certificate__buttons mt-6">
						<AppButton :disabled="modalContent.id === firstCertificate" theme="outline" text="Назад"
							@click="prevCertificate(modalContent.id)" />
						<AppButton theme="outline" text="Удалить сертификат" @click="deleteItem(modalContent.id)" />
						<AppButton :disabled="modalContent.id === lastCertificate" theme="outline" text="Вперёд"
							@click="nextCertificate(modalContent.id)" />
					</div>
				</div>
			</BaseModal>
		</BaseExpansionPanel>
		<BaseDivider class="my-8" />
		<BaseExpansionPanel :title="t('Courses certificates')">
			<div v-if="courses?.count" class="courses-certificates mt-7">
				<BaseCard v-for="certificate in courses?.results" :key="certificate.id" class="pa-8" color="background">
					<BaseSkeletonPath v-if="isLoading" :width="'100%'" :height="184" />
					<div v-else class="courses-certificate">
						<p class="caption-2-regular | courses-certificate__title text-gray900">
							{{ certificate.object.name }}
						</p>
						<div class="courses-certificate__img-wrapper">
							<img :src="certificate?.file" :alt="certificate?.object?.name"
								class="courses-certificate__img" />
						</div>
						<a :href="certificate.file" class="courses-certificate__footer" download target="_blank"> {{ t('PDF Certificates') }} </a>
					</div>
				</BaseCard>
			</div>
			<p v-else class="mt-7">
				{{ t('Information about completed courses will be displayed here') }}
			</p>
		</BaseExpansionPanel>
	</BaseCard>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useCertificatesStore } from '@/stores/certificates'
import AppButton from '@/components/AppButton.vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const certificatesStore = useCertificatesStore()

const props = defineProps({
	isLoading: {
		type: Boolean,
		default: false,
	},
	about: {
		type: [String, Number],
		default: '',
	},
	job: {
		type: [String, Number],
		default: '',
	},
	specialization: {
		type: Array,
		default: [],
	},
	contact_phone: {
		type: String,
		default: '',
	},
	telegram: {
		type: String,
		default: '',
	},
	facebook: {
		type: String,
		default: '',
	},
	contact_email: {
		type: String,
		default: '',
	},
	whatsapp: {
		type: String,
		default: '',
	},
	instagram: {
		type: String,
		default: '',
	},
	university: {
		type: Object,
		default: {},
	},
	university_department: {
		type: Object,
		default: {},
	},
	university_speciality: {
		type: String,
		default: '',
	},
	workPlace: {
		type: Object,
		default: {},
	},
	workPhone: {
		type: String,
		default: '',
	},
	workPlaces: {
		type: Array,
		default: [],
	},
	certificates: {
		type: Array,
		default: [],
	},
	courses: {
		type: Object,
		default: {},
	},
})

const emit = defineEmits(['on-edit-info', 'on-edit-contacts', 'on-edit-education', 'on-edit-experience', 'on-edit-certificates',])

//experience
const datesPeriod = (date) => {
	if (!date) return 'Некорректная дата'

	const options = {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		timezone: 'UTC',
	}

	return new Date(date).toLocaleString('ru', options).split(' г.')[0]
}


//certificates
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
.contact-block {
	display: flex;
	gap: 16px;

	&__image {
		width: 52px;
		height: 52px;
		padding: 14px;
		border-radius: 12px;
		background: #F1EDFF;
	}
}

.experiences-list {
	display: grid;
	gap: 20px;
}

.work-place {
	display: flex;
	gap: 16px;

	&__logo-wrapper {
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

	&__logo {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
}

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

.courses-certificates {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(3, 1fr);

	@media (max-width: 2000px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 1599px) {
		grid-template-columns: 1fr;
	}
}

.courses-certificate {
	display: grid;
	grid-template-rows: minmax(50px, 80px) minmax(115px, auto) 25px;
	gap: 16px;

	&__title {
		overflow: scroll;
	}

	&__img {
		width: 100%;

		&-wrapper {
			width: 100%;
		}
	}

	&__footer {
		font-family: var(--text-font);
		font-weight: 400;
		font-style: normal;
		font-size: 16px;
		line-height: 24px;
		text-decoration-line: underline;
		color: var(--text-secondary-color);

		transition: var(--base-transition);

		&:hover,
		&:focus {
			outline: none;
			color: var(--text-primaty-color);
		}
	}
}
</style>