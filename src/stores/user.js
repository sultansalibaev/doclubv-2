import { defineStore } from 'pinia'
import { ref, computed, inject } from 'vue'
import { getCookie } from '@/plugins/cookie'
import { useSnackbar } from '@/composables/snackbar'

const { showSnackbar } = useSnackbar()

export const useUserStore = defineStore('user', () => {
	const dataIsLoading = ref(false)
	const getDataLoadingStatus = computed(() => dataIsLoading.value)
	const changeDataLoadingStatus = () => (dataIsLoading.value = !dataIsLoading.value)

	const http_client = inject('http_client')
	const accessToken = ref(null)
	const getAccessToken = computed(() => accessToken.value)
	const updateAccessToken = (token) => (accessToken.value = token)

	const refreshToken = ref(null)
	const getRefreshToken = computed(() => refreshToken.value)
	const updateRefreshToken = (token) => (refreshToken.value = token)

	const user = ref({})
	const updateUserData = (data) => {
		changeDataLoadingStatus()
		user.value = data
		changeDataLoadingStatus()
	}

	const getUserData = computed(() => user.value)

	const fetchUserData = async () => {
		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}
			const response = await http_client.get('/profile/my/', axiosConfig)
			updateUserData(response.data)
		} catch (error) {
			console.error(error)
			showSnackbar('Произошла ошибка при загрузке данных')
		} finally {
			changeDataLoadingStatus()
		}
	}

	const editUserData = async (data) => {
		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}
			const response = await http_client.post('/profile/my/', data, axiosConfig)

			if (response.status === 200) {
				updateUserData(response.data)
				showSnackbar('Данные успешно сохранены')
			} else {
				console.log(response.message)
			}
		} catch (error) {
			console.error(error)
			showSnackbar('Произошла ошибка при редактировании данных')
		} finally {
			changeDataLoadingStatus()
		}
	}

	const coursesCertificates = ref([])
	const fetchCoursesCertificates = async () => {
		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}
			const response = await http_client.get('/profile/certificates/', axiosConfig)

			if (response.status === 200) {
				coursesCertificates.value = response.data
			} else {
				console.log(response.message)
			}
		} catch (error) {
			console.error(error)
			showSnackbar('Произошла ошибка при загрузке полученных сертификатов')
		} finally {
			changeDataLoadingStatus()
		}
	}

	const getCoursesCertificates = computed(() => coursesCertificates.value)

	const coursesCertificate = ref([])
	const fetchCoursesCertificate = async (id) => {
		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}
			const response = await http_client.get(`/profile/certificates/${id}`, axiosConfig)

			if (response.status === 200) {
				console.log(response.data)
			} else {
				console.log(response.message)
			}
		} catch (error) {
			console.error(error)
			showSnackbar('Произошла ошибка при загрузке полученных сертификатов')
		} finally {
			changeDataLoadingStatus()
		}
	}

	const getCoursesCertificate = computed(() => coursesCertificates.value)

	return {
		accessToken,
		getAccessToken,
		updateAccessToken,

		refreshToken,
		getRefreshToken,
		updateRefreshToken,

		user,
		getUserData,
		editUserData,

		fetchCoursesCertificates,
		getCoursesCertificates,

		fetchUserData,
		getDataLoadingStatus,
	}
})
