/**
 * Gets additional data for a project
 * @param {Object} project - The project object
 * @returns {Object} Enhanced project data
 */
export function getEntryData(project) {
  return {
    title: project.title,
    description: project.shortDescription,
    fullDescription: project.fullDescription || project.shortDescription,
    image: project.image,
    tags: project.tags || [],
    links: project.links || { demo: '#', github: '#' }
  };
}
