import { defineStore } from 'pinia'
import { ref, computed, inject } from 'vue'
import { getCookie } from '@/plugins/cookie'
import { useSnackbar } from '@/composables/snackbar'
import { useUserStore } from '@/stores/user'

const { showSnackbar } = useSnackbar()

export const useCertificatesStore = defineStore('certificates', () => {
	const dataIsLoading = ref(false)
	const getDataLoadingStatus = computed(() => dataIsLoading.value)
	const changeDataLoadingStatus = () => (dataIsLoading.value = !dataIsLoading.value)

	const http_client = inject('http_client')

	const saveNewCertificate = async (data) => {
		try {
			changeDataLoadingStatus()

			let formData = new FormData()
			formData.append('file', data.file, `${data.fileName}.${data.type}`)
			formData.append('name', `${data.fileName}.${data.type}`)

			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}
			const response = await http_client.post('/profile/my/certificates/', formData, axiosConfig)

			if (response.status === 200) {
				await useUserStore().fetchUserData()
				showSnackbar('Сертификат добален')
			} else {
				console.log(response.message)
			}
		} catch (error) {
			console.error(error)
			showSnackbar('Произошла ошибка при добавлении сертификата')
		} finally {
			changeDataLoadingStatus()
		}
	}
	const deleteCertificate = async (id) => {
		try {
			changeDataLoadingStatus()

			const axiosConfig = {
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			}
			const response = await http_client.delete(`/profile/my/certificates/${id}/`, axiosConfig)

			if (response.status === 204) {
				await useUserStore().fetchUserData()
				showSnackbar('Сертификат удалён')
			} else {
				console.log(response.message)
			}
		} catch (error) {
			console.error(error)
			showSnackbar('Произошла ошибка при удалении сертификата')
		} finally {
			changeDataLoadingStatus()
		}
	}

	return {
		saveNewCertificate,
		deleteCertificate,
		getDataLoadingStatus,
	}
})
