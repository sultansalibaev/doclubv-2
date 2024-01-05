export function createCoursePreview(data) {
	return {
		type: data.type ? data.type : null,
		id: data.id ? data.id : null,
		modulesCount: data['modules_count'] ? data['modules_count'] : 0,
		tags: data.tags ? data.tags : [],
		themes: data.themes ? data.themes : [],
		name: data.name ? data.name : '',
		image: data.image ? data.image : null,
		colorScheme: data['color_scheme'] ? data['color_scheme'] : 'L',
	}
}

export function createModulePreview(data) {
	return {
		type: data.type ? data.type : null,
		id: data.id ? data.id : null,
		name: data.name ? data.name : '',
		tags: data.tags ? data.tags : [],
		themes: data.themes ? data.themes : [],
		image: data.image ? data.image : null,
		colorScheme: data['color_scheme'] ? data['color_scheme'] : 'L',
		hasViewableMaterials: data['has_viewable_materials'] ? data['has_viewable_materials'] : null,
		hasDownloadableMaterials: data['has_downloadable_materials']
			? data['has_downloadable_materials']
			: null,
	}
}

export function createCourse(data) {
	return {
		id: data.id ? data.id : null,
		// модули создается в отдельном методе
		tags: data.tags ? data.tags : [],
		themes: data.themes ? data.themes : [],
		lectors: data.lectors ? data.lectors : [],
		// прогресс создается в отдельном методе
		name: data.name ? data.name : '',
		description: data.description ? data.description : '',
		image: data.image ? data.image : null,
		colorScheme: data['color_scheme'] ? data['color_scheme'] : 'L',
		is_favorite: data.is_favorite ? data.is_favorite : false,
		sponsor: data.sponsor ? data.sponsor : {},
	}
}

export function createModule(moduleData) {
	return {
		type: moduleData.type,
		id: moduleData.id ? moduleData.id : null,
		name: moduleData.name ? moduleData.name : '',
		tags: moduleData.tags ? moduleData.tags : [],
		themes: moduleData.themes ? moduleData.themes : [],
		image: moduleData.image ? moduleData.image : null,
		colorScheme: randomInteger(1, 2) === 1 ? 'D' : 'L',
		hasViewableMaterials: moduleData['has_viewable_materials']
			? moduleData['has_viewable_materials']
			: null,
		hasDownloadableMaterials: moduleData['has_downloadable_materials']
			? moduleData['has_downloadable_materials']
			: null,
	}
}

export function createStorie(storieData) {
	return {
		id: storieData['id'],
		name: storieData['name'],
		showFrom: storieData['show_start'],
		showTo: storieData['show_end'],
		view: storieData['view'],
		thumb: storieData['thumbnail'],
		stories: [storieData['file']],
	}
}
