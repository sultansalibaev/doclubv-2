<template>
	<aside class="profile-widget">
		<div class="profile-widget__user-info-wrapper">
			<div class="profile-widget__avatar-wrapper">
				<img
					class="profile-widget__avatar"
					:src="userStore.getUserData.photo"
					:alt="formattedUserName"
				/>
			</div>
			<span class="profile-widget__user-name">{{ formattedUserName }}</span>
			<span class="profile-widget__location" v-if="userStore.getUserData.city">
				Россия, {{ userStore.getUserData.city.name }}
			</span>
		</div>
		<div class="profile-widget__buttons-wrapper">
			<router-link class="profile-widget__profile-link button" to="/personal">{{ t('Open') }}</router-link>
			<router-link class="profile-widget__edit-link button button--outlined" to="/personal"
				>{{ t('Edit') }}</router-link
			>
		</div>
	</aside>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const userStore = useUserStore()

const formattedUserName = computed(() => {
	if (!userStore.getUserData['first_name'] || !userStore.getUserData['last_name']) {
		return ''
	}
	if (userStore.getUserData['middle_name']) {
		return `${userStore.getUserData['first_name']} ${userStore.getUserData['middle_name']} ${userStore.getUserData['last_name']}`
	}
	return `${userStore.getUserData['first_name']} ${userStore.getUserData['last_name']}`
})
</script>

<style>
.profile-widget {
	box-sizing: border-box;
	padding: 32px;
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;

	border-radius: 16px;
	background: var(--background-secondary);
}

.profile-widget__user-info-wrapper {
	margin: 0 auto 0 0;
	padding: 0;
	display: grid;
	grid-template-columns: 60px 1fr;
	grid-column-gap: 12px;
	grid-row-gap: 8px;
}

.profile-widget__avatar-wrapper {
	margin: 0;
	padding: 0;
	grid-row: 1 / 3;
	width: 60px;
	height: 60px;

	border-radius: 50%;
	overflow: hidden;
}

.profile-widget__avatar {
	width: 100%;
	height: 100%;
	object-fit: cover;
	aspect-ratio: 1/1;
}

.profile-widget__user-name {
	margin: 4px 0 0;

	font-family: var(--headings-font);
	font-weight: 700;
	font-style: normal;
	font-size: 20px;
	line-height: 28px;
	color: var(--headings-color);
}

.profile-widget__location {
	margin: 0 0 4px;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 14px;
	line-height: 16px;
	color: var(--profile-widget-location-color);
}

.profile-widget__buttons-wrapper {
	margin: 0;
	padding: 0;
	display: flex;
}

.profile-widget__profile-link,
.profile-widget__edit-link {
	display: flex;
	justify-content: center;
	align-items: center;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
}

.profile-widget__profile-link {
	color: #fff;
}

.profile-widget__edit-link {
	margin-left: 16px;
	color: #000;
}

@media screen and (max-width: 768px) {
	.profile-widget {
		flex-direction: column;
		gap: 20px;
		align-items: flex-start;
	}
}
</style>
