<template>
	<page-layout class="error-layout" :aside="false">
		<template #header>
			<app-header class="error-layout__header" heading="Ошибка" />
		</template>
		<template #main>
			<div class="members-layout__main-content">404, страница не найдена</div>
		</template>
	</page-layout>
</template>

<script setup>
import PageLayout from './layouts/PageLayout.vue'
import AppHeader from '../components/AppHeader.vue'
</script>

<style></style>
