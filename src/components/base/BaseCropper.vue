<template>
	<div id="cropper">
		<div class="upload-example">
			<Cropper
					ref="cropper"
					class="upload-example-cropper"
					:src="image"
					:stencil-component="$options.components.Stencil"
					@change="cropImage"
			/>
		</div>
	</div>
</template>

<script>
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

import Stencil from '@/components/base/Stencil.vue'

export default {
	props: {
		cropperEvent: Event,
	},
	watch: {
		cropperEvent: function (newValue) {
			this.uploadImage(newValue)
		}
	},
	data() {
		return {
			image:
					"https://images.pexels.com/photos/1451124/pexels-photo-1451124.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
		};
	},
	components: {
		Cropper,
		Stencil,
	},
	methods: {
		base64toBlob: async function(result) {
			if (!result.canvas) return
			const response = await fetch(result.canvas.toDataURL("image/jpeg"))
			const blob = await response.blob()
			this.$emit('on-save', new File([blob], 'name', { type: 'image/*' }))
		},
		cropImage() {
			const result = this.$refs.cropper.getResult();
			this.base64toBlob(result)
		},
		uploadImage(event) {
			// Reference to the DOM input element
			var input = event.target;
			// Ensure that you have a file before attempting to read it
			if (input.files && input.files[0]) {
				// create a new FileReader to read this image and convert to base64 format
				var reader = new FileReader();
				// Define a callback function to run, when FileReader finishes its job
				reader.onload = (e) => {
					// Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
					// Read image as base64 and set to imageData
					this.image = e.target.result;
				};
				// Start the reader job - read file as a data url (base64 format)
				reader.readAsDataURL(input.files[0]);
			}
		},
	},
};
</script>

<style>
.upload-example-cropper {
	width: 100%;
	height: auto;
}
</style>
