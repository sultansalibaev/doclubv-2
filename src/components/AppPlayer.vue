<template>
	<div class="material-video-player" :key="playerKey">
		<vue-plyr ref="plyr">
			<div data-plyr-provider="youtube" :data-plyr-embed-id="getYoutubeId" @ended="onEnd"></div>
		</vue-plyr>

		<MaterialVideoQuality
			class="material-video-player__quality"
			v-if="getQualityIsShow"
			:material="material"
			:quality="quality"
			@quality="onQuality"
		/>
	</div>
</template>

<script>
import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'
import getVideoId from 'get-video-id'
import { v4 } from 'uuid'

import MaterialVideoQuality from '@/components/shared/material/video/quality.vue'

import { QUALITIES } from '@/components/shared/material/video/quality-options.vue'

import Api from '@/api/api.js'

const api = new Api()

export default {
	name: 'MaterialVideoPlayer',
	components: {
		VuePlyr,
		MaterialVideoQuality,
	},
	props: {
		material: {
			type: Object,
			required: true,
		},
		timestamp: {
			type: Number,
			default: 0,
		},
	},
	data() {
		return {
			quality: QUALITIES.yt_link_high_res,
			player: null,
			playerKey: v4(),
		}
	},
	mounted() {
		this.onPlayer()
	},
	watch: {
		timestamp(timestamp) {
			this.player.currentTime = timestamp

			this.player.play()
		},

		material() {
			this.playerKey = v4()
		},
	},
	computed: {
		getYoutubeId() {
			return getVideoId(this.material[this.quality]).id
		},

		getQualityIsShow() {
			const { yt_link_high_res, yt_link_low_res } = this.material

			return yt_link_high_res || yt_link_low_res
		},
	},
	methods: {
		onPlayer() {
			this.player = this.$refs.plyr.player

			this.onEndedPlyr()
		},

		onQuality(quality) {
			this.quality = quality

			this.playerKey = v4()
		},

		onEndedPlyr() {
			this.player.on('ended', () => this.onChangeView())
		},

		async onChangeView() {
			try {
				const { id } = this.material

				await api.videoView(id).then(() => {
					this.$store.dispatch('Materials/getMaterials')
				})
			} catch (e) {
				console.log(e)
			}
		},
	},
}
</script>

<style lang="scss">
.material-video-player {
	.material-video-player__quality {
		margin-top: 20px;
	}

	.plyr__poster {
		background-size: cover;
	}
}

@media screen and (max-width: 768px) {
	.material-video-player {
		.material-video-player__quality {
			margin-top: 12px;
		}
	}
}
</style>
