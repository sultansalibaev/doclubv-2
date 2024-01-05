import { defineStore } from 'pinia'
import { ref, computed, inject } from 'vue'
import { getCookie } from '@/plugins/cookie'
import { useSnackbar } from '@/composables/snackbar'

import { useModuleStore } from '@/stores/module'
import { useCourseStore } from '@/stores/course'
import { useMediaStore } from '@/stores/media'

const { showSnackbar } = useSnackbar()

export const useFavoritesStore = defineStore('favorites', () => {
	const moduleStore = useModuleStore()
	const courseStore = useCourseStore()
	const mediaStore = useMediaStore()

	const dataIsLoading = ref(false)
	const getDataLoadingStatus = computed(() => dataIsLoading.value)
	const changeDataLoadingStatus = () => (dataIsLoading.value = !dataIsLoading.value)
	const http_client = inject('http_client')

	const all = ref([])
	const favoritesArticles = ref([])
	const favoritesCourses = ref([])
	const favoritesModules = ref([])

	const fetchFavoritesList = async () => {
		await fetchAllFavorites()
		await fetchFavoritesArticles()
		await fetchFavoritesCourses()
		await fetchFavoritesModules()
	}

	const fetchAllFavorites = async () => {
		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}

			const response = await http_client.get('/profile/favorites/', axiosConfig)
			if (response.status === 200) all.value = response.data
		} catch (error) {
			console.error(error)
		} finally {
			changeDataLoadingStatus()
		}
	}
	const fetchFavoritesArticles = async (page = 1) => {
		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}

			const response = await http_client.get(`/profile/favorites/article/?page=${page}`, axiosConfig)
			if (response.status === 200) favoritesArticles.value = response.data
		} catch (error) {
			console.error(error)
		} finally {
			changeDataLoadingStatus()
		}
	}
	const fetchFavoritesCourses = async (page = 1) => {
		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}

			const response = await http_client.get(`/profile/favorites/course/?page=${page}`, axiosConfig)
			if (response.status === 200) favoritesCourses.value = response.data
		} catch (error) {
			console.error(error)
		} finally {
			changeDataLoadingStatus()
		}
	}
	const fetchFavoritesModules = async (page = 1) => {
		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}

			const response = await http_client.get(`/profile/favorites/module/?page=${page}`, axiosConfig)
			if (response.status === 200) favoritesModules.value = response.data
		} catch (error) {
			console.error(error)
		} finally {
			changeDataLoadingStatus()
		}
	}

	const addModuleToFavoritesList = async (id) => {
		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}

			const response = await http_client.post(`/courses/modules/${id}/favorite/`, {}, axiosConfig)
			if (response.status === 200) await moduleStore.updateModuleInfo(id)
		} catch (error) {
			console.error(error)
		} finally {
			changeDataLoadingStatus()
		}
	}
	const deleteModuleFromFavoritesList = async (id) => {
		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}

			const response = await http_client.delete(`/courses/modules/${id}/favorite/`, axiosConfig)
			if (response.status === 204) await moduleStore.updateModuleInfo(id)
		} catch (error) {
			console.error(error)
		} finally {
			changeDataLoadingStatus()
		}
	}

	const addCourseToFavoritesList = async (id) => {
		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}

			const response = await http_client.post(`/courses/${id}/favorite/`, {}, axiosConfig)
			if (response.status === 200) await courseStore.updateCourseInfo(id)
		} catch (error) {
			console.error(error)
		} finally {
			changeDataLoadingStatus()
		}
	}
	const deleteCourseFromFavoritesList = async (id) => {
		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}

			const response = await http_client.delete(`/courses/${id}/favorite/`, axiosConfig)
			if (response.status === 204) await courseStore.updateCourseInfo(id)
		} catch (error) {
			console.error(error)
		} finally {
			changeDataLoadingStatus()
		}
	}

	const addArticleToFavoritesList = async (id) => {
		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}

			const response = await http_client.post(`/media/articles/${id}/favorite/`, {}, axiosConfig)
			if (response.status === 200) await mediaStore.fetchMediaArticle(id)
		} catch (error) {
			console.error(error)
		} finally {
			changeDataLoadingStatus()
		}
	}
	const deleteArticleFromFavoritesList = async (id) => {
		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}

			const response = await http_client.delete(`/media/articles/${id}/favorite/`, axiosConfig)
			if (response.status === 204) await mediaStore.fetchMediaArticle(id)
		} catch (error) {
			console.error(error)
		} finally {
			changeDataLoadingStatus()
		}
	}

	const getAllFavoritesList = computed(() => all.value)
	const getFavoritesArticles = computed(() => favoritesArticles.value)
	const getFavoritesCourses = computed(() => favoritesCourses.value)
	const getFavoritesModules = computed(() => favoritesModules.value)

	return {
		fetchFavoritesList,
        fetchFavoritesArticles,
        fetchFavoritesCourses,
        fetchFavoritesModules,

		addModuleToFavoritesList,
		deleteModuleFromFavoritesList,

		addCourseToFavoritesList,
		deleteCourseFromFavoritesList,

		addArticleToFavoritesList,
		deleteArticleFromFavoritesList,

		getAllFavoritesList,
		getFavoritesArticles,
		getFavoritesModules,
		getFavoritesCourses,
		getDataLoadingStatus,
	}
})
