import { defineEventHandler, getQuery } from 'h3';
import { ProjectDetail } from '~/types/ProjectDetail';

const API_BODY = {
  headers: {
    'Authorization': `Bearer ${process.env.NASA_API_KEY}`
  }
}

export default defineEventHandler(async (event) => {
  const { updatedSince, perPage, currentPage } = parseCookies(event)
  const apiUrl = `${process.env.NASA_API_URL}/projects?updatedSince=${updatedSince}`;
  const response = await fetch(apiUrl, API_BODY);

  if (!response.ok) {
    throw new Error(`Failed to fetch projects`);
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

async function getProjectDetails(project: ProjectDetail): Promise<ProjectDetail> {
  const apiUrl = `${process.env.NASA_API_URL}/projects/${project.projectId}`;
  const response = await fetch(apiUrl, API_BODY);
  if (!response.ok) {
    throw new Error(`Failed to fetch project: ${project.projectId}`);
  }
  const result = await response.json();
  const resultWithLastFetched = { ...result.project, lastFetched: new Date().toISOString() };

  return resultWithLastFetched;
}