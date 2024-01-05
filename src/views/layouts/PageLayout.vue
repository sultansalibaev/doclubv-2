<template>
	<div class="page-layout">
		<AppSidebar
			:class="['page-layout__sidebar', menuOpened ? 'page-layout__sidebar--opened' : '']"
			@closeMenu="burgerToggleHandler"
		/>
		<div
			:class="[
				'page-layout__columns-wrapper',
				aside ? 'page-layout__columns-wrapper--two-columns' : '',
				asideFirst ? 'page-layout__columns-wrapper--aside-first' : '',
			]"
		>
			<div class="page-layout__header-wrapper">
				<slot name="header" />
			</div>
			<main
				:class="[
					'page-layout__main-content',
					noSticky ? 'page-layout__main-content--no-sticky' : '',
				]"
			>
				<slot name="main" />
			</main>
			<aside
					v-if="aside"
					:class="[
						'page-layout__aside',
						noSticky ? 'page-layout__aside--no-sticky' : '',
					]"
			>
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
	aside: {
		required: true,
		type: Boolean,
	},
	asideFirst: {
		type: Boolean,
		default: false,
	},
	noSticky: {
		type: Boolean,
		default: false,
	},
})

const menuOpened = ref(false)
const burgerToggleHandler = () => menuOpened.value = !menuOpened.value
</script>

<style lang="scss">
.personal-page {

	@media screen and (max-width: 1024px) {
		.page-layout__columns-wrapper--two-columns {
			grid-template-columns: 2fr 1fr;
		}
		.page-layout__header-wrapper {
			grid-column: 1/3;
		}
	}
	@media screen and (max-width: 768px) {
		.page-layout__columns-wrapper--two-columns {
			grid-template-columns: 1fr;
		}
		.page-layout__header-wrapper {
			grid-column: auto;
		}
	}
}
.page-layout {
	position: relative;
	margin: 0 auto;
	padding: 0;
	max-width: 1920px;
	width: 100%;
	flex-grow: 1;
	display: grid;
	grid-template-columns: 280px auto;
	grid-template-rows: 1fr;

	&__sidebar {
		margin: 0;

		&::-webkit-scrollbar {
			width: 0;
			height: 2px;
		}
	}

	&__aside {

		&::-webkit-scrollbar {
			width: 0;
			height: 2px;
		}
	}

	&__columns-wrapper {
		box-sizing: border-box;
		padding: 32px 60px 60px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: stretch;
		gap: 30px;

		//outline: 1px solid aqua;
	}

	&__columns-wrapper--two-columns {
		display: grid;
		grid-template-columns: 1fr 406px;
		grid-template-rows: auto 1fr;
		grid-auto-rows: auto;
		grid-gap: 30px;
	}

	&__header-wrapper {
		grid-column: 1 / 3;
	}

	&__main-content {
		min-width: 0;
		flex-grow: 1;
		display: flex;
		flex-direction: column;


		//&--no-sticky {
		//	justify-content: flex-start;
		//}
	}

	//&__aside--no-sticky {
	//	position: sticky;
	//	top: 0;
	//	left: 0;
	//	box-sizing: border-box;
	//	margin: 0;
	//	width: 100%;
	//	height: 100vh;
	//	display: flex;
	//	flex-direction: column;
	//	overflow: auto;
	//}
}

@media screen and (max-width: 1600px) {
	.page-layout__columns-wrapper--two-columns {
		grid-template-columns: 1fr 300px;
	}
}

@media screen and (max-width: 1440px) {
	.page-layout__columns-wrapper {
		padding: 32px 30px 60px;
	}
}

@media screen and (max-width: 1366px) {
	.page-layout__columns-wrapper--two-columns {
		grid-template-columns: 1fr;
	}

	.page-layout__header-wrapper {
		grid-column: auto;
	}

	.page-layout__columns-wrapper--aside-first {
		& .page-layout__header-wrapper {
			grid-area: 1;
		}
		& .page-layout__main-content {
			grid-area: 3;
		}
		& .page-layout__aside {
			grid-area: 2;
		}
	}

	.page-layout__aside--no-sticky {
		overflow: unset;
		height: auto;
	}

	.page-layout__columns-wrapper {
		overflow: auto;
	}
}

@media screen and (max-width: 1024px) {
	.page-layout {
		grid-template-columns: 1fr;
	}

	.page-layout__sidebar {
		position: fixed;
		z-index: 3;

		display: none;
	}

	.page-layout__columns-wrapper {
		padding: 20px 20px 60px;
	}

	.page-layout__sidebar--opened {
		display: flex;
	}
}
</style>
