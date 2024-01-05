<template>
	<section class="navigation">
		<h3 class="navigation__heading">{{ t('Navigation') }}</h3>
		<ul class="navigation__list">
            <template v-if="loading">
                <li class="navigation__item" v-for="skelet in 3" :key="skelet">
                    <BaseSkeletonPath
                        :width="'100%'"
                        :height="148"
                    />
                </li>
            </template>
            <template v-else>
                <li class="navigation__item" v-for="(card, index) in navigation" :key="index">
                    <app-navigation-card
                        class="navigation__card"
                        :theme="card.theme"
                        :heading="t(card.heading)"
                        :desc="t(card.desc)"
                        :button="t(card.button)"
                        @click="navigationCardClickHandler($event)"
                    />
                </li>
            </template>
		</ul>
	</section>
</template>

<script setup>
import AppNavigationCard from './AppNavigationCard.vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

import { useRouter } from 'vue-router'

const props = defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
})

const router = useRouter()

const navigation = [
	{
		theme: 'education',
		heading: 'Education',
		desc: 'All exercise',
		button: 'Open',
	},
	{
		theme: 'events',
		heading: 'Community',
		desc: 'All participant',
		button: 'Watch',
	},
	{
		theme: 'media',
		heading: 'News',
		desc: 'Helpful information',
		button: 'Open',
	},
]

function navigationCardClickHandler(type) {
	console.log(type)
	switch (type) {
		case 'education':
			router.push('/education')
			break
		case 'events':
			router.push('/communities')
			break
		case 'media':
			router.push('/media')
	}
}
</script>

<style>
.navigation {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}

.navigation__heading {
	margin: 0;
	padding: 0;

	font-family: var(--headings-font);
	font-weight: 700;
	font-style: normal;
	font-size: 24px;
	line-height: 28px;
	color: var(--gray-800-primary);
}

.navigation__list {
	margin: 32px 0 0;
	padding: 0;
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-gap: 12px;

	list-style: none;
}

.navigation__item {
	margin: 0;
}

.navigation__card {
	height: 100%;
}

@media screen and (max-width: 768px) {
	.navigation__list {
		grid-template-columns: 1fr;
	}
}
</style>
