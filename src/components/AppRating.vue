<template>
	<section class="rating">
		<h3 class="rating__heading">Рейтинг</h3>
		<app-tabs-list class="rating__tabs-list" :tabs="tabs" />
		<ul class="rating__list">
			<li class="rating__item" v-for="(data, index) in ratingData" :key="index">
				<app-rating-profile :data="data" />
			</li>
		</ul>
	</section>
</template>

<script setup>
import AppTabsList from './AppTabsList.vue'
import AppRatingProfile from './AppRatingProfile.vue'

const tabs = ['Общий', 'Регион', 'Специализация']

const ratingData = [
	{
		name: 'Дарья Белякова',
		position: '#122',
		img: '/src/assets/avatar-thumb-1.jpg',
	},
	{
		name: 'Ксения Сычёва',
		position: '#123',
		img: '/src/assets/avatar-thumb-2.jpg',
	},
	{
		name: 'Ольга Михеева',
		position: '#124',
		img: '/src/assets/avatar-thumb.jpg',
	},
	{
		name: 'Артем Загоруйко',
		position: '#125',
		img: '/src/assets/avatar-thumb-3.jpg',
	},
	{
		name: 'Анна Симонцева',
		position: '#126',
		img: '/src/assets/avatar-thumb-4.jpg',
	},
]
</script>

<style>
.rating {
	box-sizing: border-box;
	padding: 32px;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;

	border-radius: 16px;
	background: var(--background-secondary);
}

.rating__heading {
	margin: 0;

	font-family: var(--headings-font);
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	line-height: 28px;
	color: var(--headings-color);
}

.rating__tabs-list {
	margin: 28px 0 0;
}

.rating__list {
	margin: 28px 0 0;
	padding: 0;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;

	list-style: none;
}

.rating__item {
	margin: 0;
	width: 100%;
}

.rating__item:not(:first-child) {
	margin-top: 12px;
}
</style>
