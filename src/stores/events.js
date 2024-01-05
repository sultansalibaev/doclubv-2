import { defineStore } from 'pinia'
import { ref, computed, inject } from 'vue'
import { useSnackbar } from '@/composables/snackbar'
import { getCookie } from '@/plugins/cookie'
import { useFiltersStore } from '@/stores/filters'
// import { useI18n } from "vue-i18n";
// const { t } = useI18n();

const { showSnackbar } = useSnackbar()

export const useEventsStore = defineStore('events', () => {
	const dataIsLoading = ref(false)
	const getDataLoadingStatus = computed(() => dataIsLoading.value)
	const changeDataLoadingStatus = () => dataIsLoading.value = !dataIsLoading.value


	const dataIsLoading1 = ref(false)
	const getDataLoadingStatus1 = computed(() => dataIsLoading1.value)
	const changeDataLoadingStatus1 = () => dataIsLoading1.value = !dataIsLoading1.value

	const breadcrumbs = ref([])
	const getBreadcrumbs = computed(() => breadcrumbs.value)
	function updateBreadcrumbs(lastBreadcrumb) {
		breadcrumbs.value = [
			{
				name: 'Главная', // t('Home'),
				url: '/main',
			},
			{
				name: 'Мероприятия',
				url: '/events',
			},
			{
				name: lastBreadcrumb,
				url: '',
			},
		]
	}

	const http_client = inject('http_client')

	const events = ref([])
	const getEventsData = computed(() => events.value)
	const fetchEvents = async (year, month, lastDayOfMonth) => {
		const data = useFiltersStore().getFiltersState
		try {
			changeDataLoadingStatus1()

			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}

			const urlParams = {
				q: data.q ? `q=${data?.q}&` : '',
				tags: data?.tags ? `tags=${data.tags.map(item => item.id).join('%2C')}&` : '',
				after: `date_range_after=${year}-${month}-01&`,
				before: `date_range_before=${year}-${month}-${lastDayOfMonth}`,
			}

			const url = `/events/?${urlParams.q}${urlParams.tags}${urlParams.after}${urlParams.before}`

			const response = await http_client.get(url, axiosConfig)
			console.log('response-1', response);

			distributionByDates(response.data.results)
		} catch (error) {
			console.error(error)
			showSnackbar('Произошла ошибка при загрузке мероприятий')
		} finally {
			changeDataLoadingStatus1()
		}
	}

	const fetchCalendarEvent = async ({ year, month, day }) => {
		try {
			const response = await http_client.get(`/events/?date=${year}-${month + 1}-${day}`)
			console.log('response-2', response);

			distributionByDates(response.data.results)
		} catch (error) {
			console.error(error)
			showSnackbar('Произошла ошибка при загрузке мероприятий')
		} finally {

		}
	}

	const distributionByDates = (data) => {
		console.log('data', data);
		let distributionedArray = []
		const allDates = new Set(data?.map(item => item.start_date).map(date => date.split('T')[0]))

		for (let i = 0; i < [...allDates].length; i++) {
			const length = data.filter(item => item.start_date.includes([...allDates][i]))
			distributionedArray.push({
				date: [...allDates][i],
				items: length,
			})
		}

		events.value = distributionedArray
	}

	const event = ref([])
	const getEventData = computed(() => event.value)
	const fetchEvent = async (id) => {
		try {
			changeDataLoadingStatus()

			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}

			const response = await http_client.get(`/events/${id}/`, axiosConfig)

			event.value = response.data
			updateBreadcrumbs(event.value.name)
			await fetchUpcomingEvents()
		} catch (error) {
			console.error(error)
			showSnackbar('Произошла ошибка при загрузке мероприятия')
		} finally {
			changeDataLoadingStatus()
		}
	}

	const upcomingEvents = ref([])
	const getUpcomingEventData = computed(() => upcomingEvents.value)

	const fetchUpcomingEvents = async () => {
		try {
			changeDataLoadingStatus()

			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}

			const response = await http_client.get(`/events/upcoming/`, axiosConfig)

			upcomingEvents.value = response.data
		} catch (error) {
			console.error(error)
			showSnackbar('Произошла ошибка при загрузке ближайших мероприятий')
		} finally {
			changeDataLoadingStatus()
		}
	}


	const scheduleEvents = ref({})
	const getScheduleEvents = computed(() => scheduleEvents.value)
	const fetchScheduleEvents = async (year, month) => {
		try {
			changeDataLoadingStatus1()

			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}

			const response = await http_client.get(`/events/schedule/?month=${year}-${month}`, axiosConfig)
			scheduleEvents.value = response.data
		} catch (error) {
			console.error(error)
			showSnackbar('Произошла ошибка при загрузке мероприятия')
		} finally {
			changeDataLoadingStatus1()
		}
	}

	const registrationOnEvent = async (id) => {
		try {
			changeDataLoadingStatus()

			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}

			await http_client.post(`/events/${id}/register/`, {}, axiosConfig)
			showSnackbar('Вы успешно зарегистрированы')
			await fetchEvent(id)
		} catch (error) {
			console.error(error)
			showSnackbar('Произошла ошибка при регистрации')
		} finally {
			changeDataLoadingStatus()
		}
	}
	const unregistrationOnEvent = async (id) => {
		try {
			changeDataLoadingStatus()

			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}

			await http_client.delete(`/events/${id}/register/`, axiosConfig)
			showSnackbar('Вы сняты с регистрации')
			await fetchEvent(id)
		} catch (error) {
			console.error(error)
			showSnackbar('Произошла ошибка при снятии с регистрации')
		} finally {
			changeDataLoadingStatus()
		}
	}

	return {
		fetchEvents,
		getEventsData,

		fetchCalendarEvent,

		fetchEvent,
		getEventData,
		getBreadcrumbs,

		registrationOnEvent,
		unregistrationOnEvent,

		fetchUpcomingEvents,
		getUpcomingEventData,

		fetchScheduleEvents,
		getScheduleEvents,

		getDataLoadingStatus,
		getDataLoadingStatus1,
	}
})
