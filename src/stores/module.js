import { defineStore } from 'pinia'
import { ref, computed, inject } from 'vue'
import { createCourse, createModulePreview } from '@/utils/utils'
import { getCookie } from '@/plugins/cookie'
// import { useI18n } from "vue-i18n";
// const { t } = useI18n();

import { useSnackbar } from '@/composables/snackbar'

const { showSnackbar } = useSnackbar()

export const useModuleStore = defineStore('module', () => {
	const http_client = inject('http_client')

	const dataIsLoading = ref(false)
	const getDataLoadingStatus = computed(() => dataIsLoading.value)
	const changeDataLoadingStatus = () => dataIsLoading.value = !dataIsLoading.value

	const breadcrumbs = ref([])
	const getBreadcrumbs = computed(() => breadcrumbs.value)
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

	const recommendations = ref([])
	const getRecommendations = computed(() => recommendations.value)

	const module = ref(null)
	const getModuleInfo = computed(() => module.value)

	async function updateModuleInfo(id = null) {
		if (!id) {
			module.value = {}
			return
		}

		module.value = null
		module.value = await fetchModule(id)
		updateBreadcrumbs(module.value.name)
	}

	async function fetchModule(id) {
		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}

			const response = await http_client.get(`/courses/modules/${id}/`, axiosConfig)

			return response.data
		} catch (error) {
			console.error(error)
			showSnackbar('Произошла ошибка при загрузке модуля')
		} finally {
			changeDataLoadingStatus()
		}
	}

	async function fetchModuleStatus() {
		changeDataLoadingStatus()
		const axiosConfig = {
			headers: {
				Authorization: `Bearer ${getCookie('accessToken')}`,
			},
		}

		const response = await http_client.post(`/courses/modules/${module.value.id}/start/`, {
			label: 'video',
			object_id: module.value.id,
		}, axiosConfig)

		changeDataLoadingStatus()

		return response.data
	}

	const fetchModulePoint = async (moduleId, contentId) => {
		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}

			const response = await http_client.post(`/courses/modules/${moduleId}/point/`, { label: 'material', object_id: contentId }, axiosConfig)

			if (response.status === 200) await updateModuleInfo(moduleId)
		} catch (error) {
			console.error(error)
		} finally {
			changeDataLoadingStatus()
		}
	}

	const fetchModuleRecommendations = async (id) => {
		try {
			changeDataLoadingStatus()

			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}

			const response = await http_client.get(`/courses/modules/${id}/recommendations/`, axiosConfig)
			recommendations.value = response.data
		} catch (error) {
			console.error(error)
		} finally {
			changeDataLoadingStatus()
		}
	}

	return {
		breadcrumbs,
		getBreadcrumbs,
		updateBreadcrumbs,
		fetchModuleRecommendations,
		getRecommendations,
		module,
		getModuleInfo,
		updateModuleInfo,
		fetchModule,

		fetchModulePoint,

		getDataLoadingStatus,
		fetchModuleStatus,
	}
})
