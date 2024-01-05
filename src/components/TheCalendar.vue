<template>
	<div class="calendar">
		<div class="d-flex align-center justify-space-between">
			<v-btn icon="mdi-chevron-left" density="comfortable" variant="text" @click="setPrevMonth()" />
			<h4 class="headers-4 | text-gray900">{{ currentMonthName }}, {{ currentYear }}</h4>
			<v-btn
				icon="mdi-chevron-right"
				density="comfortable"
				variant="text"
				@click="setNextMonth()"
			/>
		</div>
		<div class="days mt-8">
			<div v-for="dayName in days" :key="dayName" class="day">
				{{ t(dayName) }}
			</div>
		</div>
		<div class="dates flex-wrap">
			<div
				v-for="day in firstDay"
				:key="`prevMonthDay${day}`"
				class="date date--hidden"
				@click="emit('on-date-clicked', { year: currentMonthInNumber === 0 ? currentYear - 1 : currentYear, month: currentMonthInNumber - 1, day: prevMonthDays - firstDay + day })"
			>
				{{ prevMonthDays - firstDay + day }}
				<div :class="hasEvent(currentMonthInNumber === 0 ? currentYear - 1 : currentYear, currentMonthInNumber - 1, prevMonthDays - firstDay + day)" />
			</div>
			<div
				v-for="date in lastDateOfMonth"
				:key="`currentMonthDay${date}`"
				:class="todayDate(date), selectedDay.day === date ? 'date--selected' : ''"
				class="date"
				@click="setSelectedDay( currentYear, currentMonthInNumber, date)"
			>
				{{ date }}
				<div :class="hasEvent(currentYear, currentMonthInNumber, date)" />
			</div>
			<div
				v-for="day in 42 - (lastDateOfMonth + firstDay)"
				:key="`nextMonthDay${day}`"
				class="date date--hidden"
				@click="emit('on-date-clicked', { year: currentMonthInNumber === 11 ? currentYear + 1 : currentYear, month: currentMonthInNumber + 1, day: day })"
			>
				{{ day }}
				<div :class="hasEvent(currentMonthInNumber === 11 ? currentYear + 1 : currentYear,currentMonthInNumber + 1,day)" />
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

const props = defineProps({
	eventDates: {
		type: Array,
	},
})

const emit = defineEmits(['on-date-clicked', 'on-date-update'])

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const currentMonthInNumber = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())

const firstDay = computed(() =>
	currentMonthInNumber.value === 0
		? new Date(currentYear.value - 1, 11, 7).getDay()
		: new Date(currentYear.value, currentMonthInNumber.value, 7).getDay(),
)
const lastDateOfMonth = computed(() =>
	new Date(currentYear.value, currentMonthInNumber.value + 1, 0).getDate(),
)
const currentMonthName = computed(() => {
	const monthName = new Date(currentYear.value, currentMonthInNumber.value).toLocaleDateString(
		`${locale.value}-${locale.value.toUpperCase()}`,
		{ month: 'long' },
	)
	return monthName[0].toUpperCase() + monthName.slice(1)
})

const prevMonthDays = computed(() => {
	const year = currentMonthInNumber.value === 0 ? currentYear.value - 1 : currentYear.value
	const month = currentMonthInNumber.value === 0 ? 11 : currentMonthInNumber.value

	return new Date(year, month, 0).getDate()
})

const setPrevMonth = () => {
	if (currentMonthInNumber.value === 0) {
		currentYear.value--
		currentMonthInNumber.value = 11
	} else {
		currentMonthInNumber.value--
	}
}
const setNextMonth = () => {
	if (currentMonthInNumber.value === 11) {
		currentYear.value++
		currentMonthInNumber.value = 0
	} else {
		currentMonthInNumber.value++
	}
}

const todayDate = (day) => {
	const calendarDay = new Date(
		currentYear.value,
		currentMonthInNumber.value,
		day,
	).toLocaleDateString()
	const today = new Date().toLocaleDateString()

	return calendarDay === today ? 'today' : ''
}
const hasEvent = (year, month, day) => {
	const twoDigits = (num) => {
		if (num < 10) return ('0' + num).slice(-2)
		else return num
	}
	const currentDate = `${year}-${twoDigits(month + 1)}-${twoDigits(day)}`

	for (let date of props.eventDates) if (currentDate === date) return 'date__badge'
}

const defaultSelectedDay = () => ({
  year: 0,
  month: 0,
  day: 0,
})
const selectedDay = ref(defaultSelectedDay())
const setSelectedDay = (year, month, day) => {
  if (selectedDay.value.year === year && selectedDay.value.month === month && selectedDay.value.day === day) {
    selectedDay.value = defaultSelectedDay()
    emit('on-date-update', { year: currentMonthInNumber.value === 12 ? currentYear.value + 1 : currentYear.value, month: currentMonthInNumber.value + 1, lastDateOfMonth: lastDateOfMonth.value, })
  } else {
    selectedDay.value.year = year
    selectedDay.value.month = month
    selectedDay.value.day = day
    emit('on-date-clicked', { year, month, day })
  }
}

watch(() => currentMonthName.value, (newValue, oldValue) => {
  emit('on-date-update', { year: currentMonthInNumber.value === 12 ? currentYear.value + 1 : currentYear.value, month: currentMonthInNumber.value + 1, lastDateOfMonth: lastDateOfMonth.value, })
}, { immediate: true })
</script>

<style lang="scss" scoped>
.calendar {
	width: 100%;
	max-width: 470px;
	//min-width: 425px;
}
.days,
.dates {
	display: flex;
}
.days .day {
	&:first-child {
		border-top-left-radius: 12px;
	}
	&:last-child {
		border-top-right-radius: 12px;
	}
}
.dates .date {
	&:nth-last-child(7) {
		border-bottom-left-radius: 12px;
	}
	&:last-child {
		border-bottom-right-radius: 12px;
	}
}
.days .day,
.dates .date {
	width: 14.28%;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 72px;
	border: 1px solid rgb(var(--v-theme-gray400));
	transition: var(--base-transition);
}
.dates .date:hover {
	cursor: pointer;
	color: rgb(var(--v-theme-purple-brand));
	background: rgb(var(--v-theme-purple300));
}
.date.today {
	color: rgb(var(--v-theme-purple-brand));
	background: rgb(var(--v-theme-purple100));
}
.date.date--selected {
  color: rgb(var(--v-theme-purple-brand));
  background: rgb(var(--v-theme-purple400));
}
.date {
	position: relative;
	color: rgb(var(--v-theme-gray900));
}
.date .date__badge {
	position: absolute;
	top: 8px;
	right: 8px;
	width: 8px;
	height: 8px;
	background: rgb(var(--v-theme-purple-brand));
	border-radius: 50%;
}
.date.date--hidden {
	color: rgb(var(--v-theme-neutral-text));
}

@media screen and (max-width: 1600px) {
	.dates .date,
	.day {
		height: 40.828px !important;
	}

	.date .date__badge {
		top: 4px;
		right: 4px;
	}
}
</style>
