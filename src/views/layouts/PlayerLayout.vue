<template>
	<div class="player-layout">
		<AppSidebar
			:class="['player-layout__sidebar', menuOpened ? 'player-layout__sidebar--opened' : '']"
			@closeMenu="burgerToggleHandler"
		/>
		<div
			:class="['player-layout__columns-wrapper', hasTimecodes ? 'player-layout__columns-wrapper--has-timecodes' : '']"
		>
			<div class="player-layout__header-wrapper">
				<slot name="header" />
			</div>
			<main class="player-layout__player">
				<slot name="player" />
			</main>
			<main class="player-layout__main-content">
				<slot name="main" />
			</main>
			<aside class="player-layout__timecodes">
				<slot name="timecodes" />
			</aside>
			<aside class="player-layout__aside">
				<slot name="aside" />
			</aside>
		</div>
		<AppMobileMenu class="page-layout__mobile-menu" @burger-toggle="burgerToggleHandler" />
	</div>
</template>

<script setup>
import { ref } from 'vue'
import AppMobileMenu from '@/components/AppMobileMenu.vue'
import AppSidebar from '@/components/AppSidebar.vue'

const props = defineProps({
	hasTimecodes: {
		type: Boolean,
		default: false,
	},
})
const menuOpened = ref(false)
const burgerToggleHandler = () => menuOpened.value = !menuOpened.value
</script>

<style scoped>
.player-layout {
	position: relative;
	margin: 0 auto;
	padding: 0;
	max-width: 1920px;
	width: 100%;
	flex-grow: 1;
	display: grid;
	grid-template-columns: 280px auto;
	grid-template-rows: 1fr;
}

.player-layout__sidebar {
	margin: 0;

	&::-webkit-scrollbar {
		width: 0;
		height: 2px;
	}
}

.player-layout__columns-wrapper {
	box-sizing: border-box;
	padding: 32px 60px 60px;
	display: grid;
	grid-template-columns: 1fr 406px;
	grid-template-rows: 72px auto 1fr 0;
	grid-template-areas:
	'head head'
	'player aside'
	'main aside'
	'timecodes timecodes';
	grid-gap: 30px;
}
.player-layout__columns-wrapper--has-timecodes {
	grid-template-areas:
	'head head'
	'player timecodes'
	'main aside';
}

.player-layout__header-wrapper {
	grid-area: head;
}

.player-layout__bar-wrapper {
	grid-area: 2 / 1 / 3 / 3;

	position: relative;
	margin: 0;
	padding: 0;
	display: grid;
	grid-template-columns: 1fr 406px;
	grid-gap: 30px;
}
.player-layout__player {
	grid-area: player;
}
.player-layout__timecodes {
	grid-area: timecodes;

	&::-webkit-scrollbar {
		width: 0;
		height: 2px;
	}
}
.player-layout__main-content {
	grid-area: main;
	min-width: 0;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
}

.player-layout__aside {
	grid-area: aside;
	overflow: auto;

	&::-webkit-scrollbar {
		width: 0;
		height: 2px;
	}
}

@media screen and (max-width: 1600px) {
	.player-layout__columns-wrapper,
	.player-layout__bar-wrapper {
		grid-template-columns: 1fr 300px;
	}
}

@media screen and (max-width: 1440px) {
	.player-layout__columns-wrapper,
	.player-layout__columns-wrapper--has-timecodes {
		grid-template-areas:
		'head'
		'player'
		'main'
		'aside';
		grid-template-rows: 104px auto 1fr auto;
		grid-template-columns: 1fr;
		padding: 32px;
		gap: 0;
	}
	.player-layout__aside {
		margin: 32px 0 0;
		overflow: unset;
	}
}

@media screen and (max-width: 1024px) {
	.player-layout {
		grid-template-columns: 1fr;
	}

	.player-layout__columns-wrapper {
		grid-template-rows: 165px auto 1fr auto;
		padding: 20px 20px 60px;
	}

	.player-layout__sidebar {
		position: fixed;
		z-index: 3;

		display: none;
	}

	.player-layout__columns-wrapper {
		padding: 20px 20px 60px;
	}

	.player-layout__sidebar--opened {
		display: flex;
	}
}
</style>
