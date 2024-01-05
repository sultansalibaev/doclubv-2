<template>
	<div class="materials-modal" @click.self="substrateClickHandler">
		<section class="materials-modal__window">
			<h3 class="materials-modal__heading">Скачать материалы</h3>
			<button
				class="materials-modal__close-button"
				type="button"
				@click="closeButtonClickHandler"
			/>
			<ul class="materials-modal__list">
				<li class="materials-modal__item" v-for="(material, index) in materials" :key="index">
					<div class="materials-modal__text-wrapper">
						<p class="materials-modal__text">{{ material.name }}</p>
						<span class="materials-modal__file-extension">{{ material.file_extension }}</span>
					</div>
					<a class="materials-modal__download-button" :href="material.file" download>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M19.3719 15.2V18.9C19.3719 19.6 19.0719 20.2 18.5719 20.7C18.0719 21.2 17.4719 21.5 16.7719 21.5H6.77187C6.07187 21.5 5.47187 21.2 4.97187 20.7C4.47187 20.2 4.17188 19.6 4.17188 18.9V15.2C4.17188 14.7 4.57187 14.3 5.07187 14.3C5.57187 14.3 5.97187 14.7 5.97187 15.2V18.9C5.97187 19.1 6.07187 19.3 6.17188 19.4C6.37188 19.6 6.47187 19.6 6.67188 19.6H16.6719C16.8719 19.6 17.0719 19.5 17.1719 19.4C17.2719 19.3 17.3719 19.1 17.3719 18.9V15.2C17.3719 14.7 17.7719 14.3 18.2719 14.3C18.9719 14.3 19.3719 14.7 19.3719 15.2Z"
								fill="#5C34F6"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M15.7719 12L12.4719 15.3C12.2719 15.5 12.0719 15.6 11.8719 15.6C11.5719 15.6 11.3719 15.5 11.1719 15.3L7.87187 12C7.47187 11.6 7.47187 11.1 7.87187 10.7C8.17187 10.4 8.77187 10.4 9.17188 10.7L10.9719 12.5V3.9C10.9719 3.4 11.3719 3 11.8719 3C12.3719 3 12.7719 3.4 12.7719 3.9V12.6L14.5719 10.8C14.8719 10.5 15.4719 10.5 15.8719 10.8C16.0719 11.1 16.0719 11.6 15.7719 12Z"
								fill="#5C34F6"
							/>
						</svg>
					</a>
				</li>
			</ul>
			<app-button class="materials-modal__download-all-button" theme="primary" text="Скачать всё" />
		</section>
	</div>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue'

const props = defineProps({
	materials: {
		required: true,
		type: Array,
	},
})

const emit = defineEmits(['close'])

function closeButtonClickHandler() {
	emit('close')
}

function substrateClickHandler() {
	emit('close')
}

function downloadButtonClickHandler(file) {
	document.console.log(file)
}
</script>

<style>
.materials-modal {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	justify-content: center;
	align-items: center;

	background: rgba(0, 0, 0, 0.5);
}

.materials-modal__window {
	position: relative;
	box-sizing: border-box;
	margin: 0;
	padding: 24px;
	width: 400px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	animation: slideDown 0.3s ease-in-out;

	border-radius: 12px;
	background: #fff;
}

.materials-modal__heading {
	margin: 0;
	padding: 0;

	font-family: var(--headings-font);
	font-weight: 700;
	font-style: normal;
	font-size: 24px;
	line-height: 28px;
	color: var(--headings-color);
}

.materials-modal__close-button {
	position: absolute;
	top: 24px;
	right: 24px;

	width: 28px;
	height: 28px;

	background: url('@/assets/icons/icon-close.svg') center no-repeat;
}

.materials-modal__list {
	margin: 20px 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;

	list-style: none;
}

.materials-modal__item {
	margin: 0;
	padding: 0;
	display: flex;
	align-items: center;
}

.materials-modal__text-wrapper {
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	gap: 8px;
}

.materials-modal__text {
	margin: 0;
	padding: 0;

	font-family: var(--text-font);
	font-weight: 600;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	color: var(--text-primary-color);
}

.materials-modal__file-extension {
	margin: 0;
	padding: 0;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 14px;
	line-height: 16px;
	color: #4c4c4c;
	text-transform: uppercase;
}

.materials-modal__download-button {
	margin: 0 0 0 16px;
	padding: 0;
	width: 24px;
	height: 24px;

	background: none;
	border: none;
	cursor: pointer;
}

.materials-modal__download-all-button {
	margin: auto 0 0;
}

@keyframes slideDown {
	from {
		transform: translateY(-200px);
		opacity: 0;
	}
	to {
		transform: translateY(0);
		opacity: 1;
	}
}
</style>
