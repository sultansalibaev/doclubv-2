<template>
	<button
		:class="[
			'button',
			theme === 'outline'
				? 'button--outlined'
				: theme === 'black'
				? 'button--black'
				: theme === 'secondary'
				? 'button--secondary'
				: theme === 'text'
				? 'button--text'
				: '',
			block ? 'button--block' : '',
			loading ? 'button--loading' : '',
		]"
		:style="{ height: `${height}px` }"
	>
		<span class="loading-circle"></span>
		<div v-if="prependInner" class="prepend-inner-wrapper">
			<slot name="prepend-inner" class="prepend-inner" />
		</div>
		<span class="button__text">
			{{ text }}
		</span>
		<div v-if="appendInner" class="append-inner-wrapper">
			<slot name="append-inner" class="append-inner" />
		</div>
	</button>
</template>

<script setup>
defineProps({
	block: {
		type: Boolean,
		default: false,
	},
	height: {
		type: Number,
		default: 44,
	},
	loading: {
		type: Boolean,
		default: false,
	},
	text: {
		required: true,
		type: String,
	},
	theme: {
		required: true,
		type: String,
		validator(value) {
			return ['primary', 'outline', 'secondary', 'black', 'text'].includes(value)
		},
	},
	appendInner: {
		type: Boolean,
		default: false,
	},
	prependInner: {
		type: Boolean,
		default: false,
	},
})
</script>

<style lang="scss">
.button {
	display: flex;
	text-align: center;
	align-items: center;
	justify-content: center;

	box-sizing: border-box;
	padding: 12px 20px;

	border-radius: 5px;
	background: var(--button-primary-default-color);
	transition: var(--base-transition);
	text-decoration: none;

	cursor: pointer;
}

.button__text {
	white-space: nowrap;
	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	text-decoration: none;
	color: var(--button-primary-font-active-color);
}

.button:hover,
.button:focus {
	outline: none;
	background: var(--button-primary-hover-color);
}

.button:disabled {
	//background: var(--button-primary-disabled-color);
	opacity: 0.3;
}

.button--black {
	background: var(--button-primary-disabled-color);
}

.button--block {
	width: 100%;
}

.button.button--loading {
	position: relative;
	pointer-events: none;
}

.button.button--loading .button__text {
	opacity: 0;
}

.button.button--loading .loading-circle::after {
	content: '';
	position: absolute;
	width: 24px;
	height: 24px;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	border: 2px solid transparent;
	border-top-color: rgb(var(--v-theme-white100));
	border-radius: 50%;
	animation: button-loading-spinner 1s ease infinite;
}

.button.button--loading.button--black .loading-circle::after,
.button.button--loading.button--outlined .loading-circle::after {
	border-top-color: rgb(var(--v-theme-primary));
}

@keyframes button-loading-spinner {
	from {
		transform: rotate(0turn);
	}

	to {
		transform: rotate(1turn);
	}
}

.button--outlined {
	background: transparent;
	border: var(--button-outlined-default-border);
}

.button--outlined .button__text {
	color: var(--button-outlined-font-active-color);
}

.button--outlined:hover,
.button--outlined:focus {
	background: transparent;
	border: var(--button-outlined-hover-border);
}
.button--outlined:disabled:hover,
.button--outlined:disabled:focus {
	border: var(--button-outlined-default-border);
}

.button--outlined:disabled {
	opacity: 0.5;
}

.append-inner-wrapper,
.prepend-inner-wrapper {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 24px;
	height: 24px;
}
.append-inner,
.prepend-inner {
	width: 100%;
	height: 100%;
}
.append-inner-wrapper {
	margin: 0 0 0 12px;
}
.prepend-inner-wrapper {
	margin: 0 12px 0 0;
}

.button--secondary {
	background-color: var(--button-secondary-default-color);
}

.button--secondary .button__text {
	color: var(--button-secondary-font-active-color);
}

.button--secondary:hover,
.button--secondary:focus {
	background-color: var(--button-secondary-hover-color);
}

.button--secondary:disabled {
	background-color: var(--button-secondary-disabled-color);
}

.button--secondary:disabled .button__text {
	color: var(--button-secondary-font-disabled-color);
}

.button--text {
	background: transparent;
}
.button--text .button__text {
	color: var(--button-primary-default-color);
}
.button--text:hover {
	outline: 1px solid var(--button-primary-default-color);
	background: transparent;
}
</style>
