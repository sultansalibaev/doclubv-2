<template>
	<div
		:class="['input-wrapper', black ? 'input-wrapper--black' : '', disabled ? 'input-wrapper--disabled' : '']"
	>
		<div v-if="prependInner" class="input-wrapper__prepend-item">
			<slot name="prepend-inner" class="prepend-inner" />
		</div>
		<input
			:value="modelValue"
			:autofocus="autofocus"
			:disabled="disabled"
			:inputmode="inputmode"
			:class="[
				'input',
				prependInner ? 'input--with-prepend' : '',
				appendInner ? 'input--with-append' : '',
			]"
			:placeholder="placeholder"
			:type="type"
			@input="handleInput"
		>
		<div  v-if="appendInner" class="input-wrapper__append-item">
			<slot name="append-inner" class="append-inner" />
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	modelValue: {
		type: [String, Number],
	},
	prependInner: {
		type: Boolean,
		default: false,
	},
	appendInner: {
		type: Boolean,
		default: false,
	},
	placeholder: {
		type: String,
		default: '',
	},
	black: {
		type: Boolean,
		default: false,
	},
	autofocus: {
		type: Boolean,
		default: false,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	type: {
		type: String,
		default: 'text',
	},
	inputmode: {
		type: String,
		default: 'text',
	},
})

const emit = defineEmits(['update:modelValue'])

const handleInput = (event) => emit('update:modelValue', event.target.value)
</script>

<style lang="scss" scoped>
.input {
	font-size: 16px;
	font-weight: 400;
	line-height: 20px;
	letter-spacing: 0;
	text-align: left;

	border: 1px solid #000000;
	border-radius: 5px;

	color: #000000;
	background: #FFFFFF;
}
.input::placeholder {
	text-align: left;
	color: #BDBDCD;
}

.input {
	width: 100%;
	padding: 12px 16px;
	height: 44px;

	&--with-prepend {
		padding: 12px 16px 12px 32px;
	}
	&--with-append {
		padding: 12px 32px 12px 16px;
	}
}

.input-wrapper {
	position: relative;

	&__prepend-item,
	&__append-item {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;

		font-size: 16px;
		font-weight: 400;
		line-height: 20px;
		letter-spacing: 0;
		color: #000000;
	}

	&__prepend-item {
		left: 8px;
	}
	&__append-item {
		right: 8px;
	}
}

.input-wrapper--black {
	& input {
		color: #FFFFFF;
		background: transparent;
		border: 1px solid #FFFFFF;
	}
	& .input-wrapper {
		&__prepend-item,
		&__append-item {
			color: #FFFFFF;
		}
	}
}
.input-wrapper--disabled {
	& input {
		border: 1px solid #00000040;
		color: rgba(#000000, .5);
		background: transparent;
	}
	& .input-wrapper {
		&__prepend-item,
		&__append-item {
			color: rgba(#000000, .5);
		}
	}
}
</style>