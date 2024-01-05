<template>
	<section class="personal-layout">
		<div class="personal-layout__header-wrapper">
			<h3 class="personal-layout__heading">{{ t('Your personal page') }}</h3>
		</div>
        <BaseCard v-if="loading" class="d-flex align-center justify-space-between">
            <PersonalTopCardSkeleton />
        </BaseCard>
		<AppUserProfile v-else class="personal-layout__profile" />
	</section>
</template>

<script setup>
import AppUserProfile from './AppUserProfile.vue'
import PersonalTopCardSkeleton from '@/views/personal/PersonalTopCardSkeleton.vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
})
</script>

<style>
.personal-layout {
	display: grid;
	grid-template-columns: 1fr;
	grid-row-gap: 32px;
}

.personal-layout__header-wrapper {
	margin: 0;
	padding: 0;
	grid-column: 1 / 3;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.personal-layout__heading {
	margin: 0;
	padding: 0;

	font-family: var(--headings-font);
	font-weight: 700;
	font-style: normal;
	font-size: 24px;
	line-height: 28px;
	color: var(--headings-color);
}

.personal-layout__link {
	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	color: var(--links-color);
	text-decoration-line: underline;
}

.personal-layout__referral {
	grid-column: 1 / 2;
}

.personal-layout__rating {
	grid-column: 2 / 3;
	grid-row: 2 / 4;
}

@media screen and (max-width: 1439px) {
	.personal-layout {
		grid-template-columns: 1fr;
		grid-template-rows: auto;
	}

	.personal-layout__header-wrapper,
	.personal-layout__referral,
	.personal-layout__rating {
		grid-column: auto;
		grid-row: auto;
	}
}

@media screen and (max-width: 768px) {
	.personal-layout__header-wrapper {
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
	}

	.personal-layout__link {
		margin-top: 12px;
	}
}
</style>
