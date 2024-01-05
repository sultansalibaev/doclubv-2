import { reactive } from 'vue'

const snackbar = reactive({
	isOpened: false,
	message: '',
	options: {
		absolute: false,
		bottom: true,
		buttonText: 'Закрыть',
		centered: false,
		color: 'primary text-white100',
		elevation: 0,
		height: '',
		left: false,
		maxHeight: '',
		maxWidth: '',
		minHeight: '',
		minWidth: '',
		multiLine: false,
		outlined: false,
		right: false,
		rounded: false,
		shaped: false,
		hasButton: false,
		icon: '',
		iconColor: 'gray900',
		iconSize: '16',
		tile: false,
		timeout: 3000,
		top: false,
		vertical: false,
	},
})

export function useSnackbar() {
	const showSnackbar = (options) => {
		snackbar.isOpened = false

		setTimeout(() => {
			if (!options) return
			if (typeof options === 'string') {
				snackbar.message = options
			} else {
				snackbar.message = options?.message
				Object.keys(snackbar.options).forEach((key) => {
					if (key in options) {
						snackbar.options[key] = options[key]
					}
				})
			}
			snackbar.isOpened = true
		}, 250)
	}

	const closeSnackbar = () => {
		snackbar.isOpened = false
	}

	return {
		closeSnackbar,
		showSnackbar,
		snackbar,
	}
}
