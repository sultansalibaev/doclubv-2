<template>
	<div class="share" @click.self="substrateClickHandler">
		<section class="share__window">
			<button class="share__close-button" @click="closeButtonClickHandler">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="28"
					height="28"
					viewBox="0 0 28 28"
					fill="none"
				>
					<g clip-path="url(#clip0_2071_14344)">
						<path
							d="M21.2688 21.327C20.8564 21.7395 20.1139 21.822 19.6189 21.327L13.75 15.4581L7.79858 21.4095C7.3861 21.822 6.64364 21.9045 6.14866 21.4095C5.65369 20.9145 5.65368 20.2545 6.14866 19.7596L12.1001 13.8081L6.14866 7.85672C5.73618 7.44424 5.65369 6.70178 6.14866 6.20681C6.64364 5.71183 7.3036 5.71183 7.79858 6.20681L13.75 12.1582L19.7014 6.20681C20.1139 5.79433 20.8564 5.71183 21.3513 6.20681C21.8463 6.70178 21.8463 7.36175 21.3513 7.85672L15.3999 13.8081L21.3513 19.7596C21.7638 20.172 21.6813 20.9145 21.2688 21.327Z"
							fill="#4C4C4C"
						/>
					</g>
					<defs>
						<clipPath id="clip0_2071_14344">
							<rect width="28" height="28" fill="white" />
						</clipPath>
					</defs>
				</svg>
			</button>
			<h3 class="share__heading">Поделиться</h3>
			<p class="share__desc">
				Вы можете поделиться специальными материалами со своими друзьями или клиентами
			</p>
			<div class="share__input-wrapper">
				<input class="share__input" type="text" name="url" readonly :value="fullPath" />
				<app-button
					class="share__copy-button"
					theme="primary"
					:text="t(copyButtonText)"
					type="button"
					@click="copyButtonClickHandler"
				/>
			</div>
			<strong class="share__social">{{ t('Social media') }}</strong>
			<ul class="share__social-list">
				<li class="social__item shareon">
					<a class="social__link whatsapp" href="#">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M8.70187 7.33C8.54187 7.33 8.27187 7.39 8.04187 7.64C7.82188 7.89 7.17188 8.5 7.17188 9.71C7.17188 10.93 8.06187 12.1 8.17188 12.27C8.31187 12.44 9.93188 14.94 12.4219 16C13.0119 16.27 13.4719 16.42 13.8319 16.53C14.4219 16.72 14.9619 16.69 15.3919 16.63C15.8719 16.56 16.8519 16.03 17.0619 15.45C17.2719 14.87 17.2719 14.38 17.2119 14.27C17.1419 14.17 16.9819 14.11 16.7319 14C16.4819 13.86 15.2619 13.26 15.0419 13.18C14.8119 13.1 14.6719 13.06 14.4819 13.3C14.3219 13.55 13.8419 14.11 13.7019 14.27C13.5519 14.44 13.4119 14.46 13.1719 14.34C12.9119 14.21 12.1119 13.95 11.1719 13.11C10.4319 12.45 9.94187 11.64 9.79187 11.39C9.67188 11.15 9.78187 11 9.90187 10.89C10.0119 10.78 10.1719 10.6 10.2719 10.45C10.4019 10.31 10.4419 10.2 10.5219 10.04C10.6019 9.87 10.5619 9.73 10.5019 9.61C10.4419 9.5 9.94188 8.26 9.73188 7.77C9.53188 7.29 9.33187 7.35 9.17188 7.34C9.03188 7.34 8.87187 7.33 8.70187 7.33Z"
								fill="#5C34F6"
							/>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M19.3719 4.9C17.4719 3 14.9719 2 12.2719 2C6.77188 2 2.27188 6.5 2.27188 12C2.27188 13.8 2.77187 15.5 3.57187 17L2.17188 22.3L7.57188 20.9C9.07188 21.7 10.6719 22.1 12.3719 22.1C17.8719 22.1 22.3719 17.6 22.3719 12.1C22.2719 9.3 21.2719 6.8 19.3719 4.9ZM12.2719 20.1C10.7719 20.1 9.37187 19.7 8.17188 19L7.87187 18.8L4.87187 19.6L5.67188 16.7L5.47187 16.3C4.67187 15 4.27187 13.5 4.27187 12C4.27187 7.5 7.87188 3.9 12.3719 3.9C14.5719 3.9 16.5719 4.7 18.1719 6.3C19.6719 7.8 20.5719 9.9 20.5719 12.1C20.4719 16.5 16.7719 20.1 12.2719 20.1Z"
								fill="#5C34F6"
							/>
						</svg>
					</a>
				</li>
				<li class="social__item shareon">
					<a class="social__link telegram" href="#">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
						>
							<path
								d="M18.2158 20.7373C16.9893 20.7373 15.5875 19.686 15.5875 19.686C15.5875 19.686 15.4123 19.5984 15.1495 19.4232C14.0982 18.7223 11.8203 17.2329 10.8566 16.4444C10.4185 16.094 10.1557 15.5684 10.1557 15.0427C10.1557 14.6923 10.2433 14.1666 10.8566 13.6409C11.2946 13.2029 11.8203 12.7648 12.2583 12.3268L9.01678 14.517C8.84156 14.6046 7.87785 15.2179 6.12565 14.6923C4.7239 14.2542 3.14692 13.7285 3.05931 13.7285L2.88409 13.6409C2.53365 13.3781 2.0956 12.9401 2.18321 12.2392C2.27082 11.1879 3.40975 10.7498 3.8478 10.5746L14.7114 6.10648C15.7627 5.66844 19.4424 4.17907 19.4424 4.17907C19.7052 4.09146 20.7565 3.74102 21.545 4.35429C21.8954 4.61712 22.2459 5.14278 22.1583 6.01887C22.1583 6.54453 21.8954 7.77107 21.6326 9.52327L21.3698 11.3631L20.2308 18.7223C20.1432 19.3356 19.7928 20.4745 18.6539 20.7373C18.4786 20.7373 18.391 20.7373 18.2158 20.7373ZM11.9079 14.9551C11.9079 15.0427 11.9079 15.0427 11.9079 14.9551C12.8716 15.7436 15.1495 17.2329 16.1132 17.8462C16.4636 18.0214 16.6388 18.1966 16.6388 18.1966C16.9893 18.4595 17.953 18.9851 18.2158 18.8975C18.3034 18.8975 18.391 18.6347 18.391 18.3719L19.8804 8.99761C20.1432 7.42063 20.3185 6.10648 20.3185 5.66844C20.3185 5.58083 20.3185 5.58083 20.3185 5.58083C20.2308 5.58083 20.0556 5.58083 19.968 5.66844C19.968 5.66844 16.376 7.1578 15.2371 7.59585L4.46107 12.1516C4.46107 12.1516 4.37346 12.1516 4.37346 12.2392C4.98673 12.4144 5.86282 12.7648 6.65131 12.9401C7.61502 13.2029 8.05307 12.9401 8.14068 12.9401L14.7114 8.55956C15.4999 8.0339 16.8141 7.1578 17.5149 8.0339C18.1282 8.73478 17.4273 9.69849 16.9893 10.2241C15.7627 11.4507 13.7477 13.3781 12.0831 14.9551C11.9955 14.9551 11.9079 14.9551 11.9079 14.9551Z"
								fill="#5C34F6"
							/>
						</svg>
					</a>
				</li>
			</ul>
		</section>
	</div>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

