<template>
	<button :class="['navigation-card', `navigation-card--${theme}`]" @click="navCardClickHandler">
		<strong class="navigation-card__heading">
			{{ heading }}
		</strong>
		<span class="navigation-card__desc">
			{{ desc }}
		</span>
		<span :class="['navigation-card__button', `navigation-card__button--${theme}`]">
			{{ button }}
		</span>
		<svg
			:class="['navigation-card__arrow', `navigation-card__arrow--${theme}`]"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M18.9 13L12.8 19.1C12.6 19.3 12.4 19.4 12.1 19.4C11.8 19.4 11.6 19.3 11.4 19.1C11 18.7 11 18.1 11.4 17.7L15.9 13.2H6C5.5 13.2 5 12.8 5 12.2C5 11.6 5.4 11.2 6 11.2H15.9L11.4 6.7C11 6.3 11 5.7 11.4 5.3C11.8 4.9 12.4 4.9 12.8 5.3L18.9 11.4C19.3 12 19.3 12.6 18.9 13Z"
				fill="#4C4C4C"
			/>
		</svg>
	</button>
</template>

<script setup>
const props = defineProps({
	theme: {
		required: true,
		type: String,
		validator(value) {
			return ['education', 'events', 'media', 'materials', 'presentation', 'chat'].includes(value)
		},
	},
	heading: {
		required: true,
		type: String,
	},
	desc: {
		required: false,
		type: String,
	},
	button: {
		required: true,
		type: String,
	},
})

const emit = defineEmits(['click'])

function navCardClickHandler() {
	emit('click', props.theme)
}
</script>

<style>
.navigation-card {
	position: relative;

	box-sizing: border-box;
	width: 100%;
	min-height: 148px;
	padding: 60px 16px 16px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;

	text-decoration: none;

	border: var(--default-border);
	border-radius: 16px;
	background: var(--navigation-card--default-bg);
	cursor: pointer;
	transition: var(--base-transition);
}

.navigation-card:hover,
.navigation-card:focus {
	background: var(--navigation-card--hover-bg);
}

.navigation-card::before {
	content: '';
	position: absolute;
	top: 16px;
	left: 16px;

	display: block;
	width: 32px;
	height: 32px;

	background-position: center;
	background-repeat: no-repeat;
	border-radius: 50%;
}

.navigation-card__heading {
	margin: 0;

	font-family: var(--text-font);
	font-weight: 600;
	font-size: 16px;
	font-style: normal;
	line-height: 20px;
	color: var(--headings-color);
}

.navigation-card__desc {
	margin: 6px 0 12px;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 14px;
	line-height: 16px;
	color: var(--text-secondary-color);
}

.navigation-card__button {
	margin: auto 0 0;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 14px;
	line-height: 16px;

	border: none;
	background: none;
	cursor: pointer;
}

.navigation-card__button--education {
	color: #7a6c36;
}

.navigation-card__button--events {
	color: #859cc8;
}

.navigation-card__button--media {
	color: #ae83be;
}

.navigation-card__button--materials {
	color: #859cc8;
}

.navigation-card__button--presentation {
	color: #ae83be;
}

.navigation-card__button--chat {
	color: #93b38b;
}

.navigation-card--education::before {
	background-image: url('../assets/materials/icon-education.svg');
}

.navigation-card--events::before {
	background-image: url('../assets/materials/icon-events.svg');
}

.navigation-card--media::before {
	background-image: url('../assets/materials/icon-media.svg');
}

.navigation-card--materials::before {
	background-image: url('../assets/materials/icon-materials.svg');
}

.navigation-card--presentation::before {
	background-image: url('../assets/materials/icon-presentation.svg');
}

.navigation-card--chat::before {
	background-image: url('../assets/materials/icon-chat.svg');
}

.navigation-card__arrow {
	position: absolute;
	bottom: 16px;
	right: 16px;

	width: 16px;
	height: 16px;
}

.navigation-card__arrow--education path {
	fill: #7a6c36;
}
.navigation-card__arrow--events path {
	fill: #859cc8;
}
.navigation-card__arrow--media path {
	fill: #ae83be;
}
.navigation-card__arrow--materials path {
	fill: #859cc8;
}
.navigation-card__arrow--presentation path {
	fill: #ae83be;
}
.navigation-card__arrow--chat path {
	fill: #93b38b;
}
</style>
