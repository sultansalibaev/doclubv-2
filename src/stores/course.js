import { defineStore } from 'pinia'
import { ref, computed, inject } from 'vue'
import { getCookie } from '@/plugins/cookie'
import { createCourse, createModulePreview } from '@/utils/utils'

export const useCourseStore = defineStore('course', () => {
	const http_client = inject('http_client')

	const dataIsLoading = ref(false)
	const getDataLoadingStatus = computed(() => dataIsLoading.value)
	const changeDataLoadingStatus = () => dataIsLoading.value = !dataIsLoading.value

	const breadcrumbs = ref([])
	const getBreadCrumbs = computed(() => breadcrumbs)
	function updateBreadcrumbs(lastBreadcrumb) {
		breadcrumbs.value = [
			{
				name: 'Главная',
				url: '/main',
			},
			{
				name: 'Обучение',
				url: '/education',
			},
			{
				name: lastBreadcrumb,
				url: '',
			},
		]
	}

	const course = ref(null)
	const getCourseInfo = computed(() => course.value)
	async function updateCourseInfo(id = null) {
		if (!id) {
			course.value = {}
			return
		}
		try {
			changeDataLoadingStatus()

			const data = await fetchCourse(id)
			const modules = data.modules.map((module) => createModulePreview(module))
			course.value = createCourse(data)
			course.value.modules = modules
			updateBreadcrumbs(course.value.name)
		} catch (error) {
			console.error(error)
		} finally {
			changeDataLoadingStatus()
		}
	}
	async function fetchCourse(id) {
		const axiosConfig = {
			headers: {
				Authorization: `Bearer ${getCookie('accessToken')}`,
			},
		}

		const response = await http_client.get(`/courses/${id}/`, axiosConfig)
		return response.data
	}

	return {
		breadcrumbs,
		getBreadCrumbs,
		updateBreadcrumbs,

		course,
		getCourseInfo,
		updateCourseInfo,
		fetchCourse,

		getDataLoadingStatus,
	}
})
