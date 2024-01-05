<template>
	<section class="video-nav">
		<h3 class="video-nav__heading visually-hidden">Навигация по видео</h3>
		<ul class="video-nav__list">
			<li class="video-nav__item" v-for="(timestamp, index) in timestamps" :key="index">
				<button
					class="video-nav__timestamp-button"
					type="button"
					@click="emit('time-change', timestamp.timestamp)"
				>
					<span class="video-nav__time">{{ convertSecondsToTime(timestamp.timestamp) }}</span>
					<span class="video-nav__timestamp">{{ timestamp.title }}</span>
				</button>
			</li>
		</ul>
	</section>
</template>

<script setup>
const props = defineProps({
	timestamps: {
		required: true,
		type: Array,
	},
})
const emit = defineEmits(['time-change'])

let convertSecondsToTime = (function () {
	function num(val) {
		val = Math.floor(val)
		return val < 10 ? '0' + val : val
	}

	return function (time) {
		let minutes = Math.floor(time / 60)
		let seconds = time - minutes * 60
		return num(minutes) + ':' + num(seconds)
	}
})()
</script>

<style>
.video-nav {
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
}

.video-nav__list {
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;

	list-style: none;
}

.video-nav__item {
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}

.video-nav__timestamp-button {
	box-sizing: border-box;
	margin: 0;
	padding: 10px;
	width: 100%;
	display: flex;
	gap: 8px;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;

	transition: var(--base-transition);
}

.video-nav__timestamp-button:hover,
.video-nav__timestamp-button:focus {
	background: #f8f8f8;
}

.video-nav__time {
	box-sizing: border-box;
	margin: 0;
	padding: 4px 10px;

	color: #5c34f6;
	font-family: 'Roboto', sans-serif;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 20px;
	letter-spacing: -0.21px;

	border-radius: 12px;
	background: #f1edff;
}

.video-nav__timestamp {
	margin: 0;
	padding: 0;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	text-align: left;
	color: var(--text-primary-color);
}

@media screen and (max-width: 1440px) {
	.video-nav__list {
		display: flex;
		flex-direction: row;
		max-width: 161px;
	}

	.video-nav__timestamp-button {
		flex-grow: 1;
		min-width: 160px;
	}
}
</style>
