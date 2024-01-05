import { defineStore } from 'pinia'
import { computed, inject, ref } from 'vue'
import { createStorie } from '@/utils/utils'
import { getCookie } from '@/plugins/cookie'
import { useDashboardStore } from '@/stores/dashboard'

export const useStoriesStore = defineStore('stories', () => {
	const http_client = inject('http_client')

	const dataIsLoading = ref(false)
	const getDataLoadingStatus = computed(() => dataIsLoading.value)
	const changeDataLoadingStatus = () => dataIsLoading.value = !dataIsLoading.value

	const storiesLifeTime = ref(10)
	const getStoriesLifeTime = computed(() => storiesLifeTime.value)

	const stories = ref([])
	const getStories = computed(() => stories.value)
	function updateStories(data) {
		stories.value = data.map((storie) => createStorie(storie))
	}
	const updateStorieViewedStatus = async (id) => {
		stories.value.find((storie) => storie.id === id).viewed = true

		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}

			const response = await http_client.post(`/stories/${id}/view/`,{} ,axiosConfig)
			if (response.status === 200) await useDashboardStore().fetchDashboardData()
		} catch (error) {
			console.error(error)
		} finally {
			changeDataLoadingStatus()
		}
	}

	const openedStories = ref(null)
	const getOpenedStories = computed(() => openedStories.value)
	function updateOpenedStories(storie) {
		openedStories.value = storie
	}
	function getPrevStorieById(id) {
		return stories.value.find((storie) => storie.id === id - 1)
	}
	function getNextStorieById(id) {
		return stories.value.find((storie) => storie.id === id + 1)
	}

	return {
		storiesLifeTime,
		getStoriesLifeTime,

		stories,
		getStories,
		updateStories,
		updateStorieViewedStatus,

		openedStories,
		getOpenedStories,
		updateOpenedStories,
		getPrevStorieById,
		getNextStorieById,
	}
})
