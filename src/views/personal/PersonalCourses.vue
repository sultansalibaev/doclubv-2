<template>
	<BaseCard class="pa-8">
		<h4 class="headers-4 | text-gray-800">Курсы</h4>
		<div
			v-if="info?.results?.length"
			class="certificates mt-7"
		>
			<BaseCard v-for="course in info.results" :key="course.id" class="pa-8" color="background">
				<BaseSkeletonPath v-if="isLoading" :width="'100%'" :height="184" />
				<div v-else class="s-course-card">
					<p class="caption-2-regular | s-course-card__title text-gray900">
						{{ course.object.name }}
					</p>
					<img
						:src="course?.file"
						:alt="course?.object?.name"
						class="course-card__image"
					/>
					<a :href="course.file" class="s-course-card__footer" download target="_blank"> PDF сертификат </a>
				</div>
			</BaseCard>
		</div>
		<p
			v-else
			class="mt-7"
		>
			Здесь будет отображаться информация о пройденных курсах
		</p>
	</BaseCard>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	isLoading: {
		type: Boolean,
		required: true,
	},
	info: {
		type: Object,
		required: true,
	},
})

// Временный код для отображения замоканных изображений
const buildType = computed(() => import.meta.env.MODE)
</script>

<style lang="scss" scoped>
.s-course-card {
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

.certificates {
	display: grid;
	gap: 16px;
	grid-template-columns: repeat(3, 1fr);

	@media (max-width: 1770px) {
		grid-template-columns: repeat(2, 1fr);
	}
	@media (max-width: 767px) {
		grid-template-columns: 1fr;
	}
}
</style>
