import { defineStore } from 'pinia'
import { ref, computed, inject } from 'vue'
import { getCookie } from '@/plugins/cookie'
import { useUserStore } from '@/stores/user'
import { useSnackbar } from '@/composables/snackbar'

const { showSnackbar } = useSnackbar()

export const useUserWorkPlacesStore = defineStore('userWorkPlaces', () => {
	const dataIsLoading = ref(false)
	const getDataLoadingStatus = computed(() => dataIsLoading.value)
	const changeDataLoadingStatus = () => (dataIsLoading.value = !dataIsLoading.value)
	const http_client = inject('http_client')
	const userStore = useUserStore()

	const addWorkPlaces = (data) => data.forEach((obj) => addWorkPlace(obj))

	const addWorkPlace = async (data) => {
		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}

			let formData = new FormData()
			formData.append('logo', data.logo.file)
			formData.append('date_from', data.date_from)
			formData.append('date_to', data.date_to)
			formData.append('position_str', data.position_str)
			formData.append('work_place_str', data.work_place_str)

			const response = await http_client.post('/profile/my/work-places/', formData, axiosConfig)
			if (response.status === 200) {
				showSnackbar('Место работы успешно добавлено')
				await userStore.fetchUserData()
			}
		} catch (error) {
			console.error(error)
			showSnackbar('Произошла ошибка при добавлении места работы')
		} finally {
			changeDataLoadingStatus()
		}
	}
	const editWorkPlace = async (data) => {
		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}
			const response = await http_client.post(`/profile/my/work-places/${data.id}/`, data, axiosConfig)
			if (response.status === 200) {
				showSnackbar('Данные редактированы')
				await userStore.fetchUserData()
			}
		} catch (error) {
			console.error(error)
			showSnackbar('Произошла ошибка при редактировании места работы')
		} finally {
			changeDataLoadingStatus()
		}
	}
	const editWorkPlaceWithNewPhoto = async (data) => {
		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}

			let formData = new FormData()
			formData.append('logo', data.logo.file)
			formData.append('date_from', data.date_from)
			formData.append('date_to', data.date_to)
			formData.append('position_str', data.position_str)
			formData.append('work_place_str', data.work_place_str)

			const response = await http_client.post(`/profile/my/work-places/${data.id}/`, formData, axiosConfig)
			if (response.status === 200) {
				showSnackbar('Данные редактированы')
				await userStore.fetchUserData()
			}
		} catch (error) {
			console.error(error)
			showSnackbar('Произошла ошибка при редактировании места работы')
		} finally {
			changeDataLoadingStatus()
		}
	}
	const deleteWorkPlace = async (id) => {
		try {
			changeDataLoadingStatus()
			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}
			const response = await http_client.delete(`/profile/my/work-places/${id}`, axiosConfig)
			if (response.status === 204) {
				showSnackbar('Место работы удалено')
				await userStore.fetchUserData()
			}
		} catch (error) {
			console.error(error)
			showSnackbar('Произошла ошибка при удалении места работы')
		} finally {
			changeDataLoadingStatus()
		}
	}

	return {
		addWorkPlaces,
		editWorkPlace,
		editWorkPlaceWithNewPhoto,
		deleteWorkPlace,

		getDataLoadingStatus,
	}
})
