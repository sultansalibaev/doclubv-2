<template>
	<v-snackbar
		v-model="snackbar.isOpened"
		:absolute="snackbar.options.absolute"
		:bottom="snackbar.options.bottom"
		:centered="snackbar.options.centered"
		:color="snackbar.options.color"
		:elevation="snackbar.options.elevation"
		:height="snackbar.options.height"
		:left="snackbar.options.left"
		:max-height="snackbar.options.maxHeight"
		:max-width="snackbar.options.maxWidth"
		:min-height="snackbar.options.minHeight"
		:min-width="snackbar.options.minWidth"
		:multi-line="snackbar.options.multiLine"
		:outlined="snackbar.options.outlined"
		:right="snackbar.options.right"
		:rounded="snackbar.options.rounded"
		:shaped="snackbar.options.shaped"
		:text="snackbar.options.text"
		:tile="snackbar.options.tile"
		:timeout="snackbar.options.timeout"
		:top="snackbar.options.top"
		:vertical="snackbar.options.vertical"
	>
		<v-icon
			v-if="snackbar.options.icon"
			:color="snackbar.options.iconColor"
			:size="snackbar.options.iconSize"
			left
		>
			{{ snackbar.options.icon }}
		</v-icon>
		{{ snackbar.message }}
<!--		<template v-if="snackbar.options.hasButton" v-slot:action="{ attrs }">-->
<!--			<BaseButton v-bind="attrs" text @click="closeSnackbar()">-->
<!--				{{ snackbar.options.buttonText }}-->
<!--			</BaseButton>-->
<!--		</template>-->
	</v-snackbar>
</template>

<script setup>
import { useSnackbar } from '@/composables/snackbar'
const { closeSnackbar, snackbar } = useSnackbar()
</script>
