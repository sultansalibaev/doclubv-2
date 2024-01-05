import { defineStore } from 'pinia'
import { ref, inject, computed } from 'vue'
import { getCookie } from '@/plugins/cookie'
import { createCoursePreview, createModulePreview } from '@/utils/utils'
import { useFiltersStore } from '@/stores/filters'

export const useEducationStore = defineStore('education', () => {
	const http_client = inject('http_client')

	const dataIsLoading = ref(false)
	const getDataLoadingStatus = computed(() => dataIsLoading.value)
	const changeDataLoadingStatus = () => dataIsLoading.value = !dataIsLoading.value

	const materials = ref([])
	const getMaterials = computed(() => materials.value)
	const getModules = computed(() =>
		materials.value.filter((material) => material['type'] === 'module'),
	)
	const getCourses = computed(() =>
		materials.value.filter((material) => material['type'] === 'course'),
	)

	function updateMaterials(data) {
		materials.value = data.map((material) => {
			if (material.type === 'course') {
				return createCoursePreview(material)
			}
			if (material.type === 'module') {
				return createModulePreview(material)
			}
			console.warn('Не найден параметр type')
		})
	}

	async function fetchMaterials() {
		changeDataLoadingStatus()

		const axiosConfig = {
			headers: {
				Authorization: `Bearer ${getCookie('accessToken')}`,
			},
		}

		const response = await http_client.get('/courses/all/', axiosConfig)
		updateMaterials(response.data)
		changeDataLoadingStatus()
	}

	const fetchEducationSearch = async () => {
		const data = useFiltersStore().getFiltersState

		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}

			const urlParams = {
				q: data.q ? `q=${data?.q}&` : '',
				course: data?.course ? `course=${data.course}&` : '',
				tags: data?.tags ? `tags=${data.tags.map(item => item.id).join('%2C')}&` : '',
				themes: data?.themes ? `themes=${data.themes.map(item => item.id).join('%2C')}&` : '',
			}

			const url = `/courses/search/?${urlParams.q}${urlParams.course}${urlParams.tags}${urlParams.themes}`

			const response = await http_client.get(url, axiosConfig)
			updateMaterials(response.data)
		} catch (error) {
			console.error(error)
		} finally {
			changeDataLoadingStatus()
		}
	}

	return {
		dataIsLoading,
		getDataLoadingStatus,
		changeDataLoadingStatus,

		fetchEducationSearch,

		materials,
		getMaterials,
		getModules,
		getCourses,
		updateMaterials,
		fetchMaterials,
	}
})
