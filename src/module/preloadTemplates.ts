export const preloadTemplates = async function() {
	const templatePaths = [
		// Add paths to "modules/foundryvtt-yetAnotherAltCharSheet/templates"
	];

	return loadTemplates(templatePaths);
}
