<template>
	<section class="upcoming-events">
		<h3 class="upcoming-events__heading">Ближайшие мероприятия</h3>
		<p class="upcoming-events__date">3 сентября</p>
		<ul class="upcoming-events__events-list">
			<li class="upcoming-events__events-item" v-for="(event, index) in events" :key="index">
				<app-announcement-card
					class="upcoming-events__event"
					:tags="event.tags"
					:name="event.name"
					:badges="event.badges"
				/>
			</li>
		</ul>
	</section>
</template>

<script setup>
import AppAnnouncementCard from './AppAnnouncementCard.vue'

const events = [
	{
		badges: ['Вебинар', 'Онлайн'],
		name: 'Как строить сквозную аналитику на Logs API Яндекс.Метрики в 2022 году',
		tags: ['3 сентября', '10:00 - 12:00'],
	},
	{
		badges: ['Доклад', 'Оффлайн'],
		name: 'Внешняя платформа экспериментов VS внутренняя – как выбрать и на что обратить внимание',
		tags: ['3 сентября', '10:00 - 12:00'],
	},
]
</script>

<style>
.upcoming-events {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}

.upcoming-events__heading {
	margin: 0;

	font-family: var(--headings-font);
	font-weight: 700;
	font-style: normal;
	font-size: 24px;
	line-height: 28px;
	color: var(--headings-color);
}

.upcoming-events__date {
	margin: 32px 0 0;

	font-family: var(--headings-font);
	font-weight: 700;
	font-style: normal;
	font-size: 20px;
	line-height: 28px;
	color: var(--announcement-topic-color);
}

.upcoming-events__events-list {
	margin: 32px 0 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;

	list-style: none;
}

.upcoming-events__events-item {
	margin: 0;
}

.upcoming-events__events-item:not(:first-child) {
	margin-top: 32px;
}
</style>
