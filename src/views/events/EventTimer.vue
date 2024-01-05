<template>
	<div
		v-if="isVisible"
		class="timer"
	>
		<h5 class="headers-5 | text-white100">Мероприятие начнется через:</h5>
		<div class="timer__digits">
			<div class="digit-block">
				<p class="headers-2 | text-white100">
					{{ days }}
				</p>
				<span class="caption-2-regular | text-white100">
					{{ daysWord }}
				</span>
			</div>
			<div class="digit-block">
				<p class="headers-2 | text-white100">
					{{ hours }}
				</p>
				<span class="caption-2-regular | text-white100">
					{{ hoursWord }}
				</span>
			</div>
			<div class="digit-block">
				<p class="headers-2 | text-white100">
					{{ minutes }}
				</p>
				<span class="caption-2-regular | text-white100">
					{{ minutesWord }}
				</span>
			</div>
			<div class="digit-block">
				<p class="headers-2 | text-white100">
					{{ seconds }}
				</p>
				<span class="caption-2-regular | text-white100">
					{{ secondsWord }}
				</span>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
	dateTime: {
		type: String,
	},
})

const deadline = () => {
	if (!props.dateTime) return ''
	const incomingDateTime = props?.dateTime?.split('T')
	const [date, time] = incomingDateTime
	const [year, month, day] = date?.split('-')

	const [trueTime, other] = time?.split('.')
	const [hours, minutes, seconds] = trueTime?.split(':')

	return new Date(year, month - 1, day, hours, minutes, seconds.slice(0, -1))
}

const timerId = ref(null)

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)
const daysWord = ref('')
const hoursWord = ref('')
const minutesWord = ref('')
const secondsWord = ref('')

const declensionNum = (num, words) =>
	words[num % 100 > 4 && num % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]]
const countdownTimer = () => {
	const diff = deadline() - new Date()

	if (diff <= 0) clearInterval(timerId.value)

	days.value = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0
	hours.value = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0
	minutes.value = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0
	seconds.value = diff > 0 ? Math.floor(diff / 1000) % 60 : 0

	daysWord.value = declensionNum(days, ['день', 'дня', 'дней'])
	hoursWord.value = declensionNum(hours, ['час', 'часа', 'часов'])
	minutesWord.value = declensionNum(minutes, ['минута', 'минуты', 'минут'])
	secondsWord.value = declensionNum(seconds, ['секунда', 'секунды', 'секунд'])
}

onMounted(() => (timerId.value = setInterval(countdownTimer, 1000)))

const isVisible = computed(() => days.value || hours.value || minutes.value || seconds.value)
</script>

<style lang="scss">
.timer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 40px;
  gap: 4px;
	border-radius: 10px;
	background: rgb(var(--v-theme-primary));

	@media screen and (max-width: 1023px) {
		flex-direction: column;
		align-items: flex-start;
  }

	&__digits {
    display: grid;
		grid-template-columns: repeat(4, 110px);
    gap: 8px;

		@media screen and (max-width: 599px){
			grid-template-columns: repeat(2, 1fr);
    }
	}
}
.digit-block {
  display: grid;
	grid-template-columns: 50px 60px;
	align-items: center;
  justify-content: center;
  gap: 4px;
}
</style>
