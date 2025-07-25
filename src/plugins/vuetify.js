import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const theme = {
	defaultTheme: 'light',
	themes: {
		light: {
			colors: {
				primary: '#5C34F6',
				gray900: '#000000',
				gray800: '#4C4C4C',
				// 'gray-secondary': '#00000080', rgba(var(--v-theme-gray900), .5);
				'neutral-text': '#BCB8CA',
				gray500: '#BDBDCD',
				gray400: '#D6D6E3',
				gray300: '#E7E7EF',
				gray100: '#FFFFFF',
				white100: '#FFFFFF',
				'background-primary': '#FFFFFF',
				// 'background-secondary-alt': '#FFFFFF26', rgba(var(--v-theme-background-primary), .15);
				'background-secondary': '#F8F8F8',
				'purple-brand': '#5C34F6',
				purple400: '#A689E3',
				purple300: '#D3C5F1',
				purple200: '#D8D1FF',
				purple100: '#F1EDFF',
				red600: '#C51311',
				red500: '#DA3F3D',
				red400: '#EA6361',
				red300: '#F18886',
				red200: '#F8BAB9',
				red100: '#FFEBEB',
				green400: '#5BA85A',
				green300: '#7EC07D',
				green200: '#95DB94',
				green100: '#C9FBC9',
				yellow400: '#DE960C',
				yellow300: '#CFA200',
				yellow200: '#E8B810',
				'yellow100-card': '#FBF8EB',
				'yellow200-card': '#E3D9AF',
				'yellow300-card': '#7A6C36',
				'blue100-card': '#EEF3FD',
				'blue200-card': '#B7CBF2',
				'blue300-card': '#859CC8',
				'purple100-card': '#F9F1FC',
				'purple200-card': '#E7CBF1',
				'purple300-card': '#AE83BE',
				'green100-card': '#F2F8F3',
				'green200-card': '#CBE6C5',
				'green300-card': '#93B38B',
				'gold100-card': '#FAF6F0',
				'gold200-card': '#6B5C44',
				'link-default': '#7646FF',
				'link-visited': '#A957EA',
				accent1: '#F9B146',
				accent2: '#32AEEE',
				accent3: '#BA58A1',
			},
		},
		dark: {
			colors: {
				primary: '#5C34F6',
				gray900: '#FFFFFF',
				gray800: '#EBEBEB',
				// 'gray-secondary': '#FFFFFF80'
				'neutral-text': '#BCB8CA',
				gray500: '#BDBDCD',
				gray400: '#D6D6E3',
				gray300: '#E7E7EF',
				gray100: '#000000',
				white100: '#FFFFFF',
				'background-primary': '#171717',
				// 'background-secondary-alt': '#17171726',
				'background-secondary': '#23282C',
				'purple-brand': '#5C34F6',
				purple400: '#A689E3',
				purple300: '#3D1F7F',
				purple200: '#D8D1FF',
				purple100: '#1E1A2D',
				red600: '#C51311',
				red500: '#DA3F3D',
				red400: '#EA6361',
				red300: '#F18886',
				red200: '#F8BAB9',
				red100: '#FFEBEB00',
				green400: '#5BA85A',
				green300: '#7EC07D',
				green200: '#95DB94',
				green100: '#C9FBC9',
				yellow400: '#DE960C',
				yellow300: '#CFA200',
				yellow200: '#E8B810',
				'yellow100-card': '#FBF8EB',
				'yellow200-card': '#E3D9AF',
				'yellow300-card': '#7A6C36',
				'blue100-card': '#EEF3FD',
				'blue200-card': '#B7CBF2',
				'blue300-card': '#859CC8',
				'purple100-card': '#F9F1FC',
				'purple200-card': '#E7CBF1',
				'purple300-card': '#AE83BE',
				'green100-card': '#F2F8F3',
				'green200-card': '#CBE6C5',
				'green300-card': '#93B38B',
				'gold100-card': '#FAF6F0',
				'gold200-card': '#6B5C44',
				'link-default': '#7646FF',
				'link-visited': '#A957EA',
				accent1: '#F9B146',
				accent2: '#32AEEE',
				accent3: '#BA58A1',
			},
		},
	},
}

export default createVuetify({
	components,
	directives,
	theme,
})
