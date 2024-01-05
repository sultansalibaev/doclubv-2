import { defineStore } from 'pinia'
import { ref, computed, inject, watch } from 'vue'
import { getCookie } from '@/plugins/cookie'
import { useSnackbar } from '@/composables/snackbar'

const { showSnackbar } = useSnackbar()

export const useCommunitiesStore = defineStore('communities', () => {
	const dataIsLoading = ref(false)
	const getDataLoadingStatus = computed(() => dataIsLoading.value)
	const changeDataLoadingStatus = () => (dataIsLoading.value = !dataIsLoading.value)
	const http_client = inject('http_client')

	const defaultFilters = () => ({
		city: null,
		ordering: 'fill_percentage',
		page: null,
		position_str: null,
		specialization: null,
		work_place: null,
		q: '',
	})
	const filters = ref(defaultFilters())
	const getFilters = computed(() => filters.value)
	const resetFilters = async () => {
		filters.value = defaultFilters()
		await fetchCommunitiesList()
	}

	const updateFilters = async (data, tab) => {
		filters.value.city = data.city
		filters.value.ordering = data.ordering
		filters.value.page = data.page
		filters.value.position_str = data.position_str
		filters.value.specialization = data.specialization
		filters.value.work_place = data.work_place
		filters.value.q = data.q

		if (tab === '/all') await fetchPublishedUsersList(filters.value)
		if (tab === '/experts') await fetchExpertsList(filters.value)
		if (tab === '/mentors') await fetchMentorsList(filters.value)
	}

	const publishedUsersList = ref([])
	const fetchPublishedUsersList = async (data = defaultFilters()) => {
		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}

			const urlParams = {
				city: data.city ? `city=${data.city.id ? data.city.id : data.city}&` : '',
                q: data.q ? `q=${data.q}&` : '',
				ordering: data.ordering ? `ordering=${data.ordering}&` : '',
				page: data.page ? `page=${data.page}&` : '',
				position_str: data.position_str ? `position_str=${data.position_str}&` : '',
				specialization: data.specialization ? `specialization=${data.specialization.id ? data.specialization.id : data.specialization}&` : '',
                work_place: data.work_place ? `work_place=${data.work_place.id ? data.work_place.id : data.work_place}` : '',
			}

			const url = `/profile/?${urlParams.city}${urlParams.q}${urlParams.ordering}${urlParams.page}${urlParams.position_str}${urlParams.specialization}${urlParams.work_place}`

			const response = await http_client.get(url, axiosConfig)
			publishedUsersList.value = response.data.results
		} catch (error) {
			console.error(error)
            showSnackbar('Произошла ошибка при загрузке опубликованных профилей')
		} finally {
			changeDataLoadingStatus()
		}
	}

	const expertsList = ref([])
	const fetchExpertsList = async (data) => {
		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}
			const urlParams = {
                city: data.city ? `city=${data.city.id ? data.city.id : data.city}&` : '',
                q: data.q ? `q=${data.q}&` : '',
                ordering: data.ordering ? `ordering=${data.ordering}&` : '',
                is_expert: `is_expert=true&`,
                page: data.page ? `page=${data.page}&` : '',
                position_str: data.position_str ? `position_str=${data.position_str}&` : '',
                specialization: data.specialization ? `specialization=${data.specialization.id ? data.specialization.id : data.specialization}&` : '',
                work_place: data.work_place ? `work_place=${data.work_place.id ? data.work_place.id : data.work_place}` : '',
			}

			const url = `/profile/?${urlParams.city}${urlParams.q}${urlParams.ordering}${urlParams.is_expert}${urlParams.page}${urlParams.position_str}${urlParams.specialization}${urlParams.work_place}`

			const response = await http_client.get(url, axiosConfig)
			expertsList.value = response.data.results
		} catch (error) {
			console.error(error)
            showSnackbar('Произошла ошибка при загрузке списка экспертов')
		} finally {
			changeDataLoadingStatus()
		}
	}

	const mentorsList = ref([])
	const fetchMentorsList = async (data) => {
		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}
			const urlParams = {
                city: data.city ? `city=${data.city.id ? data.city.id : data.city}&` : '',
                q: data.q ? `q=${data.q}&` : '',
                ordering: data.ordering ? `ordering=${data.ordering}&` : '',
                is_mentor: `is_mentor=true&`,
                page: data.page ? `page=${data.page}&` : '',
                position_str: data.position_str ? `position_str=${data.position_str}&` : '',
                specialization: data.specialization ? `specialization=${data.specialization.id ? data.specialization.id : data.specialization}&` : '',
                work_place: data.work_place ? `work_place=${data.work_place.id ? data.work_place.id : data.work_place}` : '',
			}

			const url = `/profile/?${urlParams.city}${urlParams.q}${urlParams.ordering}${urlParams.is_mentor}${urlParams.page}${urlParams.position_str}${urlParams.specialization}${urlParams.work_place}`

			const response = await http_client.get(url, axiosConfig)
			mentorsList.value = response.data.results
		} catch (error) {
			console.error(error)
            showSnackbar('Произошла ошибка при загрузке списка менторов')
		} finally {
			changeDataLoadingStatus()
		}
	}

	const fetchCommunitiesList = async () => {
		await fetchPublishedUsersList()
		await fetchExpertsList(filters.value)
		await fetchMentorsList(filters.value)
	}

	const getPublishedUsersList = computed(() => publishedUsersList.value)
	const getMentorsList = computed(() => mentorsList.value)
	const getExpertsList = computed(() => expertsList.value)

	const sendTaskToMentor = async (data) => {
		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}
			await http_client.post('/profile/request/', data, axiosConfig)
			showSnackbar('Заявка отправлена успешно')
		} catch (error) {
			console.error(error)
            showSnackbar('Произошла ошибка при отправке заявки ментору')
		} finally {
			changeDataLoadingStatus()
		}
	}

	return {
		getPublishedUsersList,
		getExpertsList,
		getMentorsList,

		fetchCommunitiesList,
		getDataLoadingStatus,

		sendTaskToMentor,

		getFilters,
		updateFilters,
		resetFilters,
	}
})
