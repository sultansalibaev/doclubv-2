import { defineStore } from 'pinia'
import {ref, computed, inject} from 'vue'

export const useFiltersStore = defineStore('filters', () => {
	const dataIsLoading = ref(false)
	const getDataLoadingStatus = computed(() => dataIsLoading.value)
	function changeDataLoadingStatus() {
		dataIsLoading.value = !dataIsLoading.value
	}
	const http_client = inject('http_client')

	const defaultFilters = () =>({
		q: '',
		tags: [],
		themes: [],
	})
	const filters = ref(defaultFilters())

	const tags = ref([])
	const getTagsData = computed(() => tags.value)
	const fetchTags = async () => {
		try {
			changeDataLoadingStatus()

			const response = await http_client.get('/references/tags/')

			if (response.status === 200) {
				tags.value = response.data
			} else {
				console.log(response)
			}
		} catch (error) {
			console.error(error)
			showSnackbar('Произошла ошибка при загрузке университетов')
		} finally {
			changeDataLoadingStatus()
		}
	}

	const themes = ref([])
	const getThemesData = computed(() => themes.value)
	const fetchThemes = async () => {
		try {
			changeDataLoadingStatus()

			const response = await http_client.get('/courses/themes/')

			if (response.status === 200) {
				themes.value = response.data
			} else {
				console.log(response)
			}
		} catch (error) {
			console.error(error)
			showSnackbar('Произошла ошибка при загрузке университетов')
		} finally {
			changeDataLoadingStatus()
		}
	}

	const resetFilters = () => filters.value = defaultFilters()

	const updateTagsFilters = (data) => filters.value.tags = data
	const updateThemesFilters = (data) => filters.value.themes = data
	const updateSearch = (data) => filters.value.q = data

	const getFiltersState = computed(() => filters.value)

	return {
		fetchTags,
		getTagsData,

		fetchThemes,
		getThemesData,

		updateTagsFilters,
		updateThemesFilters,
		updateSearch,

		getFiltersState,
		resetFilters,
	}
})
