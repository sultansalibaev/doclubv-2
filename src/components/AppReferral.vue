<template>
	<div class="referral">
		<h3 class="referral__heading">Реферальная ссылка</h3>
		<p class="referral__desc">
			Приглашайте своих коллег и получайте бонусы на свой бонусный счет за их регистрацию
		</p>
		<div class="referral__input-wrapper">
			<input class="referral__link-input" type="text" :value="url" readonly />
			<app-button class="referral__copy-button" :text="t('Copy')" theme="primary" />
		</div>
	</div>
</template>

<script setup>
import AppButton from './AppButton.vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const url = 'matemarketing/p/mikheeva#ref_8s7'
</script>

<style>
.referral {
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

.referral__heading {
	margin: 0;

	font-family: var(--headings-font);
	font-weight: 700;
	font-style: normal;
	font-size: 24px;
	line-height: 28px;
	color: var(--headings-color);
}

.referral__desc {
	margin: 28px 0 0;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 24px;
	color: var(--text-secondary-color);
}

.referral__input-wrapper {
	margin: 28px 0 0;
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.referral__link-input {
	box-sizing: border-box;
	margin: 0;
	padding: 11px 16px;
	flex-shrink: 1;
	width: 100%;
	max-width: 250px;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	color: var(--input-text-color);

	border-radius: 5px;
	border: 1px solid var(--gray-800-primary, #000);
	background: var(--background-primary, #fff);
	overflow: hidden;
	text-overflow: ellipsis;
}

.referral__copy-button {
	margin-left: 20px;
}
</style>
