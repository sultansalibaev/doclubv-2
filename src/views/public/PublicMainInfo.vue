<template>
	<BaseCard class="w-100" color="background-primary">
		<div v-if="isLoading" class="public__header">
			<BaseSkeletonPath :width="200" :height="200" :border-radius="'50%'" />
			<div>
				<BaseSkeletonPath :width="400" :height="40" />
				<BaseSkeletonPath :width="400" :height="24" class="mt-3" />
				<BaseSkeletonPath :width="400" :height="20" class="mt-3" />
			</div>
		</div>
		<div v-else class="public__header">
			<div class="avatar-container">
				<img
					v-if="photo"
					:src="photo"
					:alt="`${firstName} ${lastName} ${middleName}`"
					class="avatar"
				/>
				<img
					v-else
					class="user-nav__avatar"
					src="/src/assets/profile-avatars/avatar.png"
					:alt="`${firstName} ${lastName} ${middleName}`"
				/>
			</div>
			<div>
				<h2 class="headers-2 | text-gray900">{{ firstName }} {{ lastName }} {{ middleName }}</h2>
				<div v-if="city?.name" class="mt-3 d-flex align-center">
					<img src="@/assets/icons/geo.svg" alt="geo tag" />
					<p class="small-regular | ml-2 text-gray800">{{ city?.name }}</p>
				</div>
				<div class="mt-3 tags">
					<p
						v-for="specialization in specializations"
						:key="specialization.id"
						class="small-regular | tag"
					>
						{{ specialization.name }}
					</p>
				</div>
			</div>
		</div>
		<template v-if="isLoading">
			<BaseSkeletonPath :width="100" :height="28" class="mt-8" />
			<BaseSkeletonPath :width="'100%'" :height="16" class="mt-8" />
			<BaseSkeletonPath :width="'100%'" :height="16" class="mt-2" />
		</template>
		<template v-else>
			<h4 class="headers-4 | mt-8 text-gray900">О себе</h4>
			<p v-if="aboutMe" class="mt-8 text-pre-wrap">
				{{ aboutMe }}
			</p>
			<p v-else class="mt-8 text-pre-wrap">Данные не заполнены</p>
		</template>
	</BaseCard>
</template>

<script setup>
const props = defineProps({
	isLoading: {
		type: Boolean,
		required: true,
	},
	tags: {
		type: Array,
		default: [],
	},
	photo: {
		type: String,
		default: '',
	},
	firstName: {
		type: String,
		default: '',
	},
	lastName: {
		type: String,
		default: '',
	},
	middleName: {
		type: String,
		default: '',
	},
	country: {
		type: String,
		default: '',
	},
	city: {
		type: Object,
		default: {},
	},
	aboutMe: {
		type: String,
		default: '',
	},
	specializations: {
		type: Object,
		default: {},
	},
})
</script>

<style lang="scss" scoped>
.public {
	&__header {
		display: flex;
		align-items: flex-start;
		flex-direction: row;
		gap: 32px;

		@media (max-width: 600px) {
			align-items: center;
			flex-direction: column;
		}
	}
}
.tag {
	padding: 6px 10px;
	border-radius: 12px;
	color: rgba(var(--v-theme-gray900), 0.5);
	background: rgb(var(--v-theme-purple100));
}
.tags {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	overflow-x: scroll;
	gap: 12px;
}
.avatar {
	object-fit: cover;
	width: 100%;
	height: 100%;

	&-container {
		width: 200px;
		height: 200px;
		min-width: 200px;
		min-height: 200px;
		max-width: 200px;
		max-height: 200px;
		display: flex;
		justify-content: center;
		align-items: center;

		overflow: hidden;
		border-radius: 50%;

		@media (max-width: 768px) {
			width: 150px;
			height: 150px;
			min-width: 150px;
			min-height: 150px;
			max-width: 150px;
			max-height: 150px;
		}
		@media (max-width: 600px) {
			width: 200px;
			height: 200px;
			min-width: 200px;
			min-height: 200px;
			max-width: 200px;
			max-height: 200px;
		}
	}
}
</style>
