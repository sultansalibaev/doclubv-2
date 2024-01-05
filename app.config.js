export const backendHost = import.meta.env.MODE === 'production'
	? 'lms.matemarketing.ru'
	: 'docmed.doclub.uz'
export const backendPath = 'api'

export default {
	backendHost,
	backendPath,
}
