<template>
	<div class="rating-profile">
		<span class="rating-profile__position">{{ data.position }}</span>
		<div class="rating-profile__img-wrapper">
			<img class="rating-profile__avatar" src="../assets/avatar-thumb-3.jpg" :alt="data.name" />
		</div>
		<p class="rating-profile__user-name">
			{{ data.name }}
		</p>
	</div>
</template>

<script setup>
defineProps({
	data: {
		required: true,
		type: Object,
	},
})
</script>

<style>
.rating-profile {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: center;
	align-content: center;
}

.rating-profile__position {
	margin: 0;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 24px;
	color: var(--text-secondary-color);
}

.rating-profile__img-wrapper {
	margin: 0 0 0 16px;
	width: 40px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;

	overflow: hidden;
	border-radius: 50%;
}

.rating-profile__avatar {
	width: 100%;
	height: auto;
}

.rating-profile__user-name {
	margin: 0 0 0 16px;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	color: var(--rating-name-color);
}

.rating-profile__user-name--selected {
	font-weight: 600;
}
</style>
