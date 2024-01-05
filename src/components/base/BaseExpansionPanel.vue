<template>
	<div class="expansion">
		<div class="expansion__title" @click="isOpened = !isOpened">
			<div :class="isOpened ? '--opened' : ''" class="expansion__title-img">
				<img src="@/assets/icons/icon-close.svg" alt="close icon" />
			</div>
			<h5 class="headers-5 | ml-4 text-gray900">
				{{ title }}
			</h5>
		</div>
			<div :class="isOpened ? '--opened mt-5' : ''" class="expansion__content">
				<slot />
			</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
	title: {
		type: String,
		default: 'Title',
	},
	opened: {
		type: Boolean,
		default: false,
	},
})

const isOpened = ref(props.opened)
</script>

<style lang="scss" scoped>
.expansion {
	&__title {
		display: flex;
		align-items: center;
		width: 100%;
		cursor: pointer;
	}
	&__title-img {
		display: flex;
		align-items: center;
		justify-content: center;
		transform: rotate(45deg);
		min-width: 40px;
		max-width: 40px;
		min-height: 40px;
		max-height: 40px;

		&.--opened {
			transform: rotate(0deg);
		}

		& img {
			width: 100%;
			height: 100%;
			transition: var(--base-transition);
			transform: rotate(180deg);
		}

		&.--opened img {
			transform: rotate(0deg);
		}
	}
	&__content {
		z-index: 10;
		width: 0;
		height: 0;
		display: none;
		transition: var(--base-transition);

		&.--opened {
			width: 100%;
			height: 100%;
			display: block;
		}
	}
}
</style>