import * as Shareon from 'shareon'
import { computed, ref, onMounted } from 'vue'
import { backendHost } from '@/../app.config'

const props = defineProps({
	url: {
		required: true,
		type: String,
	},
})

const emit = defineEmits(['modalClose'])

const fullPath = computed(() => `${backendHost}${props.url}`)

const copyButtonText = ref('Copy')

function substrateClickHandler() {
	emit('modalClose')
}

function closeButtonClickHandler() {
	emit('modalClose')
}

function copyButtonClickHandler() {
	navigator.clipboard.writeText(fullPath.value).then(
		function () {
			copyButtonText.value = 'Copied'
		},
		function (err) {
			copyButtonText.value = 'Error'
		},
	)
}

onMounted(() => {
	Shareon.init()
})
</script>

<style>
.share {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	display: flex;
	justify-content: center;
	align-items: center;

	background: rgba(0, 0, 0, 0.5);
	z-index: 1;
}

.share__window {
	position: relative;
	box-sizing: border-box;
	margin: 32px;
	padding: 32px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;

	border-radius: 12px;
	background: #fff;
	animation: slideDown 0.3s ease-in-out;
}

.share__close-button {
	position: absolute;
	top: 32px;
	right: 32px;
}

.share__heading {
	margin: 0;
	padding: 0;

	font-family: var(--headings-font);
	font-weight: 700;
	font-style: normal;
	font-size: 20px;
	line-height: 28px;
	color: var(--headings-color);
}

.share__desc {
	margin: 16px 0 0;
	padding: 0;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	color: #4c4c4c;
}

.share__input-wrapper {
	margin: 32px 0 0;
	padding: 0;
	display: grid;
	grid-template-columns: 1fr 134px;
	grid-gap: 16px;
}

.share__input {
	box-sizing: border-box;
	margin: 0;
	padding: 10px 16px;

	overflow: hidden;
	color: #4c4c4c;
	text-overflow: ellipsis;
	font-family: var(--text-font);
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 20px;

	border-radius: 5px;
	border: 1px solid #000;
	background: #fff;
}

.share__copy-button {
}

.share__social {
	margin: 32px 0 0;
	padding: 0;

	font-family: var(--text-font);
	font-weight: 600;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	color: #000;
}

.share__social-list {
	margin: 16px 0 0;
	padding: 0;
	display: grid;
	grid-template-columns: 52px 52px 52px 52px;
	grid-gap: 16px;

	list-style: none;
}

.social__item {
	margin: 0;
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: center;
}

.social__link {
	box-sizing: border-box;
	margin: 0;
	padding: 14px;
	width: 52px;
	height: 52px;

	border-radius: 12px;
	background: #f1edff;
	cursor: pointer;
}

@keyframes slideDown {
	from {
		opacity: 0;
		transform: translateY(-200px);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
