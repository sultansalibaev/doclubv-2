<template>
	<div class="communities-card">
		<div>
			<div class="communities-card__header">
				<div class="communities-card__header-avatar">
					<img
						v-if="member.photo"
						class="user-nav__avatar"
						:src="member.photo"
						:alt="`${member.first_name} ${member.last_name} ${member.middle_name}`"
					/>
					<img v-else src="/src/assets/profile-avatars/avatar.png" alt="no photo" />
				</div>
				<div class="ml-6">
					<div class="d-flex align-center flex-wrap gap-1">
						<span v-if="member.is_expert" class="small-regular | communities-card__header-marker">
							Эксперт
						</span>
						<span v-if="member.is_mentor" class="small-regular | communities-card__header-marker">
							Ментор
						</span>
					</div>
					<div class="headers-5 | text-balance-wrap text-gray900">
						<span> {{ member.first_name }} {{ member.last_name }} {{ member.middle_name }} </span>
						<v-icon
							v-if="member.is_published"
							class="ml-2"
							color="primary"
							icon="mdi-check-circle-outline"
							size="24"
						/>
					</div>
					<span class="small-regular | text-gray800">
						{{ member?.position_str }}
					</span>
				</div>
			</div>
			<div class="mt-6 communities-card__tags">
				<span v-for="tag in member.specialization" :key="tag.id" class="communities-card__tag">
					{{ tag.name }}
				</span>
			</div>
			<div class="communities-card__body">
				<div>
					<p class="caption-2-medium | text-gray900">Место работы</p>
					<p class="caption-2-regular | mt-2 text-gray800">
						{{ member?.work_place?.name ? member.work_place.name : 'Не указано' }}
					</p>
				</div>
				<div v-if="member.work_places.length" class="mt-6">
					<p class="caption-2-medium | text-gray900">Опыт</p>
					<div class="mt-2 d-flex align-center flex-wrap">
						<div
							v-for="(place, index) in member.work_places"
							:key="place"
							class="caption-2-regular | text-gray800"
						>
							<span v-if="index !== 0"> , </span>
							{{ place.work_place_str }}
						</div>
					</div>
				</div>
				<div class="mt-6">
					<p class="caption-2-medium | text-gray900">О себе</p>
					<p class="body-regular | mt-2 text-pre-wrap text-gray800">
						{{ member.about ? member.about : 'Не указано' }}
					</p>
				</div>
				<div class="mt-2">
					<ul class="ml-4">
						<template v-if="member?.city?.name">
							<li class="body-regular | text-pre-wrap text-gray800">
								Город: {{ member.city.name }}
							</li>
						</template>
						<template v-if="member.telegram || member.facebook || member.instagram">
							<li class="body-regular | text-pre-wrap text-gray800">
								<div>
									Соцсети:
									<template v-if="member.facebook">
									</template>
										<span class="text-decoration-underline cursor-pointer" @click="validateLink(member.facebook, 'facebook')">Facebook</span>
									<template v-if="member.instagram">
										<span>,</span> <span class="text-decoration-underline cursor-pointer" @click="validateLink(member.instagram, 'instagram')">Instagram</span>
									</template>
								</div>
							</li>
						</template>
					</ul>
				</div>
				<template v-if="member?.consultation_description && member?.consultation_price">
					<div class="my-6">
						<p class="caption-2-medium | text-gray900">Чем могу помочь</p>
						<p class="caption-2-regular | mt-2 text-pre-wrap text-gray800">
							{{ member?.consultation_description }}
						</p>
					</div>
					<p
						class="caption-2-medium | text-primary text-decoration-underline cursor-pointer"
						@click="emit('on-open-modal', member)"
					>
						Записаться на консультацию
					</p>
					<p class="caption-2-regular | mt-2 text-gray800">{{ member?.consultation_price }} ₽</p>
				</template>
			</div>
		</div>
		<div class="communities-card__footer">
			<AppButton
				:text="'Открыть бейдж'"
				:disabled="!member.is_published"
				:theme="'outline'"
				@click="emit('on-open-profile', member.id)"
			/>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { useSnackbar } from '@/composables/snackbar'
import AppButton from '@/components/AppButton.vue'

const { showSnackbar } = useSnackbar()

const props = defineProps({
	member: {
		type: Object,
		required: true,
	},
})

const emit = defineEmits(['on-open-profile', 'on-open-modal'])

const validateLink = (link, type) => {
    const [prefix, name] = link.split('.com/')
    const finalLink = ref('')
    if (prefix.includes('http')) finalLink.value = name
    else if (prefix.includes('@')) finalLink.value = prefix
    else if (name.includes('@')) finalLink.value = name
    else showSnackbar('Не удалось перейти по ссылке')

    if (!finalLink.value) showSnackbar('Не удалось перейти по ссылке')
    else if (type === 'facebook') window.open(`https://facebook.com/${finalLink.value}`, '_blank')
    else if (type === 'instagram') window.open(`https://instagram.com/${finalLink.value}`, '_blank')
}
</script>

<style lang="scss" scoped>
.communities-card {
	min-width: 100%;
	padding: 24px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-radius: 20px;
	background: rgb(var(--v-theme-background-secondary));
	transition: var(--base-transition);

	&__header {
		display: flex;
		align-items: flex-start;
	}
	&__header-avatar {
		width: 80px;
		min-width: 80px;
		max-width: 80px;
		height: 80px;
		min-height: 80px;
		max-height: 80px;
		border-radius: 50%;
		overflow: hidden;

		& img {
			object-fit: cover;
			width: 100%;
			height: 100%;
		}
	}
	&__header-marker {
		width: fit-content;
		padding: 6px 10px;
		border-radius: 12px;
		color: rgb(var(--v-theme-gray100));
		background: rgb(var(--v-theme-gray900));
	}
	&__tags {
		margin: 32px 0 0;
		padding: 0 0 6px;
		width: 100%;
		display: flex;
		flex-wrap: nowrap;
		gap: 12px;
		list-style: none;
		overflow: scroll;
	}
	&__tag {
		width: fit-content;
		text-wrap: nowrap;
		padding: 6px 10px;
		border-radius: 12px;
		color: #00000080;
		background: rgb(var(--v-theme-gray100));
	}

	&__body {
		margin: 24px 0 0;
	}

	&__footer {
		margin: 24px 0 0;
	}

	//&:hover,
	//&:focus {
	//	box-shadow: var(--hover-shadow);
	//}
}
.text-balance-wrap {
	text-wrap: balance;
}
.gap-1 {
	gap: 4px;
}
</style>
