<template>
	<div
		:class="['chip-wrapper', clearable ? 'chip-wrapper--clearable' : '']">
		<p class="caption-2-regular">
			<slot />
		</p>
		<div  v-if="clearable" class="chip-wrapper__append-item">
			<img
					src="@/assets/icons/icon-close-white.svg"
					alt="close icon"
					class="cursor-pointer"
					@click="emit('on-clear')"
			/>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	clearable: Boolean,
})

const emit = defineEmits(['on-clear'])
</script>

<style lang="scss" scoped>
.chip-wrapper {
	display: flex;
	gap: 8px;
	align-items: center;
	justify-content: space-between;
	padding: 4px 8px;
	border-radius: 9999px;
	color: #FFFFFF;
	background: #5C34F6;

	&--clearable {
		padding: 4px 8px 4px 12px;
	}

	&__append-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		padding: 2px;

		border-radius: 50%;
		background: #17171726;

		& img {
			width: 100%;
		}
	}
}
</style>
