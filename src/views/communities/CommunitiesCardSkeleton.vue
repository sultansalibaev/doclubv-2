<template>
	<div class="communities-card">
		<div>
			<div class="communities-card__header">
				<div class="communities-card__header-avatar">
					<BaseSkeletonPath :width="80" :height="80" :border-radius="'50%'" />
				</div>
				<div class="ml-6">
					<BaseSkeletonPath :width="74" :height="28" :border-radius="12" />
					<BaseSkeletonPath :width="200" :height="28" class="mt-1" />
					<BaseSkeletonPath :width="170" :height="20" class="mt-1" />
				</div>
			</div>
			<div class="mt-6 communities-card__tags">
				<BaseSkeletonPath v-for="i in 2" :key="i" :width="100" :height="36" />
			</div>
			<div class="communities-card__body">
				<div>
					<p class="caption-2-medium | text-gray900">Место работы</p>
					<BaseSkeletonPath :width="170" :height="20" class="mt-2" />
				</div>
				<div class="mt-6">
					<p class="caption-2-medium | text-gray900">Опыт</p>
					<BaseSkeletonPath :width="170" :height="20" class="mt-2" />
				</div>
				<div class="mt-6">
					<p class="caption-2-medium | text-gray900">О себе</p>
					<BaseSkeletonPath :width="'100%'" :height="20" class="mt-2" />
					<BaseSkeletonPath :width="'100%'" :height="20" class="mt-1" />
					<BaseSkeletonPath :width="170" :height="20" class="mt-1" />
				</div>
			</div>
		</div>
		<div class="communities-card__footer">
			<BaseSkeletonPath :width="183" :height="44" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.communities-card {
	min-width: 100%;
	padding: 24px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-radius: 20px;
	background: rgb(var(--v-theme-background-secondary));

	&__header {
		display: flex;
		align-items: flex-start;
	}
	&__header-avatar {
		min-width: 80px;
		min-height: 80px;

		& img {
			width: 100%;
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
}
.text-balance-wrap {
	text-wrap: balance;
}
.gap-1 {
	gap: 4px;
}
</style>
<script setup></script>
