import { defineStore } from 'pinia'
import { ref, computed, inject } from 'vue'
import { getCookie } from '@/plugins/cookie'
import { useSnackbar } from '@/composables/snackbar'
import { useFiltersStore } from '@/stores/filters'

const { showSnackbar } = useSnackbar()

export const useMediaStore = defineStore('media', () => {
	const dataIsLoading = ref(false)
	const getDataLoadingStatus = computed(() => dataIsLoading.value)
	const changeDataLoadingStatus = () => (dataIsLoading.value = !dataIsLoading.value)
	const http_client = inject('http_client')

	const mediaList = ref([])
	const fetchMediaList = async () => {
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
				sponsors: data?.sponsors ? `sponsors=${data.sponsors}&` : '',
				tags: data?.tags ? `tags=${data.tags.map(item => item.id).join('%2C')}&` : '',
				themes: data?.themes ? `themes=${data.themes.map(item => item.id).join('%2C')}&` : '',
			}

			const url = `/media/search/?${urlParams.q}${urlParams.sponsors}${urlParams.tags}${urlParams.themes}`

			const response = await http_client.get(url, axiosConfig)
			mediaList.value = response.data
		} catch (error) {
			console.error(error)
		} finally {
			changeDataLoadingStatus()
		}
	}

	const mediaArticle = ref({})
	const fetchMediaArticle = async (id) => {
		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}

			const response = await http_client.get(`/media/articles/${id}/`, axiosConfig)
			mediaArticle.value = response.data
		} catch (error) {
			console.error(error)
		} finally {
			changeDataLoadingStatus()
		}
	}

	const mediaRecommendations = ref([])
	const fetchMediaArticleRecommendations = async (id) => {
		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}

			const response = await http_client.get(`/media/articles/${id}/recommendations/`, axiosConfig)
			mediaRecommendations.value = response.data
		} catch (error) {
			console.error(error)
		} finally {
			changeDataLoadingStatus()
		}
	}

	const getMediaList = computed(() => mediaList.value)
	const getMediaArticle = computed(() => mediaArticle.value)
	const getMediaRecommendations = computed(() => mediaRecommendations.value)

	return {
		getMediaList,
		getMediaArticle,
		getMediaRecommendations,
		fetchMediaList,
		fetchMediaArticle,
		fetchMediaArticleRecommendations,

		getDataLoadingStatus,
	}
})
