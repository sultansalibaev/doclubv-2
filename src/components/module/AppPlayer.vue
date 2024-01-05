<template>
	<div class="player">
		<vue-plyr
				ref="plyr"
		>
			<div
					data-plyr-provider="youtube"
					:data-plyr-embed-id="youtube_parser(src)"
			></div>

<!--			<div class="plyr__video-embed">-->
<!--				<iframe-->
<!--						:src="src"-->
<!--						allowfullscreen-->
<!--						allowtransparency-->
<!--						allow="autoplay"-->
<!--				></iframe>-->
<!--			</div>-->
		</vue-plyr>
	</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useModuleStore } from '@/stores/module'

const props = defineProps({
	src: {
		required: true,
		type: String,
	},
	time: {
		required: true,
		type: Number,
	},
})

const plyr = ref(null)
const moduleStore = useModuleStore()

watch(
	() => props.time,
	() => {
		seekTo()
	},
)

function youtube_parser(url) {
	const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	const match = url.match(regExp);
	if (match && match[2].length == 11) {
		return match[2];
	} else {
		//error
	}
}

function seekTo() {
	plyr.value.player.embed.seekTo(props.time)
}

onMounted(() => {
	plyr.value.player.on('playing', () => {
		// moduleStore.fetchModuleStatus()
	})
})
</script>

<style>
.plyr__control--overlaid {
	background: #5c34f6;
}

.plyr__control--overlaid:hover,
.plyr__control--overlaid:focus {
	background: #5c34f6 !important;
}
</style>
