<template>
	<span
		:class="[
			'badge',
			theme === 'brand' ? 'badge--brand' : '',
			theme === 'grey' ? 'badge--grey' : '',
			theme === 'special' ? 'badge--special' : '',
		]"
	>
		{{ text }}
	</span>
</template>

<script setup>
defineProps({
	text: {
		required: true,
		type: String,
	},
	theme: {
		required: true,
		type: String,
		validator(value) {
			return ['base', 'brand', 'special', 'grey'].includes(value)
		},
	},
})
</script>

<style>
.badge {
	box-sizing: border-box;
	padding: 6px 10px;

	font-family: var(--text-font);
	font-weight: 400;
	font-style: normal;
	font-size: 14px;
	line-height: 16px;
	color: var(--badge-font-base-color);

	z-index: 1;

	border-radius: 12px;
	background: var(--badge-bg-base-color);
}

.badge--brand {
	color: var(--badge-font-brand-color);
	text-transform: uppercase;
	background: var(--badge-bg-brand-color);
}

.badge--grey {
	background: var(--badge-bg-grey-color);
}
</style>
