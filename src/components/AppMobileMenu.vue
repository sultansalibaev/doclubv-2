<template>
	<div class="mobile-menu">
		<ul class="mobile-menu__list">
			<li class="mobile-menu__item">
				<button class="mobile-menu__button" @click="burgerButtonClickHandler">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="36"
						height="36"
						viewBox="0 0 36 36"
						fill="none"
					>
						<path
							d="M4.5 27V24H31.5V27H4.5ZM4.5 19.5V16.5H31.5V19.5H4.5ZM4.5 12V9H31.5V12H4.5Z"
							fill="#D6D6E3"
						/>
					</svg>
				</button>
			</li>
			<li class="mobile-menu__item">
				<router-link
					:class="[
						'mobile-menu__button',
						currentRoute === '/education/all' ? 'mobile-menu__button--active' : '',
						currentRoute === '/education/modules' ? 'mobile-menu__button--active' : '',
						currentRoute === '/education/courses' ? 'mobile-menu__button--active' : '',
					]"
					to="/education"
				>
					<svg
						width="29"
						height="24"
						viewBox="0 0 29 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M14.2761 0.109668C14.0142 -0.036556 13.6977 -0.0365558 13.4358 0.109668L0.791017 7.16959C0.181194 7.51007 0.181346 8.40644 0.791285 8.7467L4.1853 10.6401C4.46734 10.7974 4.64285 11.0999 4.64285 11.4287V18.4456C4.64285 18.7742 4.81817 19.0766 5.09997 19.234L13.4357 23.8902C13.6976 24.0366 14.0143 24.0366 14.2763 23.8902L22.612 19.234C22.8938 19.0766 23.0691 18.7742 23.0691 18.4456V11.4287C23.0691 11.0999 23.2446 10.7974 23.5266 10.6401L25.0528 9.78873C25.3451 9.62564 25.7014 9.84224 25.7014 10.183V17.838C25.7014 18.334 26.0943 18.7362 26.5789 18.7362H27.4563C27.9409 18.7362 28.3337 18.334 28.3337 17.838V8.49157C28.3337 8.16289 28.1583 7.86047 27.8765 7.70309L14.2761 0.109668ZM22.4085 7.72185C22.5914 7.82398 22.5914 8.09282 22.4085 8.19494L14.0661 12.8528C13.9351 12.9259 13.7768 12.9259 13.6459 12.8528L5.30342 8.19494C5.12051 8.09282 5.12051 7.82398 5.30342 7.72185L13.6459 3.06403C13.7768 2.99092 13.9351 2.99092 14.0661 3.06403L22.4085 7.72185ZM20.4368 16.8551C20.4368 17.1841 20.261 17.4868 19.9786 17.644L14.2753 20.8199C14.0138 20.9655 13.6981 20.9655 13.4367 20.8199L7.73331 17.644C7.45094 17.4868 7.27517 17.1841 7.27517 16.8551V12.8179C7.27517 12.6133 7.48914 12.4834 7.66455 12.5814L13.4355 15.8067C13.6976 15.9532 14.0144 15.9532 14.2765 15.8067L20.0474 12.5814C20.2228 12.4834 20.4368 12.6133 20.4368 12.8179V16.8551Z"
							fill="#D6D6E3"
						/>
					</svg>
				</router-link>
			</li>
			<li class="mobile-menu__item">
				<router-link
					:class="[
						'mobile-menu__button',
						currentRoute === '/communities/all' ? 'mobile-menu__button--active' : '',
						currentRoute === '/communities/mentors' ? 'mobile-menu__button--active' : '',
						currentRoute === '/communities/experts' ? 'mobile-menu__button--active' : '',
					]"
					to="/communities"
				>
					<!--					<svg-->
					<!--						xmlns="http://www.w3.org/2000/svg"-->
					<!--						width="36"-->
					<!--						height="36"-->
					<!--						viewBox="0 0 36 36"-->
					<!--						fill="none"-->
					<svg
						width="34"
						height="22"
						viewBox="0 0 34 22"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M10.2526 0.274902C7.23332 0.274902 4.77759 2.73064 4.77759 5.7499C4.77759 8.76917 7.23332 11.2249 10.2526 11.2249C13.2719 11.2249 15.7276 8.76917 15.7276 5.7499C15.7276 2.73064 13.2719 0.274902 10.2526 0.274902ZM7.47759 5.7499C7.47759 4.22417 8.72685 2.9749 10.2526 2.9749C11.7783 2.9749 13.0276 4.22417 13.0276 5.7499C13.0276 7.27564 11.7783 8.5249 10.2526 8.5249C8.72685 8.5249 7.47759 7.27564 7.47759 5.7499Z"
							fill="#D6D6E3"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M23.7526 0.274902C20.7333 0.274902 18.2776 2.73064 18.2776 5.7499C18.2776 8.76917 20.7333 11.2249 23.7526 11.2249C26.7718 11.2249 29.2276 8.76917 29.2276 5.7499C29.2276 2.73064 26.7718 0.274902 23.7526 0.274902ZM20.9776 5.7499C20.9776 4.22417 22.2268 2.9749 23.7526 2.9749C25.2783 2.9749 26.5276 4.22417 26.5276 5.7499C26.5276 7.27564 25.2783 8.5249 23.7526 8.5249C22.2268 8.5249 20.9776 7.27564 20.9776 5.7499Z"
							fill="#D6D6E3"
						/>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M10.2526 12.2749C8.5972 12.2749 6.13129 12.6851 4.07343 13.5079C3.04434 13.9193 2.10313 14.4395 1.4156 15.0747C0.726441 15.7115 0.277588 16.4788 0.277588 17.3749V19.9999C0.277588 20.9526 1.0499 21.7249 2.00259 21.7249H32.0026C32.9553 21.7249 33.7276 20.9526 33.7276 19.9999V17.3749C33.7276 16.4788 33.2787 15.7115 32.5896 15.0747C31.902 14.4395 30.9608 13.9193 29.9317 13.5079C27.8739 12.6851 25.408 12.2749 23.7526 12.2749C21.9493 12.2749 19.1672 12.776 17.0033 13.7523C14.8378 12.7611 12.055 12.2749 10.2526 12.2749ZM2.97759 17.3749C2.97759 17.3572 2.99253 17.2928 3.09348 17.1784C3.18859 17.0706 3.33628 16.9453 3.53641 16.809C3.93543 16.5373 4.51346 16.2417 5.21212 15.9682C6.60929 15.4211 8.45629 14.9749 10.2526 14.9749C12.0489 14.9749 13.8959 15.4211 15.2931 15.9682C15.9917 16.2417 16.5697 16.5373 16.9688 16.809C17.1689 16.9453 17.3166 17.0706 17.4117 17.1784C17.5126 17.2928 17.5276 17.3572 17.5276 17.3749V19.0249H2.97759V17.3749ZM20.2276 17.3749C20.2276 16.7275 19.987 16.16 19.6052 15.656C20.8463 15.263 22.3144 14.9749 23.7526 14.9749C25.5489 14.9749 27.3959 15.4211 28.7931 15.9682C29.4917 16.2417 30.0697 16.5373 30.4688 16.809C30.6689 16.9453 30.8166 17.0706 30.9117 17.1784C31.0126 17.2928 31.0276 17.3572 31.0276 17.3749V19.0249H20.2276V17.3749Z"
							fill="#D6D6E3"
						/>
					</svg>
				</router-link>
			</li>
			<li class="mobile-menu__item">
				<router-link
					:class="[
						'mobile-menu__button',
						currentRoute === '/personal' ? 'mobile-menu__button--active' : '',
					]"
					to="/personal"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="36"
						height="36"
						viewBox="0 0 36 36"
						fill="none"
					>
						<path
							d="M18 18C16.35 18 14.9375 17.4125 13.7625 16.2375C12.5875 15.0625 12 13.65 12 12C12 10.35 12.5875 8.9375 13.7625 7.7625C14.9375 6.5875 16.35 6 18 6C19.65 6 21.0625 6.5875 22.2375 7.7625C23.4125 8.9375 24 10.35 24 12C24 13.65 23.4125 15.0625 22.2375 16.2375C21.0625 17.4125 19.65 18 18 18ZM6 30V25.8C6 24.95 6.21875 24.1687 6.65625 23.4562C7.09375 22.7437 7.675 22.2 8.4 21.825C9.95 21.05 11.525 20.4688 13.125 20.0812C14.725 19.6937 16.35 19.5 18 19.5C19.65 19.5 21.275 19.6937 22.875 20.0812C24.475 20.4688 26.05 21.05 27.6 21.825C28.325 22.2 28.9062 22.7437 29.3438 23.4562C29.7812 24.1687 30 24.95 30 25.8V30H6ZM9 27H27V25.8C27 25.525 26.9312 25.275 26.7938 25.05C26.6562 24.825 26.475 24.65 26.25 24.525C24.9 23.85 23.5375 23.3438 22.1625 23.0063C20.7875 22.6688 19.4 22.5 18 22.5C16.6 22.5 15.2125 22.6688 13.8375 23.0063C12.4625 23.3438 11.1 23.85 9.75 24.525C9.525 24.65 9.34375 24.825 9.20625 25.05C9.06875 25.275 9 25.525 9 25.8V27ZM18 15C18.825 15 19.5313 14.7063 20.1188 14.1187C20.7063 13.5312 21 12.825 21 12C21 11.175 20.7063 10.4688 20.1188 9.88125C19.5313 9.29375 18.825 9 18 9C17.175 9 16.4688 9.29375 15.8813 9.88125C15.2937 10.4688 15 11.175 15 12C15 12.825 15.2937 13.5312 15.8813 14.1187C16.4688 14.7063 17.175 15 18 15Z"
							fill="#D6D6E3"
						/>
					</svg>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['burgerToggle'])
const router = useRouter()

const currentRoute = computed(() => {
	return router.currentRoute.value.fullPath
})

function burgerButtonClickHandler() {
	emit('burgerToggle')
}
</script>

<style>
.mobile-menu {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;

	padding: 0;
	display: none;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;

	background: #fff;
	border-top-left-radius: 18px;
	border-top-right-radius: 18px;

	overflow: hidden;
	z-index: 2;
}

.mobile-menu__list {
	margin: 0;
	padding: 0;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;

	list-style: none;
}

.mobile-menu__item {
	margin: 0;
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: center;
}

.mobile-menu__button {
	display: flex;
	align-items: center;
	justify-content: center;

	box-sizing: border-box;
	margin: 0;
	padding: 12px 27px;
	width: 90px;
	height: 60px;

	background: none;
	border: none;
}

.mobile-menu__button--active path {
	fill: var(--button-primary-default-color);
}

@media screen and (max-width: 1024px) {
	.mobile-menu {
		display: flex;
	}
}
</style>
