<template>
	<div class="carousel">
		<AppLinearProgressBar :percent-value="percent(content[onboarding]?.progress)" class="mt-7" />
		<div class="carousel__item">
			<h5 class="headers-5 | mt-7 text-gray800">
				{{ content[onboarding]?.name }}
			</h5>
			<a :href="`${content[onboarding]?.link}`" target="_blank" class="body-regular | text-gray800">
				Открыть курс
			</a>
		</div>
		<div
			v-if="content.length > 1"
			class="carousel__buttons"
		>
			<AppButton
				theme="outline"
				:text="windowWidth <= 1600 ? 'Назад' : 'Назад'"
				class="carousel__button"
				@click="prev()"
			/>
			<!--            <div class="carousel__buttons-centered">-->
			<!--                <button-->
			<!--                    v-for="n in content.length"-->
			<!--                    :key="n"-->
			<!--                    :class="{'carousel__button-point&#45;&#45;active' : onboarding === n - 1}"-->
			<!--                    class="carousel__button-point"-->
			<!--                    @click="onboarding = n - 1"-->
			<!--                >-->

			<!--                </button>-->
			<!--            </div>-->
			<AppButton
				theme="outline"
				:text="windowWidth <= 1600 ? 'Вперёд' : 'Вперёд'"
				class="carousel__button"
				@click="next()"
			/>
		</div>
	</div>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue'
import AppLinearProgressBar from '@/components/AppLinearProgressBar.vue'
import { computed, ref } from 'vue'

const props = defineProps({
	content: {
		type: Array,
		default: () => {},
	},
})

const onboarding = ref(0)
const next = () =>
	(onboarding.value = onboarding.value + 1 === props.content.length ? 0 : onboarding.value + 1)
const prev = () =>
	(onboarding.value = onboarding.value - 1 < 0 ? props.content.length - 1 : onboarding.value - 1)

const windowWidth = computed(() => window.innerWidth)

const percent = (content) => (Math.round(content.points_done * 100) / content.max_points).toFixed(1)
</script>

<style lang="scss" scoped>
.carousel {
	&__buttons {
		margin: 28px 0 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	&__buttons-centered {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 12px;
	}
	&__button-point {
		position: relative;
		width: 12px;
		height: 12px;
		background: #d6d6e3;
		border-radius: 50%;
		transition: var(--base-transition);

		&:hover {
			transform: scale(1.2);
		}

		&--active {
			background: #000000;
		}
	}
}
.tag {
	padding: 2px 8px;
	background: rgba(#5C34F6, .1);
	border-radius: 9999px;
}
</style>
