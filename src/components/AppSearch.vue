<template>
	<div class="search">
		<input class="search__input" :value="modelValue" type="search" placeholder="Поиск" />
	</div>
</template>

<script setup>
const props = defineProps({
	modelValue: {
		type: String,
		require: true,
	}
})
</script>

<style>
.search {
	position: relative;
	padding: 0;
	display: flex;
	width: 100%;
	max-width: 319px;
}

.search::before {
	content: '';

	position: absolute;
	top: calc(50% - 8px);
	left: 16px;

	display: block;
	width: 16px;
	height: 16px;

	background: url('../assets/icons/icon-search.svg') center no-repeat;
}

.search__input {
	box-sizing: border-box;
	padding: 12px 16px 12px 40px;
	width: 100%;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 16px;
	line-height: 20px;
	color: var(--text-primaty-color);

	border: 1px solid var(--search-border-color);
	border-radius: 5px;
	background: var(--background-primary);
}

.search__input:focus {
	outline: none;
}
</style>
