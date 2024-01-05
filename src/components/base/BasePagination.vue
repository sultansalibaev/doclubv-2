<template>
	<nav v-if="length > 1" class="pagination">
		<AppButton
			v-if="hasPrevButton"
			:text="prevButtonText"
			theme="outline"
			@click="pageClicked(currentPage - 1, 'prev')"
		/>
		<button
			v-for="page in length"
			:key="page"
			:class="page === currentPage ? 'pagination__button--active' : ''"
			class="pagination__button"
			@click="page === currentPage ? false : pageClicked(page, 'any')"
		>
			{{ `${ page }` }}
		</button>
		<AppButton
			v-if="hasNextButton"
			:text="nextButtonText"
			theme="outline"
			@click="pageClicked(currentPage + 1, 'next')"
		/>
	</nav>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue'

const props = defineProps({
	length: {
		type: [Number, String],
		default: 1,
		validator: (val) => val % 1 === 0,
	},
	totalVisible: {
		type: Number,
		default: 3,
	},
	prevButtonText: {
		type: String,
		default: '',
	},
	nextButtonText: {
		type: String,
		default: '',
	},
	hasPrevButton: {
			type: Boolean,
		default: false,
	},
	hasNextButton: {
			type: Boolean,
		default: false,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	currentPage: {
		type: [Number, String],
		default: 1,
	}
})

const emit = defineEmits(['on-change-page', 'on-next-page', 'on-prev-page'])


const pageClicked = (page, type) => {
	if (type === 'next') emit('on-next-page', page)
	if (type === 'prev') emit('on-prev-page', page)
	if (type === 'any') emit('on-change-page', page)
}
</script>

<style lang="scss" scoped>
.pagination {
	display: flex;
	align-items: center;
	gap: 10px;

	&__button {
		min-width: 30px;
		width: 30px;
		height: 30px;
		border-radius: 50px;
		display: flex;
		align-items: center;
		justify-content: center;

		&--active {
			background: #f1f1f5;
		}
	}
}
</style>
