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
				Курсы
			</h4>
			<div
					v-if="certificates?.count"
					class="certificates mt-7"
			>
				<BaseCard v-for="certificate in certificates?.results" :key="certificate.id" class="pa-8" color="background">
					<BaseSkeletonPath v-if="isLoading" :width="'100%'" :height="184" />
					<div v-else class="certificate">
						<p class="caption-2-regular | certificate__title text-gray900">
							{{ certificate.object.name }}
						</p>
						<img
								:src="certificate?.file"
								:alt="certificate?.object?.name"
								class="course-card__image"
						/>
						<a :href="certificate.file" class="certificate__footer" download target="_blank"> PDF сертификат </a>
					</div>
				</BaseCard>
			</div>
			<p
					v-else
					class="mt-7"
			>
				Здесь будет отображаться информация о пройденных курсах
			</p>
		</template>
	</BaseCard>
</template>

<script setup>
import PersonalInfoPanelSkeleton from '@/views/personal/skeletons/PersonalInfoPanelSkeleton.vue'

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
		type: Object,
		default: {},
	},
})
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
}
.certificate {
	display: grid;
	grid-template-rows: minmax(50px, 80px) minmax(115px, auto) 25px;
	gap: 16px;

	&__title {
		overflow: scroll;
	}

	&__image {
		width: 100%;
		min-height: 100%;
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