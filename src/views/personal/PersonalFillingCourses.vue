<template>
	<BaseCard class="pa-8" width="100%">
		<h4 class="headers-4 | text-gray900">Прохождение курса</h4>
		<BaseSkeletonPath v-if="isLoading" :width="'100%'" :height="44" class="mt-7" />
		<PersonalFillingCoursesCarousel v-else :content="courses" />
		<p class="body-regular | mt-7 mb-4 gray-secondary">
			По окончании курса вы сможете получить сертификат. Который можно будет скачать на сайте.
		</p>
		<a href="https://mm-dev.doclub.tv/media/uploads/certificate/a4_-_1.png" target="_blank" class="body-regular | text-gray800"> Ссылка на образец </a>
	</BaseCard>
</template>

<script setup>
import PersonalFillingCoursesCarousel from '@/views/personal/PersonalFillingCoursesCarousel.vue'

const props = defineProps({
	isLoading: {
		type: Boolean,
		required: true,
	},
	courses: {
		type: Array,
		default: () => [],
	},
})
</script>

<style lang="scss" scoped>
.gray-secondary {
	color: rgba(var(--v-theme-gray900), 0.5);
}
</style>
