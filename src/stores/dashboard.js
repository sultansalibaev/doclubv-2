import { defineStore } from 'pinia'
import { ref, computed, inject } from 'vue'
import { getCookie } from '@/plugins/cookie'
import { useStoriesStore } from '@/stores/stories'

export const useDashboardStore = defineStore('dashboard', () => {
	const axiosConfig = {
		headers: {
			Authorization: `Bearer ${getCookie('accessToken')}`,
		},
	}

	const dataIsLoading = ref(false)
	const getDataLoadingStatus = computed(() => dataIsLoading.value)
	const changeDataLoadingStatus = () => (dataIsLoading.value = !dataIsLoading.value)
	const http_client = inject('http_client')

	const media = ref([])
	const getMedia = computed(() => media.value)
	function updateMedia(mediaArray) {
		media.value = mediaArray
	}

	const modules = ref([])
	const getModules = computed(() => modules.value)
	function updateModules(modulesArray) {
		modules.value = modulesArray
	}

	const modulesTotal = ref(0)
	const getModulesTotal = computed(() => modulesTotal.value)
	function updateModulesTotal(count) {
		modulesTotal.value = count
	}

	const modulesPaginationPrevLink = ref(null)
	const getModulesPaginationPrevLink = computed(() => modulesPaginationPrevLink.value)
	function updateModulesPaginationPrevLink(link) {
		modulesPaginationPrevLink.value = link
	}

	const modulesPaginationNextLink = ref(null)
	const getModulesPaginationNextLink = computed(() => modulesPaginationNextLink.value)
	function updateModulesPaginationNextLink(link) {
		modulesPaginationNextLink.value = link
	}

	const modulesPaginationCurrentPage = ref(1)
	const getModulesPaginationCurrentPage = computed(() => modulesPaginationCurrentPage.value)
	function updateModulesPaginationCurrentPage(newPage) {
		modulesPaginationCurrentPage.value = newPage
	}

	async function fetchDashboardData() {
		changeDataLoadingStatus()
		const storiesStore = useStoriesStore()

		const response = await http_client.get('/dashboard/', axiosConfig)
		updateMedia(response.data.media)
		// updateModules(response.data.modules)
		storiesStore.updateStories(response.data.stories)
		changeDataLoadingStatus()
	}

	async function fetchModules(page) {
		const response = await http_client.get(`/dashboard/modules/?page=${page}`, axiosConfig)
		updateModules(response.data.results)
		updateModulesTotal(response.data.count)
		updateModulesPaginationPrevLink(response.data.previous)
		updateModulesPaginationNextLink(response.data.next)
		updateModulesPaginationCurrentPage(page)
	}

	return {
		getDataLoadingStatus,

		media,
		getMedia,
		updateMedia,

		modulesTotal,
		getModulesTotal,
		updateModulesTotal,

		modules,
		getModules,
		updateModules,

		modulesPaginationPrevLink,
		getModulesPaginationPrevLink,
		updateModulesPaginationPrevLink,

		modulesPaginationCurrentPage,
		getModulesPaginationCurrentPage,
		updateModulesPaginationCurrentPage,

		modulesPaginationNextLink,
		getModulesPaginationNextLink,
		updateModulesPaginationNextLink,

		fetchDashboardData,
		fetchModules,
	}
})
