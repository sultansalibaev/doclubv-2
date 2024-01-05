<template>
	<router-link class="app-logo" to="/main">
		<img
			class="app-logo__image"
			v-if="logoTheme === 'white'"
			src="../assets/logo-white.svg"
			alt="Матемаркетинг"
		/>
		<img
			v-if="logoTheme === 'black'"
			class="app-logo__image"
			src="../assets/logo-black.svg"
			alt="Матемаркетинг"
		/>
	</router-link>
</template>

<script setup>
const props = defineProps({
	logoTheme: {
		type: String,
		required: true,
		validator(value) {
			return ['black', 'white'].includes(value)
		},
	},
})
</script>

<style>
.app-logo {
	margin: 0;
	padding: 0;
	width: 100%;
	max-width: 119px;
	display: flex;
}

.app-logo__image {
	width: 100%;
	height: auto;
}
</style>
