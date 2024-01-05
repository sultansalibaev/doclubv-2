import { defineStore } from 'pinia'
import { ref, computed, inject, reactive } from 'vue'
import { useSnackbar } from '@/composables/snackbar'

const { showSnackbar } = useSnackbar()

export const useUtilsStore = defineStore('utils', () => {
	const dataIsLoading = ref(false)
	const getDataLoadingStatus = computed(() => dataIsLoading.value)
	function changeDataLoadingStatus() {
		dataIsLoading.value = !dataIsLoading.value
	}
	const http_client = inject('http_client')

	const cities = ref([])
	const getCitiesData = computed(() => cities.value)
	const fetchCities = async () => {
		try {
			changeDataLoadingStatus()

			const response = await http_client.get('/references/cities/')

			if (response.status === 200) {
				cities.value = response.data
			} else {
				console.log(response)
			}
		} catch (error) {
			console.error(error)
			showSnackbar('Произошла ошибка при загрузке городов')
		} finally {
			changeDataLoadingStatus()
		}
	}

	const workPlaces = ref([])
	const getWorkPlacesData = computed(() => workPlaces.value)
	const fetchWorkPlaces = async () => {
		try {
			changeDataLoadingStatus()

			const response = await http_client.get('/references/work-places/')

			if (response.status === 200) {
				workPlaces.value = response.data
			} else {
				console.log(response)
			}
		} catch (error) {
			console.error(error)
			showSnackbar('Произошла ошибка при загрузке мест работы')
		} finally {
			changeDataLoadingStatus()
		}
	}

	const specializations = ref([])
	const getSpecializationsData = computed(() => specializations.value)
	const fetchSpecializations = async () => {
		try {
			changeDataLoadingStatus()

			const response = await http_client.get('/references/specializations/')

			if (response.status === 200) {
				specializations.value = response.data
			} else {
				console.log(response)
			}
		} catch (error) {
			console.error(error)
			showSnackbar('Произошла ошибка при загрузке специализаций')
		} finally {
			changeDataLoadingStatus()
		}
	}

	const universities = ref([])
	const getUniversitiesData = computed(() => universities.value)
	const fetchUniversities = async () => {
		try {
			changeDataLoadingStatus()

			const response = await http_client.get('/references/universities/')

			if (response.status === 200) {
				universities.value = response.data
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

	const sponsors = ref([])
	const getSponsorsData = computed(() => sponsors.value)
	const fetchSponsors = async () => {
		try {
			changeDataLoadingStatus()

			const response = await http_client.get('/references/sponsors/')

			if (response.status === 200) {
				sponsors.value = response.data
			} else {
				console.log(response)
			}
		} catch (error) {
			console.error(error)
			showSnackbar('Произошла ошибка при загрузке спонсоров')
		} finally {
			changeDataLoadingStatus()
		}
	}

	const sponsor = ref({})
	const getSponsorData = computed(() => sponsor.value)
	const fetchSponsor = async (id) => {
		try {
			changeDataLoadingStatus()

			const response = await http_client.get(`/references/sponsors/${id}/`)

			if (response.status === 200) {
				sponsor.value = response.data
			} else {
				console.log(response)
			}
		} catch (error) {
			console.error(error)
			showSnackbar('Произошла ошибка при загрузке спонсоров')
		} finally {
			changeDataLoadingStatus()
		}
	}

	return {
		fetchSpecializations,
		getSpecializationsData,

		fetchCities,
		getCitiesData,

		fetchWorkPlaces,
		getWorkPlacesData,

		fetchUniversities,
		getUniversitiesData,

		fetchSponsors,
		getSponsorsData,

		fetchSponsor,
		getSponsorData,

		getDataLoadingStatus,
	}
})
