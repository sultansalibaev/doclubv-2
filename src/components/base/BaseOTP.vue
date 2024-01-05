<template>
	<div ref="container" class="otp">
		<input
			v-model="otpArray[n - 1]"
			v-for="n in length"
			:key="n"
			:disabled="loading"
			type="text"
			inputmode="numeric"
			maxlength="1"
			class="otp__input"
			@keyup="(event) => handleEnter(event, n - 1)"
		/>
	</div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
	loading: {
		type: Boolean,
		default: false,
	},
	hasError: {
		type: Boolean,
		default: false,
	},
	length: {
		type: Number,
		default: 4,
	},
})

const emit = defineEmits(['otp-entered'])

const computedLength = computed(() => props.length)

const otpArray = ref([])
const container = ref(null)

const handleEnter = (e, i) => {
	const children = container.value.children
	const keypressed = e.key

	if (i > 0 && (keypressed === 'Backspace' || keypressed === 'Delete')) {
		otpArray.value[i] = null
		setTimeout(() => {
			children[i - 1].focus()
			children[i - 1].select()
		}, 0)
	} else {
		const matched = keypressed.match(/^[0-9]$/)
		if (!matched) {
			otpArray.value[i] = null
			return
		} else if (i < props.length - 1) children[i + 1].focus()

		emit('otp-entered', otpArray.value.join(''))
	}
}

watch(
	() => props.hasError,
	(newValue) => {
		if (newValue) otpArray.value = []
	},
)
</script>

<style lang="scss" scoped>
.otp {
	display: grid;
	grid-template-columns: repeat(v-bind(computedLength), 1fr);
	gap: 16px;

	&__input {
		width: 100%;
		height: 44px;
		border-radius: 5px;
		border: 1px solid white;
		display: flex;
		text-align: center;
		justify-content: center;
	}
}

@media screen and (-webkit-min-device-pixel-ratio: 0) {
	select:focus,
	textarea:focus,
	input:focus {
		font-size: 1rem;
	}
}
</style>
