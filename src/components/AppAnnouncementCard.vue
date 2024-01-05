<template>
	<article class="announcement">
		<ul class="announcement__badges-list">
			<li class="announcement__badges-item" v-for="(badge, index) in badges" :key="index">
				<app-badge class="announcement__badge" theme="special" :text="badge" />
			</li>
		</ul>
		<strong class="announcement__topic">
			{{ name }}
		</strong>
		<ul class="announcement__tags-list">
			<li class="announcement__tags-item" v-for="(tag, index) in tags" :key="index">
				<span class="announcement__tag">{{ tag }}</span>
			</li>
		</ul>
		<AppButton
			v-if="link"
			:theme="'outline'"
			:text="t('More details')"
			class="mt-5"
			@click="emit('on-button-click', link)"
		/>
	</article>
</template>

<script setup>
import AppBadge from './AppBadge.vue'
import AppButton from '@/components/AppButton.vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
	badges: {
		required: true,
		type: Array,
	},
	name: {
		required: true,
		type: String,
	},
	tags: {
		required: true,
		type: Array,
	},
	link: {
		type: String,
		default: '',
	},
})

const emit = defineEmits(['on-button-click'])
</script>

<style>
.announcement {
	box-sizing: border-box;
	padding: 32px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;

	border-radius: 16px;
	background: var(--background-secondary, #f8f8f8);
	transition: var(--base-transition);
	cursor: pointer;
}

.announcement:hover,
.announcement:focus {
	background-color: #f3f3f3;
}

.announcement__badges-list {
	margin: 0;
	padding: 0;
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: center;
	align-content: center;

	list-style: none;
}

.announcement__badges-item {
	margin: 0;
}

.announcement__topic {
	margin: 20px 0 0;
	padding: 0;

	font-family: var(--headings-font);
	font-weight: 700;
	font-style: normal;
	font-size: 20px;
	line-height: 28px;
	color: var(--gray-700-secondary, #4c4c4c);
}

.announcement__tags-list {
	margin: auto 0 0;
	padding: 20px 0 0;
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: center;
	align-content: center;

	list-style: none;
}

.announcement__tags-item {
	position: relative;
	margin: 0;
}

.announcement__tags-item:not(:first-child) {
	margin-left: 12px;
	padding-left: 24px;
}

.announcement__tags-item:not(:first-child)::before {
	content: '';
	position: absolute;
	top: calc(50% - 2px);
	left: 6px;

	display: block;
	width: 4px;
	height: 4px;

	background: var(--text-secondary-color);
	border-radius: 50%;
}

.announcement__tag {
	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	color: var(--text-secondary-color);
}

.announcement--keyvisual {
	background:
		url('../assets/card-bg.png') right bottom no-repeat,
		#23282c;
}

.announcement--keyvisual .announcement__topic {
	margin-top: 20px;
	color: #fff;
	width: 650px;
	font-family: var(--headings-font);
	font-size: 40px;
	font-style: normal;
	font-weight: 700;
	line-height: 44px; /* 110% */
	text-transform: uppercase;
}

.announcement--keyvisual .announcement__tags-list {
	margin-top: 96px;
}

.announcement--keyvisual .announcement__tag {
	color: rgba(255, 255, 255, 0.5);
}

.announcement--keyvisual .announcement__badges-item:first-child .badge {
	color: #fff;
	/* Small/Description Regular Caps */
	font-family: var(--text-font);
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 16px; /* 114.286% */
	text-transform: uppercase;

	border-radius: 12px;
	background: var(--yellow-400, #de960c);
}

.announcement--keyvisual .announcement__badges-item:nth-child(2) .badge {
	color: #fff;
	/* Small/Description Regular Caps */
	font-family: var(--text-font);
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 16px; /* 114.286% */
	text-transform: uppercase;

	border-radius: 12px;
	background: var(--purple-brand, #5c34f6);
}

@media screen and (max-width: 768px) {
	.announcement--keyvisual {
		background: #23282c;
	}

	.announcement--keyvisual .announcement__topic {
		width: auto;
	}
}

@media screen and (max-width: 500px) {
	.announcement--keyvisual .announcement__topic {
		font-size: 24px;
		line-height: 28px;
	}
}
</style>
