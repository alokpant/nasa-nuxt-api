import { defineEventHandler, parseCookies } from 'h3';
import { ProjectDetail } from '~/types/ProjectDetail';
import { createError } from 'h3';

const apiBody = () => ({
  headers: {
    'Authorization': `Bearer ${process.env.NASA_API_KEY}`
  }
})

export default defineEventHandler(async (event) => {
  const { updatedSince, perPage, currentPage } = parseCookies(event)
  const apiUrl = `${process.env.NASA_API_URL}/projects?updatedSince=${updatedSince}`;
  const response = await fetch(apiUrl, apiBody());

  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      statusMessage: 'Failed to fetch projects'
    });
  }

  const result = await response.json();
  const projects: ProjectDetail[] = result.projects.slice(Number(currentPage) - 1, Number(perPage))

  if (projects.length === 0) {
    return { projectsWithDetails: [], totalCount: 0 };
  }
  
  const projectWithDetails = await Promise.all(projects.map(async (project: ProjectDetail) => {
    const projectDetails = await getProjectDetails(project);
    return { ...project, ...projectDetails};
  }));

  return { projectsWithDetails: projectWithDetails, totalCount: result.totalCount };
});

export const getProjectDetails = async (project: ProjectDetail): Promise<ProjectDetail> => {
  const apiUrl = `${process.env.NASA_API_URL}/projects/${project.projectId}`;
  const response = await fetch(apiUrl, apiBody());
  
  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      statusMessage: `Failed to fetch project: ${project.projectId}`
    });
  }
  
  // TODO: since we do not need all the information from project,
  // additional step that can be taken is to create a transformer function
  // which takes the current data and only returns the data that is needed.
  // Since there is no redis cache, this could help reduce the data size that
  // needs to be saved on the cookies.
  // The advantage of this approach is that when we view individual project
  // details, we can get the data from the cache instead of making a new
  // request to the API.
  // This may not work when big perPage is selected, but for 12 it could work
  // which will help to improve performance.
  const result = await response.json();
  const resultWithLastFetched = { ...result.project, lastFetched: new Date().toISOString() };

  return resultWithLastFetched;
}