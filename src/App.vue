<template>
	<RouterView />
	<TheSnackbar />
</template>

<script setup>
import TheSnackbar from '@/components/TheSnackbar.vue'

import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useUtilsStore } from '@/stores/utils'
import { getCookie } from '@/plugins/cookie'
import { useFiltersStore } from '@/stores/filters'

const userStore = useUserStore()
const utilsStore = useUtilsStore()
const filtersStore = useFiltersStore()

onMounted(() => {

	const accessToken = getCookie('accessToken')
	const refreshToken = getCookie('refreshToken')

	if (accessToken) {
		userStore.updateAccessToken(accessToken)
	}
	if (refreshToken) {
		userStore.updateRefreshToken(refreshToken)
	}

	utilsStore.fetchSpecializations()
	utilsStore.fetchWorkPlaces()
	utilsStore.fetchCities()
	utilsStore.fetchUniversities()
	utilsStore.fetchSponsors()
	filtersStore.fetchTags()
	filtersStore.fetchThemes()
})
</script>

<style lang="scss">
@for $i from 1 through 10 {
	.gap-#{$i} {
		gap: 4px * $i;
	}
}

//$display-list: block, none, flex, grid, inline;
//@each $value in $display-list {
//    .d-#{$value} {
//        display: $value;
//    }
//}
</style>
