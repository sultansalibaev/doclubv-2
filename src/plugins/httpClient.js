import axios from 'axios'

const HTTPClientPlugin = {
	install(app, options) {
		const instance = axios.create({
			baseURL: options.baseUrl,
			maxRedirects: 0,
		})

		app.provide('http_client', instance)
	},
}

export { HTTPClientPlugin as http_client }
