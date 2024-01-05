<template>
	<div class="speakers-info">
		<article class="speakers-info__single-layout" v-if="speakers.length === 1">
			<div class="speakers-info__avatar-wrapper">
				<img
                    v-if="speakers[0].photo"
					class="speakers-info__avatar-img"
					:src="speakers[0].photo"
					:alt="speakers[0].first_name"
				/>
                <img v-else class="speakers-info__avatar-img" src="/src/assets/profile-avatars/avatar.png" alt="no photo" />
			</div>
			<strong class="speakers-info__speaker-name">
				{{ speakers[0].first_name }} {{ speakers[0].last_name }} {{ speakers[0].middle_name }}
			</strong>
			<div class="speakers-info__speaker-desc">
				<p class="speakers-info__speaker-job">{{ speakers[0].description }}</p>
				<!--				<span class="speakers-info__divider">/</span>-->
				<!--				<router-link class="speakers-info__link" to="/personal"> Открыть профиль </router-link>-->
			</div>
		</article>

		<article class="speakers-info__multiple-layout" v-else>
			<ul class="speakers-info__avatars-list">
				<li
						class="speakers-info__avatar-wrapper speakers-info__avatar-wrapper--outlined"
						v-for="(speaker, index) in speakers.slice(0, 5)"
						:key="index"
				>
					<img v-if="speaker.photo" class="speakers-info__avatar-img" :src="speaker.photo" :alt="speaker.name" />
                    <img v-else class="speakers-info__avatar-img" src="/src/assets/profile-avatars/avatar.png" alt="no photo" />
				</li>
				<template v-if="speakers.length > 5">
					<li class="speakers-info__avatar-wrapper speakers-info__avatar-wrapper--outlined speakers-info__avatar-wrapper--digits">
						+ {{ speakers.length - 5 }}
<!--						<img class="speakers-info__avatar-img" :src="speaker.photo" :alt="speaker.name" />-->
					</li>
				</template>
			</ul>
			<div class="speakers-info__speakers-desc">
				<span class="speakers-info__speakers-topic">Спикеры</span>
				<button class="speakers-info__toggle-button" type="button" @click="modalButtonClickHandler">
					{{ t('More details') }}
				</button>
			</div>
			<div
				class="speakers-info__modal"
				v-if="speakersModalOpened"
				@click.self="modalButtonClickHandler"
			>
				<section class="speakers-modal">
					<h3 class="speakers-modal__heading">Спикеры трека</h3>
					<ul class="speakers-modal__speakers-list">
						<li
							class="speakers-modal__speakers-item"
							v-for="(speaker, index) in speakers"
							:key="index"
						>
							<a class="speakers-modal__link">
								<div class="speakers-modal__avatar-wrapper">
									<img class="speakers-info__avatar-img" :src="speaker.photo" alt="avatar" />
								</div>
								<div class="speakers-modal__info-wrapper">
									<strong class="speakers-modal__name">
										{{ speaker.first_name }} {{ speaker.last_name }} {{ speaker.middle_name }}
									</strong>
									<p class="speakers-modal__job">{{ speaker.description }}</p>
								</div>
							</a>
						</li>
					</ul>
					<app-button
						class="speakers-modal__button"
						theme="primary"
						text="Закрыть"
						@click="modalButtonClickHandler"
					/>
				</section>
			</div>
		</article>
	</div>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue'
import { ref } from 'vue'
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
	speakers: {
		required: true,
		type: Array,
	},
})

const speakersModalOpened = ref(false)

function modalButtonClickHandler() {
	speakersModalOpened.value = !speakersModalOpened.value
}
</script>

<style>
.speakers-info {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	width: 100%;
}

.speakers-info__single-layout {
	margin: 0;
	padding: 0;
	flex-grow: 1;
	display: grid;
	grid-template-columns: 44px 1fr;
	grid-template-rows: auto auto;
	grid-column-gap: 16px;
	grid-row-gap: 4px;
	align-items: center;
}

.speakers-info__avatar-wrapper {
	margin: 0;
	padding: 0;
	grid-row: 1 / 3;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 44px;
	height: 44px;

	border-radius: 50%;
	overflow: hidden;
}

.speakers-info__avatar-wrapper--outlined {
	outline: 4px solid #fff;
}

.speakers-info__avatar-wrapper--digits {
	text-wrap: nowrap;
	font-family: var(--headings-font);
	font-size: 16px;
	font-weight: var(--fw-bold);
	line-height: 0;
	letter-spacing: 0;
	text-align: center;
	color: #BDBDCD;
}

.speakers-info__avatar-img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.speakers-info__speaker-name {
	margin: 0;

	font-family: var(--text-font);
	font-weight: 600;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	color: var(--headings-color);
}

.speakers-info__speaker-desc {
	margin: 0;
	padding: 0;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: center;
	align-content: center;
	gap: 8px;
}

.speakers-info__speaker-job,
.speakers-info__divider,
.speakers-info__speakers-topic {
	margin: 0;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 14px;
	line-height: 16px;
	color: var(--text-secondary-color);
}

.speakers-info__link,
.speakers-info__toggle-button {
	margin: 0;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 14px;
	line-height: 16px;
	color: var(--button-primary-default-color);
	text-decoration-line: underline;
}

.speakers-info__multiple-layout {
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	gap: 24px;
}

.speakers-info__avatars-list {
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: flex-start;
	align-items: center;

	list-style: none;
}

.speakers-info__speakers-desc {
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}

.speakers-info__modal {
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;

	display: flex;
	justify-content: center;
	align-items: center;

	background: rgba(0, 0, 0, 0.5);
	z-index: 100000;
}

.speakers-modal {
	box-sizing: border-box;
	margin: 0;
	padding: 24px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;

	width: 400px;

	border-radius: 12px;
	background: var(--background-primary, #fff);
	animation: slideDown 0.3s ease-in-out;
}

.speakers-modal__heading {
	margin: 0;
	padding: 0;

	font-family: var(--headings-font);
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	line-height: 28px;
	color: var(--headings-color);
}

.speakers-modal__speakers-list {
	max-width: 400px;
	width: 100%;
	max-height: 460px;
	height: 100%;
	overflow: scroll;
	margin: 32px 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	gap: 16px;

	list-style: none;
}

.speakers-modal__speakers-item {
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
}

.speakers-modal__link {
	margin: 0;
	padding: 0;
	display: grid;
	grid-template-columns: 44px auto;
	grid-gap: 16px;
}

.speakers-modal__avatar-wrapper {
	width: 44px;
	height: 44px;
	border-radius: 50%;
	overflow: hidden;
}

.speakers-modal__info-wrapper {
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: stretch;
	gap: 4px;
}

.speakers-modal__name {
	margin: 0;
	padding: 0;

	font-family: var(--text-font);
	font-size: 16px;
	font-style: normal;
	font-weight: 600;
	line-height: 20px;
	color: var(--headings-color);
}

.speakers-modal__job {
	margin: 0;
	padding: 0;

	font-family: var(--text-font);
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: 16px;
	color: #4c4c4c;
}

.speakers-modal__button {
	margin: auto 0 0;
}

@keyframes slideDown {
	from {
		transform: translateY(-200px);
		opacity: 0;
	}
	to {
		transform: translateY(0);
		opacity: 1;
	}
}
</style>
{
