<template>
	<div class="user-card__info">
		<BaseSkeletonPath :width="60" :height="60" :border-radius="'50%'" />
		<div class="ml-5">
			<BaseSkeletonPath :width="170" :height="28" />
			<BaseSkeletonPath :width="170" :height="16" class="mt-1" />
		</div>
	</div>
	<div class="user-card__buttons">
		<BaseSkeletonPath :width="160" :height="44" />
	</div>
</template>

<style scoped>
.user-card__info {
	display: flex;
	align-items: center;
}
.user-card__buttons {
	display: flex;
	align-items: flex-end;
}
</style>
