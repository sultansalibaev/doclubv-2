<template>
	<transition>
		<div
			v-if="showModal"
			class="modal-wrapper"
			@click="persistent ? false : emit('on-close')"
		>
			<div class="modal-overlay"></div>
			<BaseCard
				:style="{ 'max-width': typeCheck(maxWidth), 'min-width': typeCheck(minWidth) }"
				color="background-primary"
				class="modal"
			>
				<div class="modal__header">
					<h4 class="headers-4 | text-gray900 modal__title">
						{{ title }}
					</h4>
					<img
						src="@/assets/icons/icon-close.svg"
						alt="close icon"
						class="cursor-pointer"
						@click="emit('on-close')"
					/>
				</div>
				<div class="modal__body">
					<slot />
				</div>
				<div class="modal__footer">
					<slot name="footer" />
				</div>
			</BaseCard>
		</div>
	</transition>
</template>

<script setup>
import { onBeforeUnmount, watch } from 'vue'

const props = defineProps({
	showModal: {
		type: Boolean,
		required: true,
	},
	persistent: {
		type: Boolean,
		default: true,
	},
	title: {
		type: String,
		default: '',
	},
	maxWidth: {
		type: [Number, String],
	},
	minWidth: {
		type: [Number, String],
	},
	maxHeight: {
		type: [Number, String],
	},
	minHeight: {
		type: [Number, String],
	},
})

const emit = defineEmits(['on-close'])
watch(() => props.showModal, (newValue) => (document.documentElement.style.overflow = newValue ? 'hidden' : ''), { immediate: true })

onBeforeUnmount(() => (document.documentElement.style.overflow = ''))
const typeCheck = (value) => (typeof value === 'string' ? value : `${value}px`)
</script>

<style lang="scss" scoped>
.modal {
	width: 100%;
	max-height: calc(100% - 32px);
	min-height: 0;
	overflow: auto;
	z-index: 1002;
	margin: 0 16px;

	&::-webkit-scrollbar {
		width: 0;
		height: 2px;
	}
	//&::-webkit-scrollbar-track {
	//	border-radius: 10px;
	//	background: rgba(255,255,255,0.9);
	//}
	//&::-webkit-scrollbar-thumb{
	//	border-radius: 10px;
	//	background: rgba(0,0,0,0.1);
	//}
	//&::-webkit-scrollbar-thumb:hover{
	//	background: rgba(0,0,0,0.4);
	//}
	//&::-webkit-scrollbar-thumb:active{
	//	background: rgba(0,0,0,.9);
	//}
	&-wrapper {
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 1000;
	}
	&-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100vw;
		height: 100vh;
		background: #00000080;
		z-index: 1001;
	}
	&__header {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		margin: 0 0 24px;
	}
	&__title {
		word-break: break-word;
	}
	&__body {
		overflow: auto;
		max-height: calc(100% - 105px);
	}
	&__footer {

	}
}
//.modal-overlay {
//	width: 100%;
//	overflow: auto;
//
//	@media screen and (max-height: 450px){
//		overflow: auto;
//		height: 100%;
//	}
//
//	&__wrapper {
//		position: fixed;
//		top: 0;
//		left: 0;
//		right: 0;
//		bottom: 0;
//		z-index: 1000;
//		display: flex;
//		align-items: center;
//		justify-content: center;
//		width: 100vw;
//		min-height: 100vh;
//		padding: 20px;
//		overflow-x: hidden;
//		background: #00000080;
//	}
//
//	&__header {
//		display: flex;
//		align-items: baseline;
//		justify-content: space-between;
//		margin: 0 0 24px;
//	}
//
//	&__title {
//		word-break: break-word;
//	}
//}
//
//.v-enter-active,
//.v-leave-active {
//	transition: var(--base-transition);
//}
//
//.v-enter-from,
//.v-leave-to {
//	opacity: 0;
//}
</style>
